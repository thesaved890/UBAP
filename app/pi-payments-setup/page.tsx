'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  CheckCircle2,
  AlertCircle,
  Wallet,
  Key,
  Smartphone,
  ArrowRight,
  HelpCircle,
} from 'lucide-react'

export default function PiPaymentsSetup() {
  const [walletConfigured, setWalletConfigured] = useState(false)
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false)
  const [isInPiBrowser, setIsInPiBrowser] = useState(false)

  useEffect(() => {
    // Check if Pi SDK is available
    setIsInPiBrowser(typeof (window as any).Pi !== 'undefined')

    // Check if wallet is configured
    const hasWallet = !!process.env.NEXT_PUBLIC_UBAP_WALLET_ADDRESS &&
      process.env.NEXT_PUBLIC_UBAP_WALLET_ADDRESS !== 'ubap_default_wallet'
    setWalletConfigured(hasWallet)

    // Check if API key is configured (we can't check this on client, so we assume it's needed)
    // In production, this would be verified on the server
    setApiKeyConfigured(false)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold">Pi Payments Setup</h1>
          <p className="text-sm text-muted-foreground">Complete integration guide for real Pi deposits</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <span className="text-sm font-medium">Pi Browser</span>
              {isInPiBrowser ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs">Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-xs">Open in Pi Browser</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <span className="text-sm font-medium">Wallet Configured</span>
              {walletConfigured ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs">Ready</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-xs">Not configured</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <span className="text-sm font-medium">Production Mode</span>
              {apiKeyConfigured ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs">Active</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-blue-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-xs">Demo Mode</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* For Pioneers */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">For Pioneers - How to Deposit Pi</h2>

          <Alert>
            <Wallet className="h-4 w-4" />
            <AlertDescription>
              You can start depositing Pi right now! Open UBAP in Pi Browser and click "Deposit Pi".
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex gap-4 p-4 rounded-lg border">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-semibold text-sm">Open in Pi Browser</p>
                <p className="text-xs text-muted-foreground">Open UBAP on your phone in Pi Browser</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg border">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-semibold text-sm">Click "Deposit Pi"</p>
                <p className="text-xs text-muted-foreground">Tap the Deposit button on the home page</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg border">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-semibold text-sm">Enter Amount</p>
                <p className="text-xs text-muted-foreground">Type the amount of Pi you want to deposit (minimum 1 π)</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg border">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <p className="font-semibold text-sm">Confirm in Your Pi Wallet</p>
                <p className="text-xs text-muted-foreground">Your personal Pi Wallet will open. Verify the amount and confirm with your credentials</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg border bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                ✓
              </div>
              <div>
                <p className="font-semibold text-sm">Deposit Complete!</p>
                <p className="text-xs text-muted-foreground">Your Pi balance in UBAP is updated instantly. A small fee (0.1%) is deducted.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/deposit-pi" className="flex-1">
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                <ArrowRight className="h-4 w-4 mr-2" />
                Deposit Pi Now
              </Button>
            </Link>
            <Link href="/pi-setup-guide">
              <Button variant="outline">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </Button>
            </Link>
          </div>
        </div>

        {/* For Administrators */}
        <div className="space-y-4 pt-6 border-t">
          <h2 className="text-xl font-bold">For Administrators - Enable Production Mode</h2>

          <Alert>
            <Key className="h-4 w-4" />
            <AlertDescription>
              To enable real Pi deposits on Mainnet, configure these environment variables in Vercel.
            </AlertDescription>
          </Alert>

          <Card className="bg-slate-50 dark:bg-slate-950">
            <CardHeader>
              <CardTitle className="text-base">Step 1: Get Your Wallet Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Open <code className="bg-background px-1.5 py-0.5 rounded">https://develop.pi</code> in Pi Browser</li>
                <li>Select your UBAP app</li>
                <li>Go to <strong>App Wallet</strong> → <strong>Setup Wallet</strong></li>
                <li>Copy your wallet address</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-950">
            <CardHeader>
              <CardTitle className="text-base">Step 2: Get Your API Key</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>From the same App Portal</li>
                <li>Go to <strong>API Keys</strong></li>
                <li>Copy your <strong>Production</strong> API Key</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-950">
            <CardHeader>
              <CardTitle className="text-base">Step 3: Add to Vercel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>
                  Go to your Vercel project
                  <p className="text-xs ml-5">Project → Settings (top right)</p>
                </li>
                <li>
                  Navigate to <strong>Environment Variables</strong>
                  <p className="text-xs ml-5">Settings → Environment Variables</p>
                </li>
                <li>
                  Add two variables:
                  <div className="ml-5 mt-1 space-y-1">
                    <div className="font-mono text-xs bg-background px-2 py-1 rounded">
                      NEXT_PUBLIC_UBAP_WALLET_ADDRESS = (your wallet address)
                    </div>
                    <div className="font-mono text-xs bg-background px-2 py-1 rounded">
                      PI_API_KEY = (your production API key)
                    </div>
                  </div>
                </li>
                <li>Click <strong>Save</strong></li>
              </ol>
            </CardContent>
          </Card>

          <Alert className="border-green-300 bg-green-50 dark:bg-green-950/20">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Once configured, Pioneers can deposit real Pi on Mainnet. Your app will auto-redeploy with the new variables.
            </AlertDescription>
          </Alert>
        </div>

        {/* Technical Details */}
        <div className="space-y-4 pt-6 border-t">
          <h2 className="text-xl font-bold">Technical Implementation</h2>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment Flow</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>1. Pioneer opens Pi Wallet (their own, not UBAP's)</p>
              <p>2. Frontend calls <code className="bg-background px-1 rounded text-xs">Pi.createPayment()</code></p>
              <p>3. Backend approves via <code className="bg-background px-1 rounded text-xs">/api/pi/approve</code></p>
              <p>4. Blockchain confirms transaction</p>
              <p>5. Backend completes via <code className="bg-background px-1 rounded text-xs">/api/pi/complete</code></p>
              <p>6. UBAP balance updated with fee deducted (0.1%)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Files Involved</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1 font-mono text-xs">
              <p>/contexts/pi-auth-context.tsx - Pi SDK initialization with payments scope</p>
              <p>/lib/pi-network-sdk.ts - Client-side payment creation</p>
              <p>/lib/ubap-wallet-config.ts - Wallet address & fee configuration</p>
              <p>/app/api/pi/approve/route.ts - Server approval endpoint</p>
              <p>/app/api/pi/complete/route.ts - Server completion endpoint</p>
              <p>/app/deposit-pi/page.tsx - UI for deposits</p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="py-6 text-center text-sm text-muted-foreground border-t">
          <p>Pi Payments fully integrated and ready for real deposits</p>
        </div>
      </div>
    </div>
  )
}
