# UBAP Wallet Configuration with Pi Network API

## Your Wallet Configuration

**Wallet Address:** `GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M`

**API Key:** `ic0tlakkfjllvvjkw1jkvyu5lz2kfgy9zibfe9rtol51wwmakd5qi3wfhngd2kpn`

**Private Key:** `SAGVBYLF7L7KPHOW66JQYOPMEJMZLXOSZTFIL463PZJ4CGAKQ7MWQR2R`

---

## Step 1: Add Environment Variables to Vercel

### In Vercel Dashboard:

1. Go to your UBAP project settings
2. Click **Settings** → **Environment Variables**
3. Add these three variables:

```
PI_API_KEY = ic0tlakkfjllvvjkw1jkvyu5lz2kfgy9zibfe9rtol51wwmakd5qi3wfhngd2kpn

NEXT_PUBLIC_UBAP_WALLET_ADDRESS = GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M

NEXT_PUBLIC_UBAP_RECIPIENT = GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M

PI_APP_WALLET_PRIVATE_KEY = SAGVBYLF7L7KPHOW66JQYOPMEJMZLXOSZTFIL463PZJ4CGAKQ7MWQR2R

PI_NETWORK = mainnet
```

**IMPORTANT:** These variables must be added to **ALL environments** (Production, Preview, Development)

---

## Step 2: Redeploy Your App

After adding the environment variables:

1. Go back to your UBAP project in Vercel
2. Click **Deployments**
3. Find the latest deployment
4. Click the **three dots (...)** menu
5. Select **Redeploy**
6. Wait for redeployment to complete (should take 2-3 minutes)

---

## Step 3: Verify Configuration

### Option A: Via Admin Dashboard

1. Navigate to `/admin/wallet-config` in your app
2. You should see green checkmarks for:
   - ✅ API Key configured
   - ✅ Wallet address configured
   - ✅ Recipient address set
   - ✅ Production mode enabled

### Option B: Via Browser Console

1. Open your app in Pi Browser
2. Press `F12` to open Developer Console
3. Look for logs starting with `[v0]`:
   - `[v0] PiServerSDK initialized. API Key configured: ic0tlakkfj...`
   - `[v0] PiServerSDK.isConfigured: true Key length: 64`

### Option C: Test a Deposit

1. Navigate to `/deposit-pi` page
2. Enter a test amount (e.g., 1 Pi)
3. Click "Deposer" (Deposit)
4. If wallet is properly configured:
   - You'll see "Confirmez dans votre Pi Wallet"
   - Your Pi Wallet will open with the payment request
   - After confirmation, the transaction records to your wallet

---

## What Each Variable Does

| Variable | Purpose |
|----------|---------|
| `PI_API_KEY` | Authenticates with Pi Platform API for payment approval/completion |
| `NEXT_PUBLIC_UBAP_WALLET_ADDRESS` | Public wallet address that receives all deposits |
| `NEXT_PUBLIC_UBAP_RECIPIENT` | Where deposits are sent (same as above) |
| `PI_APP_WALLET_PRIVATE_KEY` | Signs server-side transactions (keep secure!) |
| `PI_NETWORK` | Set to `mainnet` for production, `testnet` for testing |

---

## How Payment Flow Works

```
1. User enters amount on /deposit-pi
2. Pi.createPayment() opens user's wallet
3. User confirms → /api/pi/approve is called (uses PI_API_KEY)
4. Pi blockchain settles transaction
5. /api/pi/complete is called (records to app wallet)
6. Balance updates to user's account
7. Transaction stored in database
```

---

## Troubleshooting

### "App wallet is misconfigured" Error

**Solution:** The `PI_API_KEY` is not set or is too short.

- Verify `PI_API_KEY` is exactly: `ic0tlakkfjllvvjkw1jkvyu5lz2kfgy9zibfe9rtol51wwmakd5qi3wfhngd2kpn`
- Check it in Vercel Settings → Environment Variables
- Redeploy after adding

### "Wallet not configured" on Pi Developer Portal

**Solution:** Your app wallet may not be set up on Pi Platform.

1. Go to https://develop.pi (in Pi Browser)
2. Select your UBAP app
3. Left menu → **App Wallet** → **Setup Wallet**
4. Copy the wallet address and add it to Vercel env vars

### Payment stays in "waiting_wallet"

**Solution:** Either API key is missing or wrong.

- Open browser DevTools (F12)
- Check Console for `[v0]` logs
- If you see `API Key not configured`, add `PI_API_KEY` to Vercel

### "WALLET_NOT_SETUP" Error

**Solution:** The API key exists but Pi thinks the wallet isn't ready.

1. Go back to https://develop.pi
2. Ensure wallet shows "Active" status
3. Try regenerating the API key
4. Update `PI_API_KEY` in Vercel with new key

---

## Verification Checklist

- [ ] PI_API_KEY added to Vercel (64 characters)
- [ ] NEXT_PUBLIC_UBAP_WALLET_ADDRESS added (56 characters)
- [ ] NEXT_PUBLIC_UBAP_RECIPIENT added (same as above)
- [ ] PI_APP_WALLET_PRIVATE_KEY added
- [ ] PI_NETWORK set to `mainnet`
- [ ] All vars added to ALL environments (Production/Preview/Development)
- [ ] Project redeployed in Vercel
- [ ] No green error banners on `/admin/wallet-config`
- [ ] Test deposit works end-to-end

---

## Testing Payment Flow

### Safe Test (Demo Mode)

1. Go to `/deposit-pi`
2. Enter amount: `1`
3. Click "Deposer"
4. In demo mode, payment auto-completes
5. Check `/wallet` page for new balance

### Real Pi Browser Test

1. Open UBAP in Pi Browser on your phone
2. Go to `/deposit-pi`
3. Enter amount: `0.1` (small amount for testing)
4. Click "Deposer"
5. Confirm in your Pi Wallet
6. Wait for blockchain confirmation (10-30 seconds)
7. Check `/wallet` to verify deposit

---

## Support

If you continue seeing "App wallet is misconfigured":

1. Verify all 5 environment variables are in Vercel
2. Check that you redeployed AFTER adding variables
3. Wait 5+ minutes for cache to clear
4. Clear browser cache (Ctrl+Shift+Delete)
5. Try incognito/private browsing mode
6. Verify API key with Pi Developer Portal

For the log summary, you configured:
- **Wallet:** GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M
- **API:** ic0tlakkfjllvvjkw1jkvyu5lz2kfgy9zibfe9rtol51wwmakd5qi3wfhngd2kpn
- **Mode:** Production (Pi Mainnet)
