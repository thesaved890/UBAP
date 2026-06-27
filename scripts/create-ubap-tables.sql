-- UBAP Database Schema for Supabase
-- Run this script in Supabase SQL Editor

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pi_uid TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  country TEXT,
  preferred_language TEXT DEFAULT 'fr',
  pi_balance DECIMAL(20, 7) DEFAULT 0,
  fiat_balance DECIMAL(20, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  status TEXT DEFAULT 'completed',
  details TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL, -- 'send', 'receive', 'convert', 'bill_payment', 'savings'
  amount DECIMAL(20, 7) NOT NULL,
  currency TEXT NOT NULL, -- 'PI', 'XAF', 'NGN', etc.
  recipient TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  reference_number TEXT UNIQUE,
  metadata JSONB, -- Store additional info (route, fees, etc.)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Virtual Cards table
CREATE TABLE IF NOT EXISTS virtual_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  card_number TEXT NOT NULL,
  cardholder_name TEXT NOT NULL,
  expiry_date TEXT NOT NULL,
  cvv TEXT NOT NULL,
  card_type TEXT DEFAULT 'visa', -- 'visa', 'mastercard'
  status TEXT DEFAULT 'active', -- 'active', 'frozen', 'closed'
  balance DECIMAL(20, 2) DEFAULT 0,
  spending_limit DECIMAL(20, 2) DEFAULT 100000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Savings Goals table
CREATE TABLE IF NOT EXISTS savings_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  goal_name TEXT NOT NULL,
  target_amount DECIMAL(20, 2) NOT NULL,
  current_amount DECIMAL(20, 2) DEFAULT 0,
  currency TEXT DEFAULT 'XAF',
  deadline DATE,
  icon TEXT,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'paused'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Group Savings (Tontine) table
CREATE TABLE IF NOT EXISTS group_savings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  group_name TEXT NOT NULL,
  target_amount DECIMAL(20, 2) NOT NULL,
  current_amount DECIMAL(20, 2) DEFAULT 0,
  currency TEXT DEFAULT 'XAF',
  deadline DATE,
  member_count INTEGER DEFAULT 1,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Group Savings Members table
CREATE TABLE IF NOT EXISTS group_savings_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES group_savings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  contributed_amount DECIMAL(20, 2) DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Bank Accounts table
CREATE TABLE IF NOT EXISTS bank_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_name TEXT NOT NULL,
  country TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mobile Money Accounts table
CREATE TABLE IF NOT EXISTS mobile_money_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL, -- 'MTN', 'Orange', 'Airtel', etc.
  phone_number TEXT NOT NULL,
  account_name TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Escrow Transactions table
CREATE TABLE IF NOT EXISTS escrow_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID,
  amount DECIMAL(20, 7) NOT NULL,
  currency TEXT DEFAULT 'PI',
  conditions TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'released', 'refunded', 'disputed'
  release_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Precious Materials Holdings table
CREATE TABLE IF NOT EXISTS material_holdings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  material_type TEXT NOT NULL, -- 'gold', 'silver', 'diamond', 'platinum', 'palladium'
  quantity DECIMAL(20, 7) NOT NULL,
  purchase_price DECIMAL(20, 2) NOT NULL,
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_pi_uid ON users(pi_uid);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_reference ON transactions(reference_number);
CREATE INDEX IF NOT EXISTS idx_virtual_cards_user_id ON virtual_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_savings_goals_user_id ON savings_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_group_savings_creator ON group_savings(creator_id);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_user_id ON bank_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_mobile_money_user_id ON mobile_money_accounts(user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE virtual_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_savings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE mobile_money_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE escrow_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_holdings ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only access their own data)
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = pi_uid);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = pi_uid);
CREATE POLICY "Allow audit inserts" ON audit_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow audit reads" ON audit_logs FOR SELECT USING (true);

CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (user_id IN (SELECT id FROM users WHERE pi_uid = auth.uid()::text));
CREATE POLICY "Users can create transactions" ON transactions FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE pi_uid = auth.uid()::text));

CREATE POLICY "Users can view own cards" ON virtual_cards FOR SELECT USING (user_id IN (SELECT id FROM users WHERE pi_uid = auth.uid()::text));
CREATE POLICY "Users can manage own cards" ON virtual_cards FOR ALL USING (user_id IN (SELECT id FROM users WHERE pi_uid = auth.uid()::text));

CREATE POLICY "Users can view own savings" ON savings_goals FOR SELECT USING (user_id IN (SELECT id FROM users WHERE pi_uid = auth.uid()::text));
CREATE POLICY "Users can manage own savings" ON savings_goals FOR ALL USING (user_id IN (SELECT id FROM users WHERE pi_uid = auth.uid()::text));

CREATE POLICY "Users can view own bank accounts" ON bank_accounts FOR SELECT USING (user_id IN (SELECT id FROM users WHERE pi_uid = auth.uid()::text));
CREATE POLICY "Users can manage own bank accounts" ON bank_accounts FOR ALL USING (user_id IN (SELECT id FROM users WHERE pi_uid = auth.uid()::text));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
