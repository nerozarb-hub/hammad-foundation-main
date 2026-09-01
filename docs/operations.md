# Hammad site operating guide

Hammad is the mission-facing site. It describes the school, founder story, Guardian programme, updates, transparency, and contact routes. Its PayPro V2 payment workflow is server-side and must retain its validation, callback authentication, gateway verification, idempotency, and durable-storage requirements.

The YZ route remains available for project context, while the Hammad checkout uses PayPro V2 for the configured merchant workflow. The browser must never establish a paid status: only the server-side PayPro GGOS verification or authenticated callback may mark a payment as paid.

For each published update, retain: source owner, event date, evidence location, safeguarding/privacy approval, reviewer, and review/expiry date. Do not publish identifiable learner media, testimonials, receipts, figures, tax status, Zakat status, NGO/charity status, or impact totals without the required evidence and consent.

Run `npm run check` and `npm audit --omit=dev --audit-level=high` before deployment. Set `NEXT_PUBLIC_HAMMAD_SITE_URL`, `NEXT_PUBLIC_YZ_SITE_URL`, and the approved PayPro host-managed secrets. Never expose PayPro credentials through `NEXT_PUBLIC_*` variables.
