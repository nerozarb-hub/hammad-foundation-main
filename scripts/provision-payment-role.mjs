// Run only against an authorized, dedicated Hammad database after db:migrate.
// Generates a runtime credential without printing it or placing it in source.
import crypto from 'node:crypto';
import { readFile, writeFile, rename, unlink } from 'node:fs/promises';
import nextEnv from '@next/env';
import pg from 'pg';
import { poolOptions } from '../src/lib/db/pool.ts';
nextEnv.loadEnvConfig(process.cwd(), false, {info(){},error(){}});
const adminUrl=process.env.DATABASE_MIGRATION_URL;
if(!adminUrl){console.error('Managed database authorization is required. No changes made.');process.exit(1);}
let pool,client,temp;
try {
  pool=new pg.Pool(poolOptions(adminUrl,process.env.DATABASE_CA_CERT));client=await pool.connect();
  await client.query('BEGIN');
  await client.query('SELECT pg_advisory_xact_lock(72143829)');
  const migrated=await client.query("SELECT version FROM payment_schema_migrations WHERE version=$1",['001_durable_payments']);
  if(migrated.rows.length!==1)throw new Error('Migrate first');
  const role='hammad_payments';
  const existing=await client.query('SELECT 1 FROM pg_roles WHERE rolname=$1',[role]);
  if(existing.rows.length)throw new Error('Runtime role already exists; do not rotate implicitly');
  const password=crypto.randomBytes(32).toString('hex');
  await client.query(`CREATE ROLE ${pg.escapeIdentifier(role)} LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOREPLICATION PASSWORD ${pg.escapeLiteral(password)}`);
  const database=(await client.query('SELECT current_database() AS name')).rows[0].name;
  await client.query(`GRANT CONNECT ON DATABASE ${pg.escapeIdentifier(database)} TO ${pg.escapeIdentifier(role)}`);
  await client.query('REVOKE CREATE ON SCHEMA public FROM PUBLIC');
  await client.query(`GRANT USAGE ON SCHEMA public TO ${pg.escapeIdentifier(role)}`);
  await client.query(`GRANT SELECT, INSERT, UPDATE ON donations, payment_rate_limits TO ${pg.escapeIdentifier(role)}`);
  await client.query(`GRANT SELECT ON payment_schema_migrations TO ${pg.escapeIdentifier(role)}`);
  const runtimeUrl=new URL(adminUrl);runtimeUrl.username=role;runtimeUrl.password=password;
  const current=await readFile('.env.local','utf8');
  const line=`DATABASE_URL=${runtimeUrl.toString()}`;
  const updated=/^DATABASE_URL=.*$/m.test(current)?current.replace(/^DATABASE_URL=.*$/m,()=>line):current.trimEnd()+'\n'+line+'\n';
  temp=`.env.local.${crypto.randomUUID()}`;
  await writeFile(temp,updated,{mode:0o600,flag:'wx'});
  await client.query('COMMIT');
  await rename(temp,'.env.local');temp=undefined;
  console.log('Dedicated runtime role provisioned; connection stored privately. Live PayPro remains disabled.');
} catch {
  if(client)await client.query('ROLLBACK').catch(()=>{});
  console.error('Runtime role provisioning was not completed. No credentials printed.');process.exitCode=1;
} finally {if(temp)await unlink(temp).catch(()=>{});client?.release();await pool?.end();}
