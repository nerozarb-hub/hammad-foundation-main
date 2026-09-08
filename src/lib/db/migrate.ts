import 'server-only';
import { createHash } from 'node:crypto';
import type { Queryable } from './index.ts';

// Caller supplies a single dedicated connection, not a pool whose individual
// queries could use different connections inside this transaction.
export async function applyPaymentMigration(client: Queryable, sql: string) {
  const version = '001_durable_payments';
  const checksum = createHash('sha256').update(sql).digest('hex');
  await client.query('BEGIN');
  try {
    await client.query('SELECT pg_advisory_xact_lock(72143829)');
    await client.query('CREATE TABLE IF NOT EXISTS payment_schema_migrations (version TEXT PRIMARY KEY, checksum TEXT NOT NULL, applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW())');
    const existing = await client.query('SELECT checksum FROM payment_schema_migrations WHERE version=$1', [version]);
    if (existing.rows.length && existing.rows[0].checksum !== checksum) throw new Error('Migration checksum mismatch');
    if (!existing.rows.length) {
      await client.query(sql);
      await client.query('INSERT INTO payment_schema_migrations(version,checksum) VALUES($1,$2)', [version,checksum]);
    }
    await client.query('COMMIT');
  } catch {
    await client.query('ROLLBACK').catch(() => {});
    throw new Error('Payment migration failed');
  }
}
