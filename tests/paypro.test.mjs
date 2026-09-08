import assert from 'node:assert/strict';
import test from 'node:test';
import { getPayProConfig, assertGatewayEnabled } from '../src/lib/paypro/config.ts';
import { PayProClient } from '../src/lib/paypro/client.ts';
import { isValidPayProDomain, validateDonationInput } from '../src/lib/paypro/security.ts';
import { poolOptions, getPaymentPool } from '../src/lib/db/pool.ts';

export const fixtureConfig = () => getPayProConfig({ PAYPRO_ENV: 'production', PAYPRO_BASE_URL: 'https://api.paypro.com.pk',
  PAYPRO_CLIENT_ID: 'fixture', PAYPRO_CLIENT_SECRET: 'fixture', PAYPRO_MERCHANT_ID: 'fixture',
  PAYPRO_CALLBACK_USERNAME: 'fixture', PAYPRO_CALLBACK_PASSWORD: 'fixture', PAYPRO_LIVE_REQUESTS_ENABLED: 'true' });

test('production requires explicit configuration and live-request approval', () => {
  const config = getPayProConfig({ PAYPRO_ENV: 'production' });
  assert.equal(config.baseUrl, '');
  assert.equal(config.isConfigured, false);
  assert.throws(() => assertGatewayEnabled({ ...fixtureConfig(), liveRequestsEnabled: false }));
  assert.throws(() => getPayProConfig({ PAYPRO_ENV: 'prod' }));
  assert.throws(() => getPayProConfig({ PAYPRO_ENV: 'production', PAYPRO_BASE_URL: 'https://demoapi.paypro.com.pk' }));
  assert.throws(() => getPayProConfig({ PAYPRO_ENV: 'demo', PAYPRO_BASE_URL: 'https://api.paypro.com.pk' }));
});
test('production lock prevents transport from being invoked', async () => {
  let calls = 0;
  const client = new PayProClient({ ...fixtureConfig(), liveRequestsEnabled: false }, async () => { calls++; throw new Error('unexpected'); });
  await assert.rejects(client.authenticate());
  assert.equal(calls, 0);
});
test('auth, Create Order, and GGOS use the configured host and documented GET body', async () => {
  const requests = [];
  const transport = async req => {
    requests.push(req);
    if (req.url.endsWith('/auth')) return { status: 200, headers: new Headers({ token: 'fixture' }), body: '{}' };
    if (req.url.endsWith('/co')) return { status: 200, headers: new Headers(), body: JSON.stringify({ Status: '00', PayProId: '123', Click2Pay: 'https://api.paypro.com.pk/checkout' }) };
    return { status: 200, headers: new Headers(), body: JSON.stringify({ OrderStatus: 'PAID', PayProId: '123', PaidAmount: '100.00' }) };
  };
  const client = new PayProClient(fixtureConfig(), transport);
  const order = await client.createOrder({ orderNumber: 'fixture-order', amount: 100, donorName: 'Test Donor' });
  assert.equal(order.payProId, '123');
  const result = await client.getOrderStatus('123');
  assert.equal(result.isPaid, true);
  assert.deepEqual(requests.map(x => x.url), ['/auth','/co','/auth','/ggos'].map(p => `https://api.paypro.com.pk/v2/ppro${p}`));
  assert.equal(requests[3].method, 'GET');
  assert.deepEqual(JSON.parse(requests[3].body), { userName: 'fixture', cpayId: '123' });
  assert.equal(requests[3].headers.token, 'fixture');
});
for (const response of [
  { Status: '00', PayProId: '123', PaidAmount: 100 },
  { OrderStatus: 'PAID', PayProId: 'different', PaidAmount: 100 },
  { OrderStatus: 'PAID', PayProId: '123' },
  { OrderStatus: 'PAID', PayProId: '123', PaidAmount: '1e2' },
  { OrderStatus: 'PAID', PaidAmount: 100 },
]) test(`GGOS rejects insufficient evidence ${JSON.stringify(response)}`, async () => {
  const client = new PayProClient(fixtureConfig(), async req => ({ status: 200, headers: new Headers({ token: 'fixture' }), body: JSON.stringify(req.url.endsWith('/auth') ? {} : response) }));
  await assert.rejects(client.getOrderStatus('123'));
});
test('gateway errors and malformed responses fail closed without reflecting response bodies', async () => {
  for (const [status,body] of [[500,'sensitive upstream diagnostic'],[302,''],[200,'not JSON']]) {
    const client = new PayProClient(fixtureConfig(), async () => ({status,body,headers:new Headers()}));
    await assert.rejects(client.authenticate(), error => !error.message.includes('sensitive'));
  }
});
test('redirects require HTTPS and genuine PayPro domains', () => {
  assert.equal(isValidPayProDomain('https://api.paypro.com.pk/checkout'), true);
  for (const url of ['https://paypro.com.pk.evil.test/', 'http://api.paypro.com.pk/', 'https://user:pass@api.paypro.com.pk/', 'https://evil.test/', 'https://api.paypro.com.pk:8443/']) assert.equal(isValidPayProDomain(url),false);
});
test('amount validation enforces fixed support tiers, precision and custom limits', () => {
  assert.equal(validateDonationInput({amount:9000,donorName:'Test Donor',supportOptionId:'guardian-monthly'}).valid,true);
  for (const amount of [10, true, null, '1e3', '100.001', 100]) assert.equal(validateDonationInput({amount,donorName:'Test Donor',supportOptionId:'guardian-monthly'}).valid,false);
  assert.equal(validateDonationInput({amount:100.01,donorName:'Test Donor',supportOptionId:'custom'}).valid,true);
  assert.equal(validateDonationInput({amount:100,donorName:'Test Donor',supportOptionId:'unknown'}).valid,false);
});
test('database always requires configured, certificate-verified TLS', () => {
  const previous = [process.env.DATABASE_URL,process.env.POSTGRES_URL];
  delete process.env.DATABASE_URL; delete process.env.POSTGRES_URL;
  try { assert.throws(() => getPaymentPool(),/Durable database/); }
  finally { for(const [i,key] of ['DATABASE_URL','POSTGRES_URL'].entries()) { if(previous[i]===undefined) delete process.env[key]; else process.env[key]=previous[i]; } }
  assert.equal(poolOptions('postgresql://localhost/test?sslmode=require').ssl.rejectUnauthorized,true);
  assert.throws(() => poolOptions('postgresql://localhost/test?sslmode=disable'));
  assert.throws(() => poolOptions('postgresql://localhost/test?sslmode=no-verify'));
  assert.throws(() => poolOptions('postgresql://localhost/test?ssl=false'));
});
