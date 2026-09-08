// Read-only connectivity, schema and least-privilege check. Never contacts PayPro.
import nextEnv from '@next/env';
import { getPaymentPool, verifyRuntimeDatabase } from '../src/lib/db/pool.ts';
nextEnv.loadEnvConfig(process.cwd(), false, {info(){},error(){}});
let pool;
try {
  pool=getPaymentPool();
  await verifyRuntimeDatabase(pool);
  console.log('Managed database TLS connection, runtime privileges and migration: PASS');
} catch {console.error('Managed database readiness: FAIL (configuration, access or schema not verified).');process.exitCode=1;}
finally {await pool?.end();}
