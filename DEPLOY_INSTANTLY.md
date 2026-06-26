# Deploy UBAP to Vercel in 3 Steps

## Step 1: Go to Vercel Dashboard
Open https://vercel.com/dashboard and log in with:
- Email: mohamedachafa86@gmail.com
- Password: (Your password)

## Step 2: Create New Project
1. Click "Add New..." → "Project"
2. Select your GitHub repository (UBAP)
3. Click "Import"

## Step 3: Environment Variables (Auto-Populated)
The environment variables are **already configured** in `vercel.json`:

```
PI_API_KEY=ic0tlakkfjllvvjkw1jkvyu5lz2kfgy9zibfe9rtol51wwmakd5qi3wfhngd2kpn
NEXT_PUBLIC_UBAP_WALLET_ADDRESS=GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M
PI_APP_WALLET_PRIVATE_KEY=SAGVBYLF7L7KPHOW66JQYOPMEJMZLXOSZTFIL463PZJ4CGAKQ7MWQR2R
PI_NETWORK=mainnet
```

**If prompted for environment variables during import:**
- Copy the values from `/.env.example`
- Paste into each field in Vercel
- Click "Deploy"

## Step 4: Wait for Deployment
- Deployment takes 2-3 minutes
- You'll see a live URL once complete
- Test at: `https://your-project.vercel.app/admin/wallet-config`

## Verify It's Working
Once deployed, visit:
1. **Admin Wallet Dashboard:** `https://your-project.vercel.app/admin/wallet`
2. **Wallet Config Check:** `https://your-project.vercel.app/admin/wallet-config`
3. **Deposit Page:** `https://your-project.vercel.app/deposit-pi`

## Console Logs
To debug, check Vercel's Function Logs (Deployments → Function Logs) for `[v0]` debug messages:
- `[v0] PiServerSDK initialized`
- `[v0] PiServerSDK.isConfigured: true`
- `[v0] Approve route called`

## If You Get "Wallet Misconfigured" Error
Check the Vercel Function Logs. You should see:
```
[v0] PiServerSDK initialized. API Key configured: ic0tlakkf...
[v0] PiServerSDK.isConfigured: true (Key length: 64)
```

If you see `false`, the environment variables didn't load. Re-check Step 3.

## Support
- Deployment Guide: `VERCEL_DEPLOYMENT_GUIDE.md`
- Wallet Setup: `WALLET_API_KEY_SETUP.md`
- Quick Start: `VERCEL_QUICK_START.md`
