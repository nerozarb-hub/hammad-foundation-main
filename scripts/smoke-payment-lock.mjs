import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const child=spawn(process.execPath,['--import','./tests/no-network.mjs','node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','31783'],{cwd:process.cwd(),env:{...process.env,PAYPRO_LIVE_REQUESTS_ENABLED:'false'},stdio:['ignore','pipe','pipe']});
try {
  await new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>reject(new Error('Local server readiness timeout')),30000);
    child.stdout.on('data',chunk=>{if(chunk.toString().includes('Ready')){clearTimeout(timer);resolve();}});
    child.once('exit',()=>{clearTimeout(timer);reject(new Error('Local server did not start'));});
    child.once('error',()=>{clearTimeout(timer);reject(new Error('Local server did not start'));});
  });
  const base='http://127.0.0.1:31783';
  const home=await fetch(base);assert.equal(home.status,200);assert.ok((await home.text()).includes('Hammad Foundation'));
  const create=await fetch(base+'/api/paypro/create-order',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://hammad.yzeducationalservices.com','Idempotency-Key':crypto.randomUUID()},body:JSON.stringify({amount:100,donorName:'Offline Fixture',supportOptionId:'custom'})});
  assert.equal(create.status,503);assert.equal((await create.json()).success,false);
  const callback=await fetch(base+'/api/paypro/callback',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:'invalid-fixture',password:'invalid-fixture',csvinvoiceids:'HF-20260907-'+'A'.repeat(32)})});
  assert.equal(callback.status,401);
  const verify=await fetch(base+'/api/paypro/verify?status=success&msg=paid');assert.equal(verify.status,400);assert.equal((await verify.json()).success,false);
  console.log('Production HTTP smoke: PASS (homepage, live-order lock, invalid callback, fake browser success). Outbound network blocked in server process.');
} catch {console.error('Production HTTP smoke: FAIL (local server or assertions). No gateway calls permitted.');process.exitCode=1;}
finally {child.kill('SIGTERM');}
