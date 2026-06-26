# Vercel Deployment Guide for UBAP

## Security Notice
**NEVER share your Vercel login credentials with anyone, including AI assistants.** This guide will help you deploy securely yourself.

## Step 1: Connect GitHub to Vercel

1. Go to https://vercel.com/login
2. Log in with: **mohamedachafa86@gmail.com**
3. Click **"New Project"**
4. Select **"Import Git Repository"**
5. Choose your GitHub repository
6. Click **"Import"**

## Step 2: Configure Environment Variables in Vercel

After importing, you'll see the environment variables screen.

### Add these environment variables:

**Production, Preview, and Development (All Environments)**

```
PI_API_KEY=ic0tlakkfjllvvjkw1jkvyu5lz2kfgy9zibfe9rtol51wwmakd5qi3wfhngd2kpn
NEXT_PUBLIC_UBAP_WALLET_ADDRESS=GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M
NEXT_PUBLIC_UBAP_RECIPIENT=GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M
PI_APP_WALLET_PRIVATE_KEY=SAGVBYLF7L7KPHOW66JQYOPMEJMZLXOSZTFIL463PZJ4CGAKQ7MWQR2R
PI_NETWORK=mainnet
NEXT_PUBLIC_APP_ID=ubapi-app-id
PI_SANDBOX_MODE=false
```

### For Supabase/Database Connection (if using):

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=your-database-url
```

## Step 3: Deploy Your App

1. Click **"Deploy"** button
2. Wait for deployment to complete (usually 2-3 minutes)
3. Your app will be live at `https://your-project-name.vercel.app`

## Step 4: Verify Deployment

After deployment completes:

1. Visit your deployed URL
2. Go to `/admin/wallet-config` to verify wallet setup
3. Check browser console (F12) for `[v0]` debug logs
4. Ensure no "App wallet misconfigured" errors appear

## Step 5: Enable Production Domain (Optional)

If you have a custom domain:

1. In Vercel Dashboard → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Add domain validation file at `/public/validation-key.txt` (already created)

## Environment Variables Explanation

| Variable | Purpose | Example |
|----------|---------|---------|
| `PI_API_KEY` | Pi Network API authentication | Your API key from Pi Developer Portal |
| `NEXT_PUBLIC_UBAP_WALLET_ADDRESS` | App wallet that receives Pi deposits | Your wallet address |
| `NEXT_PUBLIC_UBAP_RECIPIENT` | Recipient wallet for payments | Same as wallet address |
| `PI_APP_WALLET_PRIVATE_KEY` | Secure signing (PRODUCTION ONLY) | Your private key |
| `PI_NETWORK` | Network mode | `mainnet` or `testnet` |
| `NEXT_PUBLIC_APP_ID` | App identifier | Unique ID for your app |
| `PI_SANDBOX_MODE` | Sandbox testing mode | `true` or `false` |

## Redeploy When Making Changes

Every time you:
- Update environment variables
- Push code to GitHub
- Want to deploy changes

Vercel will automatically redeploy. You can also manually trigger deployment:

1. Go to Vercel Dashboard
2. Select your project
3. Click **"Deployments"** tab
4. Find the latest deployment
5. Click the **"..."** menu → **"Redeploy"**

## Troubleshooting

### "App wallet misconfigured" error
- Verify all PI_* environment variables are set correctly in Vercel
- Ensure variable names match exactly (case-sensitive)
- Redeploy after adding variables
- Check logs with `vercel logs` command

### Payment not working
- Confirm `PI_API_KEY` is valid in Vercel settings
- Check if wallet address starts with correct prefix
- Verify payment scope in Pi SDK initialization

### Domain validation fails
- Ensure `/public/validation-key.txt` exists
- File should be publicly accessible at `domain.com/validation-key.txt`
- Verify file permissions are correct

### Still having issues?
1. Check Vercel Deployments tab for errors
2. Review build logs
3. Use `vercel logs` to see runtime errors
4. Ensure all variables are in correct environment (Production/Preview/Development)

## Security Best Practices

1. **Never commit `.env.local` to GitHub** - it's already in `.gitignore`
2. **Keep private keys secure** - only in Vercel Environment Variables
3. **Use different keys for staging/production** if possible
4. **Rotate API keys regularly** in Pi Developer Portal
5. **Enable 2FA on your Vercel account**

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Pi Network Docs: https://docs.pi-network.dev
- UBAP Wallet Setup: See `WALLET_API_KEY_SETUP.md`
