import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
import { applyPaymentMigration } from '../src/lib/db/migrate.ts';

test('versioned migration is transactional, repeatable, and refuses changed checksums',async()=>{
  const db=new PGlite();
  const connection={query:async(sql,params)=>params?db.query(sql,params):(await db.exec(sql)).at(-1)};
  const sql=await readFile(new URL('../src/lib/db/migrations/001_durable_payments.sql',import.meta.url),'utf8');
  try {
    await applyPaymentMigration(connection,sql);
    await applyPaymentMigration(connection,sql);
    assert.equal((await db.query('SELECT COUNT(*)::int AS n FROM payment_schema_migrations')).rows[0].n,1);
    await assert.rejects(applyPaymentMigration(connection,sql+'\n-- altered'));
    assert.equal((await db.query("SELECT COUNT(*)::int AS n FROM donations")).rows[0].n,0);
  } finally {await db.close();}
});
test('a failed migration rolls back schema creation and migration history',async()=>{
  const db=new PGlite();
  const connection={query:async(sql,params)=>params?db.query(sql,params):(await db.exec(sql)).at(-1)};
  try {
    await assert.rejects(applyPaymentMigration(connection,'CREATE TABLE partial_payment_table(id int); SELECT nonexistent_payment_function();'));
    assert.equal((await db.query("SELECT to_regclass('partial_payment_table') AS t")).rows[0].t,null);
    assert.equal((await db.query("SELECT to_regclass('payment_schema_migrations') AS t")).rows[0].t,null);
  } finally {await db.close();}
});

test('runtime readiness rejects an administrative database role and accepts only the restricted migrated role',async()=>{
  const {verifyRuntimeDatabase}=await import('../src/lib/db/pool.ts');
  const db=new PGlite();
  const connection={query:async(sql,params)=>params?db.query(sql,params):(await db.exec(sql)).at(-1)};
  try {
    await applyPaymentMigration(connection,await readFile(new URL('../src/lib/db/migrations/001_durable_payments.sql',import.meta.url),'utf8'));
    await assert.rejects(verifyRuntimeDatabase(db),/Restricted payment database role/);
    await db.exec(`CREATE ROLE hammad_payments NOINHERIT;
      REVOKE CREATE ON SCHEMA public FROM PUBLIC;
      GRANT USAGE ON SCHEMA public TO hammad_payments;
      GRANT SELECT,INSERT,UPDATE ON donations,payment_rate_limits TO hammad_payments;
      GRANT SELECT ON payment_schema_migrations TO hammad_payments;
      SET ROLE hammad_payments;`);
    await verifyRuntimeDatabase(db);
    await assert.rejects(db.exec('DELETE FROM donations'));
    await assert.rejects(db.exec('ALTER TABLE donations ADD COLUMN illegal text'));
    await assert.rejects(db.exec('CREATE TABLE illegal(id int)'));
    await assert.rejects(db.exec("UPDATE payment_schema_migrations SET checksum='tampered'"));
    await db.exec('RESET ROLE; REVOKE UPDATE ON donations FROM hammad_payments; SET ROLE hammad_payments;');
    await assert.rejects(verifyRuntimeDatabase(db), /Restricted payment database role/);
  } finally {await db.close();}
});
