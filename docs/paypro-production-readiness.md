# PayPro production readiness

Status: local implementation verified; managed database and authoritative PayPro response-contract verification are still required. No live PayPro requests are authorized or were used for this work. `PAYPRO_LIVE_REQUESTS_ENABLED=false` must remain in effect.

## Evidence and contract limits

The owner confirmed `https://api.paypro.com.pk/v2/ppro/co` and the base URL `https://api.paypro.com.pk`. The owner supplied GGOS `GET /v2/ppro/ggos` with a JSON body containing `userName` (merchant ID) and `cpayId` (stored PayProID). These are the only newly confirmed gateway details.

The repository has no original PayPro V2 specification, response samples, or callback specification. Its marketing document mentions PayPro but contains no API paths or GGOS contract. Existing code previously used `/v2/ppro/auth`, token response headers, the two-element Create Order payload, `Status`, `PayProId`, `Click2Pay`, `OrderStatus`, `PaidAmount`, and callback invoice arrays. Offline fixtures exercise these existing fields; fixtures are not evidence of PayPro's actual responses. No alternate production hosts, routes, token sources, or success codes were inferred.

Before enabling the gateway, reconcile the original official specification with:

- Production authentication path, request field casing, and token response location.
- Create Order envelope, identifier casing, returned Click2Pay URL, date format, expiry, and success codes.
- GGOS response identifier, explicit settlement status, amount field and amount units. API `Status=00` alone never proves payment.
- Callback field casing, whether invoice identifiers are merchant order numbers, response codes, batch size, and retry behavior.
- Registered HTTPS browser return and server callback URLs, and actual hosted checkout domains.

Unsupported, ambiguous, missing, or inconsistent response fields fail closed. In particular, `PAID` requires returned identity and amount evidence; do not remove these checks just to accommodate an incomplete fixture or response. Obtain the documented equivalent instead.

## What changed

- PostgreSQL repository now writes and reads durable records with parameterized queries. No in-memory repository exists in application code. Every new runtime pool first verifies the dedicated role, schema migration, and restricted privileges; an admin connection is refused.
- Migration enforces unique order numbers, unique PayProIDs, unique checkout keys, valid currency/amount/status, and consistency between paid status, paid timestamp, verified identifier, and verified amount.
- Checkout request and receipt secrets are hashed before persistence. Browser receipt access requires an HttpOnly, Secure, SameSite=Lax cookie. Identifiers alone cannot reveal donor data.
- A durable claim is committed before the first gateway request. Reusing a checkout key cannot repeat Create Order, including after a process restart or ambiguous gateway failure.
- A failed database write after gateway success never returns checkout success. The unresolved row stays on hold for reconciliation; no automatic gateway retry occurs.
- Concurrent callbacks can only transition a donation to paid with matching server-verified amount and identity. An already-paid record preserves its original timestamp and cannot downgrade.
- Browser `status` and `msg` fields are ignored. Both browser verification and authenticated callbacks use the stored PayProID.
- Callback authentication fails closed if either configured credential is missing. Error responses and logs contain fixed messages, not raw gateway/database diagnostics.
- PostgreSQL provides shared global rate limits across processes. Forwarded IP headers are not trusted. This limits invoice creation across the whole low-volume site; provider/WAF-level traffic controls remain a deployment check.
- Node HTTPS carries the documented GET JSON body with a byte Content-Length, verified TLS, response-size bound, absolute timeout, no redirects, and no retries.
- PayPro configuration is server-only, uses environment-specific confirmed hosts, and requires an explicit production environment and HTTPS application origin. Preview deployments cannot enable production gateway requests.
- The existing Inter font is locally packaged. The documented Next.js Webpack build avoids the environment's Turbopack port-binding failure.

## Verification scope

`npm test` disables fetch, HTTP, HTTPS, and socket connections globally. Gateway adapters and the HTTPS request boundary are intercepted with synthetic fixtures. Database integration tests execute SQL in disk-backed PGlite, a PostgreSQL WASM engine used only as a development dependency, including close/reopen restart tests. This is not a managed PostgreSQL service, nor a substitute for real provider TLS/pooling/permissions/backup validation.

Tests cover successful, unpaid, failed and expired payments; fake browser success; callback credentials; duplicate and concurrent callbacks; missing/mismatched identity and amount; unknown records; unauthorized receipts; database failures; gateway failures; successful gateway calls followed by storage failure; checkout idempotency; SQL injection; constraints; rate limiting; restart persistence; migration replay/checksums/rollback; TLS settings; GET bodies and transport timeouts.

`npm run payments:safety` checks the production host, live-request lock, tracked environment files, and actual configured secret values against repository files and browser build assets. It prints pass/fail only, never secret values. Very short values cannot be meaningfully distinguished from ordinary text; the scan uses a minimum six-character secret length and supplements server-only module boundaries.

## Managed database: operator actions after authorization

The available CLI has no signed-in Vercel account. No database connector or authorized connection string was available. No external account, database, paid plan, deployment or live invoice has been created.

The configured managed database is the shared Supabase PostgreSQL project `dmbtbothpflvxzizsczs` in `ap-northeast-1`. Connect the deployment through Supabase's pooled runtime connection for `DATABASE_URL` and its direct connection for `DATABASE_MIGRATION_URL`; keep both values in the host's secret store and never commit them.

The operator—not the site owner—will:

1. Authenticate to the authorized Vercel/Neon account and confirm the Hammad project, region, and plan. Get separate approval before any paid plan or purchase.
2. Provision a dedicated database. Verify backups/recovery, retention, network controls, and the hosting connection limits.
3. Store the administrative connection privately as `DATABASE_MIGRATION_URL`; never print it or use a public environment variable.
4. Run `npm run db:migrate`. The migration uses one connection, a transaction, a lock, and a checksum/version ledger. Existing data that violates safety constraints makes the transaction fail rather than silently rewriting payments.
5. Run `npm run db:provision-role`. This creates a restricted `hammad_payments` role and generates its password privately. It updates only the ignored local environment file with the runtime connection. Existing roles are never implicitly reset. If provisioning fails after the database commit, the operator must recover the role before retrying; do not create a second role or expose credentials.
6. Confirm/use Supabase's pooled endpoint for runtime `DATABASE_URL` and direct endpoint for migration; the script preserves the authorized admin host initially and does not invent a pooler host. Configure a small pool, verified TLS, and the provider CA if necessary. URL options cannot disable certificate verification.
7. Run `npm run db:check`, then real database-only persistence/concurrency/reconnect tests with synthetic donations. Do not invoke PayPro. Verify the deployed runtime role cannot delete donation records or alter schema.
8. Set server-side runtime secrets in the hosting project, retain the live-request lock, and remove migration credentials from the runtime environment. Deployment needs account access and the correct linked project.
9. Check the deployed HTTPS origin, callback route and return flow; verify log redaction, rate limits, and backup restore. Do not claim managed persistence is verified until these pass.

## Live-test release gate

A controlled live test is not safe to authorize yet. Managed database verification, complete PayPro documentation comparison, and deployed HTTPS/cookie/callback checks remain outstanding. When those are complete, present the exact proposed live request, amount, test donor, expected effects, and recovery plan to the owner. Only their explicit approval permits changing the live-request flag and making that request.

Unknown/ambiguous creation attempts must be reconciled with the provider's records using an approved documented workflow. Never clear `gateway_attempted_at` merely to retry. No undocumented lookup endpoint is implemented.
