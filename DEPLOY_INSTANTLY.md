# Deploy UBAP to Vercel in 3 Steps

## Step 1: Go to Vercel Dashboard
Open https://vercel.com/dashboard and log in to your account or team.

## Step 2: Create New Project
1. Click "Add New..." → "Project"
2. Select your GitHub repository (UBAP)
3. Click "Import"

## Step 3: Environment Variables
Do NOT store secrets in the repository. `vercel.json` no longer contains secret values — set them in the Vercel dashboard or via the Vercel CLI.

Dashboard: Project Settings → Environment Variables → Add each variable (`PI_API_KEY`, `PI_APP_WALLET_PRIVATE_KEY`, etc.)

CLI (example):
```
vercel env add PI_API_KEY production
vercel env add PI_APP_WALLET_PRIVATE_KEY production
vercel env add PI_NETWORK production
```
Or upload values during project import. Refer to `WALLET_API_KEY_SETUP.md` for required keys.

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

If you see `false`, the environment variables didn't load. Re-check Step 3 and confirm variables exist for the correct environment (Preview vs Production).

## Support
- Deployment Guide: `VERCEL_DEPLOYMENT_GUIDE.md`
- Wallet Setup: `WALLET_API_KEY_SETUP.md`
- Quick Start: `VERCEL_QUICK_START.md`
