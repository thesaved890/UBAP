# UBAP Vercel Deployment - Quick Start Checklist

## Pre-Deployment (Do This First)

- [ ] Copy all your credentials safely (keep them private!)
- [ ] Verify your GitHub repository is up to date
- [ ] Check that all code changes are committed and pushed

## Deployment Steps (5 minutes)

### Step 1: Connect to Vercel
- [ ] Go to https://vercel.com/login
- [ ] Log in with **mohamedachafa86@gmail.com**
- [ ] Click **"New Project"**
- [ ] Import your GitHub repository
- [ ] Select framework: **Next.js**

### Step 2: Add Environment Variables
Vercel will show an environment variables screen. Add ALL of these:

**Copy and paste into Vercel (one by one):**

```
PI_API_KEY=ic0tlakkfjllvvjkw1jkvyu5lz2kfgy9zibfe9rtol51wwmakd5qi3wfhngd2kpn

NEXT_PUBLIC_UBAP_WALLET_ADDRESS=GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M

NEXT_PUBLIC_UBAP_RECIPIENT=GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M

PI_APP_WALLET_PRIVATE_KEY=SAGVBYLF7L7KPHOW66JQYOPMEJMZLXOSZTFIL463PZJ4CGAKQ7MWQR2R

PI_NETWORK=mainnet

NEXT_PUBLIC_APP_ID=ubapi-app-id

PI_SANDBOX_MODE=false
```

**Important:** Set EACH variable for ALL environments:
- [ ] Production
- [ ] Preview  
- [ ] Development

### Step 3: Deploy
- [ ] Click **"Deploy"** button
- [ ] Wait 2-3 minutes for deployment to complete
- [ ] You should see "Congratulations, your project has been successfully deployed!"

## Post-Deployment Verification

### Immediate Checks
- [ ] Visit your deployed URL (it will be shown after deployment)
- [ ] App should load without errors
- [ ] Check browser console (F12) - no red errors

### Wallet Verification
- [ ] Go to `https://ubap-drab.vercel.app/admin/wallet-config`
- [ ] Should show all green checkmarks:
  - [ ] Wallet Address Configured ✓
  - [ ] API Key Configured ✓
  - [ ] Network Configured ✓

### Test Payment Flow
- [ ] Click "Deposit Pi" button
- [ ] Should NOT see "App wallet misconfigured" error
- [ ] Payment flow should work normally

## If You Get Errors

### "App wallet misconfigured" message
```
✗ Solution: All environment variables not set correctly
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Verify all PI_* variables are present
3. Click "Redeploy" on latest deployment
```

### "Cannot find module" errors
```
✗ Solution: Dependencies not installed
1. Click on failed deployment
2. Check build logs for missing packages
3. Push code update to GitHub
4. Vercel will automatically redeploy
```

### Blank white page
```
✗ Solution: Check for React/Next.js errors
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any red error messages
4. Check [v0] debug logs
```

## Success! Now What?

Once deployed successfully:

1. **Domain Setup** (Optional)
   - Add custom domain in Vercel Settings
   - DNS configuration will be shown
   - Your validation key is at `/public/validation-key.txt`

2. **Monitor App**
   - Vercel Dashboard shows live stats
   - View deployment logs anytime
   - Get automatic alerts for errors

3. **Make Changes**
   - Push code to GitHub
   - Vercel automatically redeploys
   - Changes go live in 2-3 minutes

4. **Manage Wallet**
   - Visit `/admin/wallet` to view balance
   - Check transaction history
   - Download reports

## Important Security Reminders

⚠️ **NEVER:**
- Share your Vercel login credentials
- Commit `.env.local` to GitHub
- Expose your private key in code
- Share API keys publicly

✅ **DO:**
- Keep credentials in Vercel Environment Variables only
- Use `.gitignore` for sensitive files
- Rotate API keys monthly
- Enable 2FA on Vercel account

## Need More Help?

- Full Guide: Read `VERCEL_DEPLOYMENT_GUIDE.md`
- Wallet Setup: Read `WALLET_API_KEY_SETUP.md`
- Troubleshooting: See `WALLET_CONFIGURATION_GUIDE.md`

---

**Status:** Ready for deployment
**Time Required:** 5-10 minutes
**Difficulty:** Easy
