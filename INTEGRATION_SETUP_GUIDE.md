# UBAP Integration Setup Guide

This guide will help you set up Pi Network SDK and OCR services for production use.

## 1. Pi Network SDK Integration

### Step 1: Get Pi Network API Key

1. Go to https://develop.pi/
2. Sign in with your Pi account
3. Click "Create New App"
4. Fill in app details:
   - App Name: **UBAP**
   - App URL: Your deployed Vercel URL (e.g., `https://ubap-drab.vercel.app`)
   - Description: United Bank for African Pioneers
5. Copy your **API Key**

### Step 2: Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:
   ```
   PI_API_KEY=your_api_key_here
   PI_WALLET_PRIVATE_KEY=your_wallet_private_key_here
   ```
4. Click **Save**
5. Redeploy your app

### Step 3: Test Pi Payments

- Go to `/deposit-pi` page
- Click "Deposit Pi"
- Pi Browser will open payment dialog
- Complete test payment in sandbox mode

### Step 4: Switch to Production

Once tested, update in `/lib/pi-network-sdk.ts`:
```typescript
constructor(apiKey?: string, sandbox = false) { // Change to false
```

---

## 2. OCR Service Integration (Google Cloud Vision)

### Step 1: Enable Google Cloud Vision API

1. Go to https://console.cloud.google.com/
2. Create a new project or select existing one
3. Enable **Cloud Vision API**:
   - Search "Cloud Vision API" in search bar
   - Click **Enable**
4. Create API credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **API Key**
   - Copy your API Key
   - (Optional) Restrict API key to Cloud Vision API only

### Step 2: Add Environment Variable

In Vercel dashboard:
```
GOOGLE_CLOUD_VISION_API_KEY=your_google_api_key_here
```

### Step 3: Update OCR Service

In `/lib/ocr-service.ts`, change constructor:
```typescript
constructor(provider: 'google' | 'aws' | 'mock' = 'google') { // Change to 'google'
```

### Step 4: Test OCR

1. Go to `/smart-exchange`
2. Select "Bank Transfer" payment method
3. Upload a photo of bank RIB/IBAN
4. System should automatically extract account info

### Pricing

- **First 1,000 images/month**: FREE
- **After 1,000**: $1.50 per 1,000 images
- Typical usage: ~500 images/month for 1,000 users

---

## Alternative: AWS Textract (Optional)

If you prefer AWS:

### Step 1: AWS Setup

1. Go to https://console.aws.amazon.com/textract/
2. Create AWS account if needed
3. Get credentials:
   - Go to IAM → Users → Create User
   - Attach policy: **AmazonTextractFullAccess**
   - Generate Access Keys

### Step 2: Add Environment Variables

```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
```

### Step 3: Install AWS SDK

In your local project:
```bash
npm install @aws-sdk/client-textract
```

---

## Testing Without API Keys (Mock Mode)

Current setup uses **mock mode** by default:
- OCR extracts fake but realistic bank data
- Pi payments show dialog but don't execute real transactions
- Perfect for testing UI/UX before production

To test:
1. Deploy app to Vercel
2. Share link with beta testers
3. Collect feedback on UX
4. Then add real API keys when ready to launch

---

## Cost Estimate

For 1,000 active users:

| Service | Monthly Usage | Cost |
|---------|--------------|------|
| Pi Network SDK | Free | $0 |
| Google Cloud Vision OCR | ~500 images | $0 (within free tier) |
| Vercel Hosting | Standard | $0 (free tier) or $20 (Pro) |
| **Total** | | **$0-20/month** |

---

## Quick Start Checklist

- [ ] Deploy UBAP to Vercel
- [ ] Test all features in mock mode
- [ ] Get Pi Network API Key from develop.pi
- [ ] Add PI_API_KEY to Vercel environment variables
- [ ] Enable Google Cloud Vision API
- [ ] Add GOOGLE_CLOUD_VISION_API_KEY to Vercel
- [ ] Test Pi payments in sandbox
- [ ] Test OCR extraction with real bank documents
- [ ] Switch to production mode
- [ ] Launch to users!

---

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify all environment variables are set correctly
3. Test API keys with curl commands
4. Check API quotas/limits

**Pi Network Support**: https://socialchain.app/
**Google Cloud Support**: https://cloud.google.com/support
