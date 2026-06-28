# App Wallet Setup Checklist

## ✅ Wallet Credentials Provided

Your app wallet has been created with the following credentials:

**Wallet Address:**
```
GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M
```

**Private Key:**
```
SAGVBYLF7L7KPHOW66JQYOPMEJMZLXOSZTFIL463PZJ4CGAKQ7MWQR2R
```

**Network:** Pi Mainnet

---

## Setup Steps

### Step 1: Vercel Environment Variables ⚙️

- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Select UBAP project
- [ ] Click Settings → Environment Variables
- [ ] Add `NEXT_PUBLIC_UBAP_WALLET_ADDRESS` = `GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M`
- [ ] Add `PI_APP_WALLET_PRIVATE_KEY` = `SAGVBYLF7L7KPHOW66JQYOPMEJMZLXOSZTFIL463PZJ4CGAKQ7MWQR2R` (Production only)
- [ ] Add `PI_NETWORK` = `mainnet`
- [ ] Click "Redeploy" on latest deployment

### Step 2: Database Setup 🗄️

**Run in Supabase SQL Editor:**

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

-- Create indices for performance
CREATE INDEX idx_wallet_transactions_app_wallet_id ON wallet_transactions(app_wallet_id);
CREATE INDEX idx_wallet_transactions_payment_id ON wallet_transactions(payment_id);
CREATE INDEX idx_wallet_transactions_status ON wallet_transactions(status);
CREATE INDEX idx_wallet_transactions_created_at ON wallet_transactions(created_at);
```

Steps:
- [ ] Open Supabase project
- [ ] Go to SQL Editor
- [ ] Create new query
- [ ] Paste SQL script above
- [ ] Click "Run"
- [ ] Verify tables created (2 tables in sidebar)

### Step 3: Verify Configuration 🔍

**In your app, navigate to `/admin/wallet-config`**

Should see:
- [ ] ✅ "Wallet Configured" status (green)
- [ ] Wallet address displayed correctly
- [ ] Private key shows "✓ Configured"
- [ ] Network shows "mainnet"

### Step 4: Test Payment Flow 💰

1. [ ] Navigate to `/wallet` page
2. [ ] Initiate a small test payment (0.1 Pi or less)
3. [ ] Complete payment in Pi app
4. [ ] Wait 30-60 seconds for blockchain confirmation
5. [ ] Check `/admin/wallet` dashboard
6. [ ] Verify transaction appears in history
7. [ ] Confirm balance increased by payment amount

### Step 5: Monitor Production 📊

Once live:
- [ ] Visit `/admin/wallet` daily
- [ ] Review recent transactions
- [ ] Check for unusual patterns
- [ ] Download weekly reports
- [ ] Monitor total balance

---

## How It Works

### Payment Received Flow

```
User Makes Payment
        ↓
   Pi SDK confirms
        ↓
/api/pi/complete called
        ↓
Transaction recorded to DB
        ↓
Wallet balance updated
        ↓
✅ Payment complete
```

### Transaction Storage

Each transaction includes:
- **Payment ID** - Unique identifier
- **Transaction ID** - Pi blockchain confirmation
- **Amount** - Pi received
- **User ID** - Who sent it
- **Status** - pending/completed/failed
- **Timestamp** - When received

---

## Important Files

| File | Purpose |
|------|---------|
| `/lib/app-wallet-service.ts` | Wallet service logic |
| `/app/api/wallet/config/route.ts` | Configuration verification |
| `/app/admin/wallet-config/page.tsx` | Setup verification page |
| `/app/admin/wallet/page.tsx` | Balance & transactions dashboard |
| `/WALLET_CONFIGURATION_GUIDE.md` | Detailed setup guide |

---

## Security Notes

⚠️ **CRITICAL:**
- Never share your private key
- Never commit it to git/GitHub
- Store only in Vercel environment
- Use HTTPS only
- Monitor for unauthorized access
- Keep backup of private key in secure location

✅ **Best Practices:**
- Review transactions daily
- Set spending limits
- Enable 2FA on Vercel
- Use strong passwords
- Monitor account activity

---

## Troubleshooting

### Configuration not working?
1. Check environment variables in Vercel
2. Verify exact spelling and no extra spaces
3. Hard refresh browser (Ctrl+Shift+R)
4. Wait 5 minutes for deployment
5. Check `/admin/wallet-config` for details

### No transactions showing?
1. Verify database tables created
2. Check Supabase connection settings
3. Verify `SUPABASE_SERVICE_ROLE_KEY` set
4. Review browser console for errors
5. Check application logs in Vercel

### Wrong address displayed?
1. Verify `NEXT_PUBLIC_UBAP_WALLET_ADDRESS` in Vercel
2. Check no typos in address
3. Force redeploy on Vercel
4. Clear browser cache completely
5. Try incognito/private window

---

## Next Steps

After setup:

1. ✅ **Test** - Make small test payments
2. ✅ **Monitor** - Review first week of transactions
3. ✅ **Document** - Keep records of all transactions
4. ✅ **Backup** - Store private key securely
5. ✅ **Scale** - Open to full user payments

---

## Support Resources

- 📖 [Full Configuration Guide](./WALLET_CONFIGURATION_GUIDE.md)
- 📊 [Admin Dashboard](./app/admin/wallet/page.tsx)
- 🔧 [Configuration Status](./app/admin/wallet-config/page.tsx)
- 💾 [Database Setup](./scripts/setup-app-wallet.sql)

---

**Status:** ✅ Ready for Setup  
**Updated:** 2024  
**Network:** Pi Mainnet
