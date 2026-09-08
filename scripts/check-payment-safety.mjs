import { readFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import nextEnv from '@next/env';
import { getPayProConfig } from '../src/lib/paypro/config.ts';
nextEnv.loadEnvConfig(process.cwd(), false, {info(){},error(){}});
const config=getPayProConfig();
let failed=false;
function check(label, ok) {console.log(`${label}: ${ok?'PASS':'FAIL'}`);if(!ok)failed=true;}
check('Confirmed production configuration',config.environment==='production'&&config.baseUrl==='https://api.paypro.com.pk');
check('Live requests remain disabled',!config.liveRequestsEnabled);
const tracked=execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(Boolean);
check('Local secrets are not tracked',!tracked.includes('.env.local'));
const secretKeys=['PAYPRO_CLIENT_ID','PAYPRO_CLIENT_SECRET','PAYPRO_MERCHANT_ID','PAYPRO_CALLBACK_USERNAME','PAYPRO_CALLBACK_PASSWORD','DATABASE_URL','POSTGRES_URL','DATABASE_MIGRATION_URL'];
const secrets=secretKeys.map(key=>process.env[key]).filter(value=>value&&value.length>=6);
async function filesIn(dir) {
  const result=[];
  for(const entry of await readdir(dir,{withFileTypes:true}).catch(()=>[])) {
    const path=join(dir,entry.name);
    if(entry.isDirectory())result.push(...await filesIn(path));else result.push(path);
  }
  return result;
}
const sources=[...new Set([...tracked,...await filesIn('src'),...await filesIn('scripts'),...await filesIn('tests')])].filter(path=>!path.startsWith('.env.')||path==='.env.example');
let sourceLeak=false;
for(const path of sources) {
  const data=await readFile(path).catch(()=>Buffer.alloc(0));
  if(secrets.some(value=>data.includes(Buffer.from(value))))sourceLeak=true;
}
check('No configured secrets in source',!sourceLeak);
const assets=await filesIn('.next/static');
check('Browser assets available for inspection',assets.length>0);
let assetLeak=false;
for(const path of assets) {const data=await readFile(path);if(secrets.some(value=>data.includes(Buffer.from(value))))assetLeak=true;}
check('No configured secrets in browser assets',!assetLeak);
process.exitCode=failed?1:0;
