import assert from 'node:assert/strict';
import { before, beforeEach, after, test } from 'node:test';
import crypto from 'node:crypto';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { PostgresDonationRepository } from '../src/lib/db/index.ts';
import { createPaymentHandlers } from '../src/lib/payments/handlers.ts';
import { getPayProConfig } from '../src/lib/paypro/config.ts';
import { PayProClient } from '../src/lib/paypro/client.ts';

let db, repo, dir;
const config = getPayProConfig({PAYPRO_ENV:'production',PAYPRO_BASE_URL:'https://api.paypro.com.pk',APP_URL:'https://foundation.test',PAYPRO_CLIENT_ID:'fixture',PAYPRO_CLIENT_SECRET:'fixture',PAYPRO_MERCHANT_ID:'fixture',PAYPRO_CALLBACK_USERNAME:'fixture',PAYPRO_CALLBACK_PASSWORD:'fixture',PAYPRO_LIVE_REQUESTS_ENABLED:'true'});
const input = {amount:100,donorName:'Test Donor',donorEmail:'donor@example.test',donorPhone:'',supportOptionId:'custom'};
let requests, gatewayBody, gatewayOrderNumber, gatewayFailure, attachFailure, handlers;
function setup(repository = () => repo, customConfig = config) {
  return createPaymentHandlers({config:()=>customConfig,repository,gateway:cfg=>new PayProClient(cfg,async req=>{
    requests.push(req);
    if (gatewayFailure) throw new Error('upstream-sensitive-diagnostic');
    if(req.url.endsWith('/auth')) return {status:200,headers:new Headers({token:'fixture'}),body:'{}'};
    if(req.url.endsWith('/co')) {
      const payload = JSON.parse(req.body)[1];
      gatewayOrderNumber=payload.OrderNumber;
      return {status:200,headers:new Headers(),body:JSON.stringify([{Status:'00'},{OrderNumber:payload.OrderNumber,PayProId:'PP123',Click2Pay:'https://marketplace.paypro.com.pk/checkout?bid=fixture'}])};
    }
    return {status:200,headers:new Headers(),body:JSON.stringify([{Status:'00'},{OrderNumber:gatewayOrderNumber,...gatewayBody}])};
  })});
}
const createRequest = (key = crypto.randomUUID(), body = input, origin = 'https://foundation.test') => new Request('https://foundation.test/api/paypro/create-order',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin,'Idempotency-Key':key},body:JSON.stringify(body)});
async function create(key=crypto.randomUUID(), body=input) {
  const res=await handlers.create(createRequest(key,body));
  const cookie=res.headers.get('set-cookie')?.split(';')[0] || '';
  return {res,data:await res.json(),cookie,key};
}
function verifyRequest(record,query='',cookie=record.cookie) {
  return new Request(`https://foundation.test/api/paypro/verify?orderNumber=${record.data.orderNumber}${query}`,{headers:{cookie}});
}
function callbackRequest(order,body={}) {
  return new Request('https://foundation.test/api/paypro/callback',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:'fixture',password:'fixture',csvinvoiceids:order,...body})});
}
before(async()=>{
  dir=await mkdtemp(join(tmpdir(),'hammad-postgres-test-'));
  db=new PGlite(join(dir,'database'));
  await db.exec(await readFile(new URL('../src/lib/db/migrations/001_durable_payments.sql',import.meta.url),'utf8'));
  repo=new PostgresDonationRepository(db);
});
beforeEach(async()=>{
  await db.exec('TRUNCATE donations, payment_rate_limits');
  requests=[]; gatewayOrderNumber=''; gatewayFailure=false; attachFailure=false;
  gatewayBody={OrderStatus:'PAID',OrderAmountPaid:'100.00'};
  handlers=setup();
});
after(async()=>{await db?.close();await rm(dir,{recursive:true,force:true});});

test('successful donation is persisted pending then becomes PAID only after matching GGOS',async()=>{
  const r=await create();assert.equal(r.res.status,200);
  const initial=await repo.findByOrderNumber(r.data.orderNumber);
  assert.equal(initial.status,'pending');assert.equal(initial.paidAt,null);assert.equal(initial.payProId,'PP123');
  assert.match(r.res.headers.get('set-cookie'),/HttpOnly; SameSite=Lax; Max-Age=1209600; Secure/);
  const res=await handlers.verify(verifyRequest(r));assert.equal(res.status,200);
  const paid=await res.json();assert.equal(paid.status,'paid');assert.ok(paid.paidAt);
  assert.equal((await repo.findByOrderNumber(r.data.orderNumber)).status,'paid');
});
test('failed payment and expired payment do not receive paid_at',async()=>{
  const r=await create();
  for(const status of ['FAILED','EXPIRED']) {
    gatewayBody={OrderStatus:status};
    const res=await handlers.verify(verifyRequest(r));assert.equal(res.status,200);
    const data=await res.json();assert.equal(data.status,status.toLowerCase());assert.equal(data.paidAt,null);
  }
});
test('fake browser success never marks an unpaid donation paid',async()=>{
  const r=await create();gatewayBody={OrderStatus:'UNPAID'};
  const res=await handlers.verify(verifyRequest(r,'&status=success&msg=paid'));
  assert.equal((await res.json()).status,'pending');
  assert.equal((await repo.findByOrderNumber(r.data.orderNumber)).paidAt,null);
});
test('invalid callback is throttled before authentication and absent callback configuration fails closed',async()=>{
  let dbCalls=0;
  const forbiddenRepo=()=>{dbCalls++;throw new Error('must not be called');};
  for(const cfg of [{...config,callbackUsername:'',callbackPassword:''},{...config,callbackPassword:''}]) {
    const h=setup(forbiddenRepo,cfg);
    const response=await h.callback(callbackRequest('HF-20260907-'+'A'.repeat(32),{password:'invalid'}));
    assert.equal(response.status,503);
  }
  assert.equal(dbCalls,0);assert.equal(requests.length,0);
  const response=await handlers.callback(callbackRequest('HF-20260907-'+'A'.repeat(32),{password:'invalid'}));
  assert.equal(response.status,401);assert.equal(requests.length,0);
});
test('duplicate and concurrent callbacks preserve paid_at and produce a single durable donation',async()=>{
  const r=await create();
  const responses=await Promise.all(Array.from({length:4},()=>handlers.callback(callbackRequest(r.data.orderNumber))));
  for(const res of responses) assert.equal(res.status,200);
  const first=await repo.findByOrderNumber(r.data.orderNumber);
  const beforeCalls=requests.length;
  const replay=await handlers.callback(callbackRequest(r.data.orderNumber));assert.equal(replay.status,200);
  assert.equal((await repo.findByOrderNumber(r.data.orderNumber)).paidAt,first.paidAt);
  assert.equal(requests.length,beforeCalls);
  assert.equal((await db.query('SELECT COUNT(*)::int AS n FROM donations')).rows[0].n,1);
});
for(const [name,body] of [
  ['mismatched amount',{OrderStatus:'PAID',OrderAmountPaid:99}],
  ['overpaid amount',{OrderStatus:'PAID',OrderAmountPaid:101}],
  ['missing amount',{OrderStatus:'PAID'}],
  ['mismatched order',{OrderStatus:'PAID',OrderNumber:'HF-20260907-'+'B'.repeat(32),OrderAmountPaid:100}],
  ['missing order',{OrderStatus:'PAID',OrderNumber:undefined,OrderAmountPaid:100}],
  ['API success code alone',{OrderAmountPaid:100}],
]) test(name+' cannot settle a donation through browser or callback',async()=>{
  const r=await create();gatewayBody=body;
  assert.equal((await handlers.verify(verifyRequest(r))).status,503);
  assert.equal((await handlers.callback(callbackRequest(r.data.orderNumber))).status,503);
  assert.equal((await repo.findByOrderNumber(r.data.orderNumber)).status,'pending');
});
test('unknown order does not call PayPro',async()=>{
  const r={data:{orderNumber:'HF-20260907-'+'A'.repeat(32)},cookie:''};
  assert.equal((await handlers.verify(verifyRequest(r))).status,404);
  const cb=await handlers.callback(callbackRequest(r.data.orderNumber));assert.equal((await cb.json())[0].StatusCode,'03');
  assert.equal(requests.length,0);
});
test('receipt authorization rejects missing cookie and mismatched order/PayProID',async()=>{
  const r=await create();const count=requests.length;
  for(const [query,cookie] of [['',''],['&payProId=OTHER',r.cookie],['&cpayId=PP123&payProId=OTHER',r.cookie]]) {
    const res=await handlers.verify(verifyRequest(r,query,cookie));assert.ok([400,404].includes(res.status));
    assert.ok(!(await res.text()).includes('Test Donor'));
  }
  assert.equal(requests.length,count);
});
test('database failure prevents any gateway request and does not leak diagnostics',async()=>{
  handlers=setup(()=>new PostgresDonationRepository({query:async()=>{throw new Error('database-password-fixture');}}));
  const r=await create();assert.equal(r.res.status,503);assert.ok(!JSON.stringify(r.data).includes('database-password'));
  assert.equal(requests.length,0);
});
test('PayPro API failure is ambiguous and the same checkout is never automatically retried',async()=>{
  gatewayFailure=true;const key=crypto.randomUUID();
  const r=await create(key);assert.equal(r.res.status,503);assert.ok(!JSON.stringify(r.data).includes('sensitive'));
  const count=requests.length;gatewayFailure=false;
  const retry=await create(key);assert.equal(retry.res.status,409);assert.equal(requests.length,count);
});
test('gateway success followed by database failure never returns checkout or recreates an order',async()=>{
  const wrapped=new Proxy(repo,{get(target,key){if(key==='attachPayProId')return async()=>{attachFailure=true;throw new Error('failed');};const value=target[key];return typeof value==='function'?value.bind(target):value;}});
  handlers=setup(()=>wrapped);
  const key=crypto.randomUUID();assert.equal((await create(key)).res.status,503);assert.equal(attachFailure,true);
  const calls=requests.length;handlers=setup();assert.equal((await create(key)).res.status,409);assert.equal(requests.length,calls);
});
test('same checkout key and concurrent requests create at most one gateway invoice',async()=>{
  const key=crypto.randomUUID();
  const responses=await Promise.all([create(key),create(key),create(key)]);
  assert.ok(responses.some(r=>r.res.status===200));
  assert.equal(requests.filter(r=>r.url.endsWith('/co')).length,1);
  const replay=await create(key);assert.equal(replay.res.status,200);
  assert.equal(requests.filter(r=>r.url.endsWith('/co')).length,1);
  assert.equal((await create(key,{...input,amount:200})).res.status,409);
});
test('SQL injection stays data and uniqueness constraints reject duplicate identities',async()=>{
  const r=await create(crypto.randomUUID(),{...input,donorName:"Robert'); DROP TABLE donations;--"});assert.equal(r.res.status,200);
  assert.equal((await repo.findByOrderNumber(r.data.orderNumber)).donorName,"Robert'); DROP TABLE donations;--");
  assert.equal(await repo.findByOrderNumber("' OR '1'='1"),null);
  await assert.rejects(db.query('INSERT INTO donations SELECT * FROM donations'));
  const second=await create();assert.equal(second.res.status,503); // same fixture PayProID rejected by UNIQUE constraint
  assert.equal((await db.query('SELECT COUNT(*)::int AS n FROM donations WHERE paypro_id=$1',['PP123'])).rows[0].n,1);
});
test('direct mismatched verification is rejected by the database and paid cannot downgrade',async()=>{
  const r=await create();await assert.rejects(repo.recordVerification(r.data.orderNumber,'PP123','paid',99));
  await assert.rejects(repo.recordVerification(r.data.orderNumber,'WRONG','paid',100));
  const paid=await repo.recordVerification(r.data.orderNumber,'PP123','paid',100);
  const later=await repo.recordVerification(r.data.orderNumber,'PP123','failed');assert.equal(later.status,'paid');assert.equal(later.paidAt,paid.paidAt);
  await assert.rejects(db.query("UPDATE donations SET amount=101 WHERE order_number=$1",[r.data.orderNumber]));
});
test('rate limit is durable across repository instances and cannot be bypassed by forged forwarding headers',async()=>{
  const other=new PostgresDonationRepository(db);
  assert.equal(await repo.consumeRateLimit('create',2,60),true);
  assert.equal(await other.consumeRateLimit('create',2,60),true);
  assert.equal(await repo.consumeRateLimit('create',2,60),false);
  const r=await create();
  for(let i=0;i<120;i++)await repo.consumeRateLimit('verify',120,60);
  const req=verifyRequest(r,'',r.cookie);
  assert.equal((await handlers.verify(req)).status,429);
  const unknown=new Request('https://foundation.test/api/paypro/verify?orderNumber=HF-20260907-'+'A'.repeat(32),{headers:{'x-forwarded-for':'arbitrary'}});
  assert.equal((await handlers.verify(unknown)).status,404);
});
test('cross-site creation, tier tampering, oversized and non-JSON inputs are rejected',async()=>{
  assert.equal((await handlers.create(createRequest(crypto.randomUUID(),input,'https://evil.test'))).status,403);
  assert.equal((await create(crypto.randomUUID(),{...input,supportOptionId:'guardian-monthly'})).res.status,400);
  assert.equal((await create(crypto.randomUUID(),{...input,donorName:'x'.repeat(20000)})).res.status,400);
  assert.equal(requests.length,0);
});
test('paid records, idempotency keys and original paid_at survive a real disk-backed PostgreSQL engine restart',async()=>{
  const r=await create();await handlers.callback(callbackRequest(r.data.orderNumber));
  const first=await repo.findByOrderNumber(r.data.orderNumber);
  await db.close();db=new PGlite(join(dir,'database'));repo=new PostgresDonationRepository(db);handlers=setup();
  const calls=requests.length;
  assert.equal((await handlers.callback(callbackRequest(r.data.orderNumber))).status,200);
  assert.equal((await create(r.key)).res.status,200);
  const stored=await repo.findByOrderNumber(r.data.orderNumber);
  assert.equal(stored.paidAt,first.paidAt);assert.equal(stored.status,'paid');assert.equal(requests.length,calls);
});
