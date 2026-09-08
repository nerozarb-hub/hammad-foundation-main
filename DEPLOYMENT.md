# Hammad payment deployment

The payment integration is deliberately locked against live gateway requests. Do not enable it or create a real invoice until the owner explicitly approves a controlled live test after all readiness checks pass.

The operator handles managed database creation, migration, connection secrets and deployment. The owner is only asked to authorize the required account connection, and any paid plan separately.

See [PayPro production readiness](docs/paypro-production-readiness.md) for the current evidence, remaining provider documentation, managed database setup and live-test release gate.

Local checks:

- `npm run check`: lint, typecheck, network-blocked tests and production build.
- `npm run payments:smoke`: local built-app HTTP checks with all outbound server networking blocked.
- `npm run payments:safety`: configured-secret scan and live-request lock check.
- `npm run db:check`: read-only managed database readiness; fails until provisioned.

Database operator commands, after account authorization:

- `npm run db:migrate`: apply the versioned schema with a private migration connection.
- `npm run db:provision-role`: create a restricted runtime role and save the runtime connection privately.

Use `DATABASE_URL` for the restricted runtime connection, `DATABASE_MIGRATION_URL` only for administrative setup, and `APP_URL` for the exact HTTPS site origin. `PAYPRO_ENV=production`, `PAYPRO_BASE_URL=https://api.paypro.com.pk`, and `PAYPRO_LIVE_REQUESTS_ENABLED=false` remain required during preparation. PayPro credentials, callback credentials and database connection strings must never use a `NEXT_PUBLIC_` prefix.

The production build uses the documented `next build --webpack` option. The Inter font is included locally, so no Google Fonts download is required during a build. No database migration or gateway request occurs during build.
