'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Wallet,
  Key,
  Server,
  Lock,
  Copy,
  ExternalLink,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { BottomNav } from '@/components/bottom-nav'

export default function WalletSetupCompletePage() {
  const [copied, setCopied] = useState(false)
  const walletAddress = process.env.NEXT_PUBLIC_UBAP_WALLET_ADDRESS || 'NOT_CONFIGURED'
  const isConfigured = walletAddress !== 'NOT_CONFIGURED'

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3 flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-bold text-base">UBAP Wallet Configuration</h1>
          <p className="text-xs text-muted-foreground">Production Setup</p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-3xl mx-auto">
        {/* Status Badge */}
        <div className="flex justify-center">
          <Badge
            variant={isConfigured ? 'default' : 'destructive'}
            className="text-sm px-4 py-2"
          >
            {isConfigured ? 'Wallet Configured' : 'Wallet Not Configured'}
          </Badge>
        </div>

        {/* Configuration Status */}
        <Card
          className={`border-2 ${
            isConfigured
              ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20'
              : 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20'
          }`}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              {isConfigured ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Ready for Pi Deposits
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  Setup Required
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isConfigured ? (
              <div className="space-y-3">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  UBAP wallet is configured and ready to receive Pi deposits from pioneers.
                </p>
                <div className="bg-white dark:bg-slate-950 p-3 rounded-lg border flex items-center justify-between gap-2">
                  <code className="text-xs font-mono break-all text-slate-600 dark:text-slate-300">
                    {walletAddress}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={copyAddress}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                {copied && (
                  <p className="text-xs text-green-600 dark:text-green-400">Address copied!</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Please configure <code className="font-mono bg-white/50 px-2 py-1 rounded">NEXT_PUBLIC_UBAP_WALLET_ADDRESS</code> to enable Pi deposits.
              </p>
            )}
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">How Pi Deposits Work</CardTitle>
            <CardDescription>Complete flow from pioneer wallet to UBAP</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                n: '1',
                icon: Wallet,
                title: 'Pioneer Opens UBAP in Pi Browser',
                desc: 'Authenticated via Pi Network with payments scope',
              },
              {
                n: '2',
                icon: CheckCircle2,
                title: 'Taps "Deposit Pi" Button',
                desc: 'Enters amount and confirms transaction',
              },
              {
                n: '3',
                icon: Lock,
                title: 'Pi Wallet Opens',
                desc: 'Pioneer confirms payment with their Pi credentials',
              },
              {
                n: '4',
                icon: Server,
                title: 'Backend Processes Payment',
                desc: 'Pi sent to UBAP wallet, balance credited instantly',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.n} className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 text-sm font-bold text-blue-700 dark:text-blue-200">
                    {item.n}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Configuration Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Setup Checklist</CardTitle>
            <CardDescription>Required configuration steps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                title: 'Create App Wallet',
                desc: 'https://develop.pi → UBAP → App Wallet → Setup Wallet',
              },
              {
                title: 'Set NEXT_PUBLIC_UBAP_WALLET_ADDRESS',
                desc: 'Vercel Settings → Vars → Add your wallet address',
              },
              {
                title: 'Add PI_API_KEY (Optional)',
                desc: 'For production Mainnet: API Keys → Copy production key',
              },
              {
                title: 'Configure Backend Wallet',
                desc: 'Secure your private key in a safe location',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security Warning */}
        <Alert className="border-red-300 bg-red-50 dark:bg-red-950/20">
          <Lock className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-sm text-red-800 dark:text-red-200">
            <strong>Security:</strong> Never share your UBAP wallet private key. Store it securely. This key signs all outgoing payments from UBAP.
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/wallet-setup" className="w-full">
            <Button variant="outline" className="w-full bg-transparent">
              Setup Instructions
            </Button>
          </Link>
          <Link href="/deposit-pi" className="w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Start Deposit
            </Button>
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
