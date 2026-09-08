import { readFile } from 'node:fs/promises';
import nextEnv from '@next/env';
import { Pool } from 'pg';
import { poolOptions } from '../src/lib/db/pool.ts';
import { applyPaymentMigration } from '../src/lib/db/migrate.ts';
nextEnv.loadEnvConfig(process.cwd(), false, { info() {}, error() {} });
const url = process.env.DATABASE_MIGRATION_URL;
if (!url) { console.error('Migration database authorization is not configured. No changes made.'); process.exit(1); }
let pool, client;
try {
  pool = new Pool(poolOptions(url, process.env.DATABASE_CA_CERT));
  client = await pool.connect();
  const sql = await readFile(new URL('../src/lib/db/migrations/001_durable_payments.sql', import.meta.url), 'utf8');
  await applyPaymentMigration(client, sql);
  console.log('Payment schema migration verified. No gateway requests made.');
} catch {
  console.error('Payment migration failed. No secrets or database diagnostics printed.');
  process.exitCode = 1;
} finally { client?.release(); await pool?.end(); }
