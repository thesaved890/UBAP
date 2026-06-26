# App Wallet Configuration Guide

## Overview

Your UBAP app is now configured to receive Pi payments directly to your app wallet. This guide walks you through the final setup steps.

## Your Wallet Details

**Wallet Address:** `GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M`

**Network:** Pi Mainnet

## Step 1: Configure Environment Variables in Vercel

Your wallet address and private key must be added to your Vercel project settings.

### 1.1 Access Vercel Project Settings

1. Go to [vercel.com](https://vercel.com)
2. Select your UBAP project
3. Navigate to **Settings** → **Environment Variables**

### 1.2 Add Wallet Address (Public)

**Variable Name:** `NEXT_PUBLIC_APP_WALLET_ADDRESS`

**Value:** `GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M`

**Environments:** Production, Preview, Development

**Description:** Public app wallet address for receiving Pi payments

### 1.3 Add Private Key (Secret - Production Only)

**Variable Name:** `PI_APP_WALLET_PRIVATE_KEY`

**Value:** `SAGVBYLF7L7KPHOW66JQYOPMEJMZLXOSZTFIL463PZJ4CGAKQ7MWQR2R`

**⚠️ CRITICAL SECURITY WARNING ⚠️**
- **NEVER** share this key with anyone
- **NEVER** commit it to version control
- Store it ONLY in Vercel (encrypted)
- This key has access to all Pi in your wallet

**Recommended:** Only add to Production environment

### 1.4 Add Pi Network Configuration

**Variable Name:** `PI_NETWORK`

**Value:** `mainnet`

**Description:** Pi Network environment (mainnet or testnet)

## Step 2: Redeploy Application

After adding environment variables:

1. Go to **Deployments** in Vercel
2. Click **Redeploy** on the latest successful deployment
3. Wait for the deployment to complete (2-3 minutes)

## Step 3: Verify Database Setup

Run the wallet setup SQL script in your Supabase database:

```sql
-- Create app_wallets table
CREATE TABLE IF NOT EXISTS app_wallets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT UNIQUE NOT NULL,
  wallet_type TEXT DEFAULT 'pi_app_wallet',
  network TEXT DEFAULT 'pi_mainnet',
  total_received_pi NUMERIC(20, 8) DEFAULT 0,
  total_withdrawn_pi NUMERIC(20, 8) DEFAULT 0,
  current_balance_pi NUMERIC(20, 8) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create wallet_transactions table
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  app_wallet_id UUID NOT NULL REFERENCES app_wallets(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL,
  from_address TEXT,
  to_address TEXT,
  amount_pi NUMERIC(20, 8) NOT NULL,
  currency TEXT DEFAULT 'pi',
  status TEXT DEFAULT 'pending',
  txid TEXT,
  payment_id TEXT,
  user_id TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_wallet_transactions_app_wallet_id ON wallet_transactions(app_wallet_id);
CREATE INDEX idx_wallet_transactions_payment_id ON wallet_transactions(payment_id);
CREATE INDEX idx_wallet_transactions_status ON wallet_transactions(status);
```

Steps:
1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your UBAP project
3. Go to **SQL Editor**
4. Create new query
5. Paste and run the SQL above

## Step 4: Verify Configuration

After redeployment and database setup:

1. Navigate to `/admin/wallet-config` in your app
2. Check that all configuration items show green checkmarks
3. Verify wallet address is displayed correctly
4. Confirm private key status shows "✓ Configured"

## How Payments Flow

### User Makes a Payment

1. User initiates Pi payment from their wallet
2. Pi SDK calls `/api/pi/approve` to request approval
3. User approves payment in Pi app
4. Pi blockchain confirms transaction

### Payment Received

1. `/api/pi/complete` endpoint is called
2. System records transaction in `wallet_transactions` table
3. App wallet balance is updated
4. Transaction status set to "completed"

### Transaction Record

Each transaction includes:
- **paymentId**: Unique payment identifier
- **txid**: Pi blockchain transaction ID
- **amount_pi**: Amount in Pi
- **userId**: User who initiated payment (if applicable)
- **timestamp**: When received
- **status**: pending → completed

## Admin Dashboard

View your app wallet activity:

**Navigate to:** `/admin/wallet`

**Features:**
- Real-time balance display
- Total received Pi
- Total withdrawn Pi
- Complete transaction history
- Download reports
- Transaction details

## Troubleshooting

### "Wallet address not configured"

- Check environment variables in Vercel are set
- Verify `NEXT_PUBLIC_APP_WALLET_ADDRESS` is correct
- Wait 5 minutes for deployment to propagate
- Hard refresh browser (Ctrl+Shift+R)

### "Private key not configured"

- Add `PI_APP_WALLET_PRIVATE_KEY` to Vercel
- Ensure value is exactly: `SAGVBYLF7L7KPHOW66JQYOPMEJMZLXOSZTFIL463PZJ4CGAKQ7MWQR2R`
- Set to Production environment only
- Redeploy application

### Transactions not appearing

- Verify database tables created with SQL script
- Check Supabase connection in env variables
- Review database logs for errors
- Check browser console for API errors

### Wrong address showing

- Environment variable may be cached
- Clear all browser caches
- Force redeploy on Vercel
- Verify exact address spelling

## Security Best Practices

1. **Never log the private key** - Remove from console logs
2. **Use HTTPS only** - Vercel does this automatically
3. **Limit admin access** - Only you should see `/admin/wallet`
4. **Monitor transactions** - Review unusual activity
5. **Backup wallet** - Keep private key in secure location
6. **Rotate credentials** - Consider quarterly key rotations

## Testing

### Test Payment Flow

1. Go to `/wallet` page
2. Try making a small test payment
3. Check `/admin/wallet` to see transaction recorded
4. Verify balance updated correctly

### Monitor Real Payments

Once live:
- Visit `/admin/wallet` regularly
- Download transaction reports
- Review for fraud/unusual patterns
- Set up notifications (coming soon)

## Support

For issues:
1. Check this guide's Troubleshooting section
2. Review `/admin/wallet-config` status page
3. Check browser console for errors
4. Review Supabase logs
5. Check Vercel deployment logs

## Next Steps

After verification:

1. ✅ Test with small payment
2. ✅ Monitor first transactions
3. ✅ Set up notifications (optional)
4. ✅ Download transaction reports
5. ✅ Go live with full integration

Your app wallet is now ready to receive payments!
