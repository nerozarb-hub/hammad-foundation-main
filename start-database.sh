#!/bin/sh
# Production payments require the authorized managed database. Never start a
# disposable Docker database or generate hardcoded production credentials.
printf '%s\n' 'Managed database provisioning is handled by the operator. Local PostgreSQL tests run with npm test; no managed account is needed for tests.'
exit 1
