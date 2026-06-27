-- ============================================================================
-- UBAP App Wallet Database Setup
-- ============================================================================
-- Run this script in Supabase to create tables for app wallet management
--
-- Tables created:
--   1. app_wallets - Stores the application's Pi wallet
--   2. wallet_transactions - Records all incoming/outgoing transactions
--
-- ============================================================================

-- Create app_wallets table
CREATE TABLE IF NOT EXISTS app_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT NOT NULL UNIQUE,
  wallet_type TEXT NOT NULL DEFAULT 'pi_app_wallet',
  network TEXT NOT NULL DEFAULT 'pi_testnet', -- pi_testnet or pi_mainnet
  total_received_pi DECIMAL(20, 8) NOT NULL DEFAULT 0,
  total_withdrawn_pi DECIMAL(20, 8) NOT NULL DEFAULT 0,
  current_balance_pi DECIMAL(20, 8) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create wallet_transactions table
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_wallet_id UUID NOT NULL REFERENCES app_wallets(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL, -- 'incoming', 'outgoing', 'internal_transfer'
  from_address TEXT,
  to_address TEXT,
  amount_pi DECIMAL(20, 8) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'pi',
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'cancelled'
  is_sandbox BOOLEAN NOT NULL DEFAULT false,
  txid TEXT UNIQUE,
  payment_id TEXT, -- Links to Pi SDK payment ID
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indices for better query performance
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_app_wallet_id 
  ON wallet_transactions(app_wallet_id);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user_id 
  ON wallet_transactions(user_id);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_status 
  ON wallet_transactions(status);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_created_at 
  ON wallet_transactions(created_at);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_payment_id 
  ON wallet_transactions(payment_id);

-- Enable Row Level Security
ALTER TABLE app_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can read app wallets (public info)
CREATE POLICY "Allow read app_wallets" 
  ON app_wallets FOR SELECT 
  USING (true);

-- RLS Policy: Only authenticated users can read their own transactions
CREATE POLICY "Allow users to read their wallet transactions" 
  ON wallet_transactions FOR SELECT 
  USING (
    auth.uid() IS NOT NULL 
    AND (user_id = auth.uid() OR user_id IS NULL)
  );

-- RLS Policy: Prevent direct updates to app_wallets (use functions)
CREATE POLICY "Prevent direct app_wallets updates" 
  ON app_wallets FOR UPDATE 
  USING (false);

-- RLS Policy: Prevent direct deletes to app_wallets
CREATE POLICY "Prevent app_wallets deletes" 
  ON app_wallets FOR DELETE 
  USING (false);

-- Create function to get wallet stats
CREATE OR REPLACE FUNCTION get_wallet_stats(wallet_id UUID)
RETURNS JSON AS $$
DECLARE
  incoming_count INT;
  outgoing_count INT;
  total_incoming DECIMAL;
  total_outgoing DECIMAL;
  pending_count INT;
BEGIN
  SELECT COUNT(*) INTO incoming_count
  FROM wallet_transactions
  WHERE app_wallet_id = wallet_id AND transaction_type = 'incoming' AND status = 'completed';

  SELECT COUNT(*) INTO outgoing_count
  FROM wallet_transactions
  WHERE app_wallet_id = wallet_id AND transaction_type = 'outgoing' AND status = 'completed';

  SELECT COALESCE(SUM(amount_pi), 0) INTO total_incoming
  FROM wallet_transactions
  WHERE app_wallet_id = wallet_id AND transaction_type = 'incoming' AND status = 'completed';

  SELECT COALESCE(SUM(amount_pi), 0) INTO total_outgoing
  FROM wallet_transactions
  WHERE app_wallet_id = wallet_id AND transaction_type = 'outgoing' AND status = 'completed';

  SELECT COUNT(*) INTO pending_count
  FROM wallet_transactions
  WHERE app_wallet_id = wallet_id AND status = 'pending';

  RETURN json_build_object(
    'incoming_count', incoming_count,
    'outgoing_count', outgoing_count,
    'total_incoming', total_incoming,
    'total_outgoing', total_outgoing,
    'pending_count', pending_count,
    'calculated_at', NOW()
  );
END;
$$ LANGUAGE plpgsql;

-- Create function to update wallet balance
CREATE OR REPLACE FUNCTION update_wallet_balance()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    IF NEW.transaction_type = 'incoming' THEN
      UPDATE app_wallets
      SET current_balance_pi = current_balance_pi + NEW.amount_pi,
          updated_at = NOW()
      WHERE id = NEW.app_wallet_id;
    ELSIF NEW.transaction_type = 'outgoing' THEN
      UPDATE app_wallets
      SET current_balance_pi = GREATEST(0, current_balance_pi - NEW.amount_pi),
          updated_at = NOW()
      WHERE id = NEW.app_wallet_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for balance updates
DROP TRIGGER IF EXISTS trigger_update_wallet_balance ON wallet_transactions;
CREATE TRIGGER trigger_update_wallet_balance
  AFTER UPDATE ON wallet_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_wallet_balance();

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these to verify setup was successful:
--
-- SELECT * FROM app_wallets;
-- SELECT * FROM wallet_transactions;
-- SELECT * FROM pg_indexes WHERE tablename IN ('app_wallets', 'wallet_transactions');
-- ============================================================================
