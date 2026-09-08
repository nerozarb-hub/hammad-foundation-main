import assert from 'node:assert/strict';
import test from 'node:test';
import { EventEmitter } from 'node:events';
import https from 'node:https';
import { nodePayProTransport } from '../src/lib/paypro/transport.ts';

test('Node HTTPS transport sends GGOS GET body with byte length and verified TLS', async t => {
  const sent = [];
  t.mock.method(https, 'request', (url, options, callback) => {
    const request = new EventEmitter();
    request.destroy = error => request.emit('error', error);
    request.end = body => {
      sent.push({url:String(url),options,body});
      queueMicrotask(() => {
        const res = new EventEmitter(); res.statusCode = 200; res.headers = {token:'fixture'};
        callback(res); res.emit('data',Buffer.from('{"ok":true}')); res.emit('end');
      });
    };
    return request;
  });
  const body=JSON.stringify({userName:'fixture',cpayId:'123'});
  const res=await nodePayProTransport({url:'https://api.paypro.com.pk/v2/ppro/ggos',method:'GET',headers:{'Content-Type':'application/json'},body});
  assert.equal(sent[0].body,body);
  assert.equal(sent[0].options.method,'GET');
  assert.equal(sent[0].options.headers['Content-Length'],String(Buffer.byteLength(body)));
  assert.equal(sent[0].options.rejectUnauthorized,true);
  assert.equal(res.status,200);
});
test('HTTPS transport enforces an absolute deadline without retrying', async t => {
  let count=0;
  t.mock.method(https,'request',()=>{
    count++;
    const request=new EventEmitter();request.end=()=>{};request.destroy=error=>request.emit('error',error);return request;
  });
  await assert.rejects(nodePayProTransport({url:'https://api.paypro.com.pk/v2/ppro/ggos',method:'GET',headers:{},body:'{}',timeoutMs:5}));
  assert.equal(count,1);
});
test('HTTPS transport rejects insecure URLs before any request',async()=>{
  for(const url of ['http://api.paypro.com.pk/v2/ppro/ggos','https://user:pass@api.paypro.com.pk/v2/ppro/ggos']) await assert.rejects(nodePayProTransport({url,method:'GET',headers:{}}),/Invalid gateway URL/);
});
