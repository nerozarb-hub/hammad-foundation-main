CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  paypro_id TEXT UNIQUE,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'PKR',
  project_id TEXT NOT NULL DEFAULT 'hammad-foundation',
  support_option_id TEXT NOT NULL,
  donor_name TEXT NOT NULL,
  donor_email TEXT,
  donor_phone TEXT,
  status TEXT NOT NULL,
  click2pay_url TEXT,
  bill_url TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);
ALTER TABLE donations ADD COLUMN IF NOT EXISTS checkout_key_hash TEXT;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS request_hash TEXT;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS receipt_token_hash TEXT;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS gateway_attempted_at TIMESTAMPTZ;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS verified_paypro_id TEXT;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS verified_amount NUMERIC;
CREATE UNIQUE INDEX IF NOT EXISTS donations_checkout_key_unique ON donations(checkout_key_hash);
ALTER TABLE donations ADD CONSTRAINT donations_amount_valid CHECK (amount >= 100 AND amount <= 5000000 AND amount = round(amount, 2));
ALTER TABLE donations ADD CONSTRAINT donations_currency_valid CHECK (currency = 'PKR');
ALTER TABLE donations ADD CONSTRAINT donations_project_valid CHECK (project_id = 'hammad-foundation');
ALTER TABLE donations ADD CONSTRAINT donations_status_valid CHECK (status IN ('pending', 'paid', 'failed', 'expired'));
ALTER TABLE donations ADD CONSTRAINT donations_paid_verified CHECK (
  (status = 'paid' AND paid_at IS NOT NULL AND paypro_id IS NOT NULL AND verified_paypro_id IS NOT NULL AND verified_amount IS NOT NULL AND verified_paypro_id = paypro_id AND verified_amount = amount)
  OR (status <> 'paid' AND paid_at IS NULL)
);
CREATE TABLE payment_rate_limits (
  bucket TEXT PRIMARY KEY,
  hits INTEGER NOT NULL CHECK (hits > 0),
  resets_at TIMESTAMPTZ NOT NULL
);
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON donations, payment_rate_limits FROM PUBLIC;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE ALL ON donations, payment_rate_limits FROM anon;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    REVOKE ALL ON donations, payment_rate_limits FROM authenticated;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'donations' AND policyname = 'hammad_server_access') THEN
    CREATE POLICY hammad_server_access ON donations FOR ALL TO PUBLIC USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'payment_rate_limits' AND policyname = 'hammad_rate_limit_server_access') THEN
    CREATE POLICY hammad_rate_limit_server_access ON payment_rate_limits FOR ALL TO PUBLIC USING (true) WITH CHECK (true);
  END IF;
END $$;
