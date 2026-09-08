import 'server-only';
import { Pool, type PoolConfig } from 'pg';

export function poolOptions(connectionString: string, ca?: string): PoolConfig {
  let url: URL;
  try { url = new URL(connectionString); } catch { throw new Error('Invalid database configuration'); }
  if (!['postgres:', 'postgresql:'].includes(url.protocol) || !url.hostname || !url.pathname.slice(1)) throw new Error('Invalid database configuration');
  // URL SSL options must never override certificate verification in pg.
  if (url.searchParams.has('sslmode') && !['require', 'verify-full'].includes(url.searchParams.get('sslmode')!)) throw new Error('Verified database TLS is required');
  for (const key of ['ssl', 'sslcert', 'sslkey', 'sslrootcert', 'uselibpqcompat']) if (url.searchParams.has(key)) throw new Error('Use server-side TLS configuration');
  url.searchParams.delete('sslmode');
  return { connectionString: url.toString(), ssl: { rejectUnauthorized: true, ...(ca ? { ca } : {}) },
    max: 5, idleTimeoutMillis: 30_000, connectionTimeoutMillis: 5_000, statement_timeout: 10_000,
    query_timeout: 12_000, application_name: 'hammad-payments', allowExitOnIdle: true };
}
let pool: Pool | undefined;
export function getPaymentPool(): Pool {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url?.trim()) throw new Error('Durable database storage is required; payments unavailable');
  if (!pool) {
    pool = new Pool(poolOptions(url, process.env.DATABASE_CA_CERT));
    pool.on('error', () => { console.error('[payments] database_pool_error'); });
  }
  return pool;
}

export async function verifyRuntimeDatabase(db: { query(text: string, values?: unknown[]): Promise<{ rows: Record<string, unknown>[] }> }): Promise<void> {
  const r = await db.query(`SELECT current_user='hammad_payments' AS dedicated_role,
    NOT rolsuper AND NOT rolcreatedb AND NOT rolcreaterole AS restricted_role,
    NOT has_schema_privilege(current_user,'public','CREATE') AS no_schema_write,
    (has_table_privilege(current_user,'donations','SELECT') AND has_table_privilege(current_user,'donations','INSERT') AND has_table_privilege(current_user,'donations','UPDATE')) AS donation_access,
    NOT has_table_privilege(current_user,'donations','DELETE') AS no_donation_delete
    FROM pg_roles WHERE rolname=current_user`);
  if (!r.rows[0] || Object.values(r.rows[0]).some(value => value !== true)) throw new Error('Restricted payment database role required');
  const migration = await db.query('SELECT version FROM payment_schema_migrations WHERE version=$1', ['001_durable_payments']);
  if (migration.rows.length !== 1) throw new Error('Payment schema is not ready');
}
let readiness: Promise<void> | undefined;
export function getVerifiedPaymentDatabase() {
  const connection = getPaymentPool();
  return {
    async query(sql: string, params?: unknown[]) {
      if (!readiness) readiness = verifyRuntimeDatabase(connection).catch(() => {
        readiness = undefined;
        throw new Error('Payment database readiness check failed');
      });
      await readiness;
      return connection.query(sql, params);
    },
  };
}
