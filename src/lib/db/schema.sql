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
