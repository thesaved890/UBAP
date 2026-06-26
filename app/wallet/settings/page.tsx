'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Copy,
  CheckCircle2,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { BottomNav } from '@/components/bottom-nav'

export default function WalletSettingsPage() {
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [biometric, setBiometric] = useState(true)

  // Mock private key (in production, never display this in plain text)
  const privateKey = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'

  const handleCopyPrivateKey = () => {
    navigator.clipboard.writeText(privateKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExportPrivateKey = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(privateKey))
    element.setAttribute('download', 'ubap-wallet-private-key.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3 flex items-center gap-3">
        <Link href="/wallet">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-bold text-base">Wallet Settings</h1>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-2xl mx-auto">
        {/* Security Alert */}
        <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <Lock className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-sm text-red-700 dark:text-red-300">
            <strong>Important:</strong> Only access these settings on a secure device. Your private key grants full control over your wallet.
          </AlertDescription>
        </Alert>

        {/* Wallet Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Wallet Information</CardTitle>
            <CardDescription>View your wallet details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Wallet Type</p>
              <p className="font-semibold text-sm">Pi Network App Wallet</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-0">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Network</p>
              <p className="font-semibold text-sm">Pi Mainnet</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Created</p>
              <p className="font-semibold text-sm">June 25, 2026</p>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Biometric Authentication */}
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-semibold text-sm">Biometric Authentication</p>
                <p className="text-xs text-muted-foreground">Face ID / Fingerprint</p>
              </div>
              <Button
                variant={biometric ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBiometric(!biometric)}
              >
                {biometric ? 'Enabled' : 'Disabled'}
              </Button>
            </div>

            {/* Transaction Confirmations */}
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-semibold text-sm">Transaction Confirmations</p>
                <p className="text-xs text-muted-foreground">Require PIN for large transactions</p>
              </div>
              <Button variant="outline" size="sm">
                Enabled
              </Button>
            </div>

            {/* Session Timeout */}
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-semibold text-sm">Session Timeout</p>
                <p className="text-xs text-muted-foreground">15 minutes</p>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>

            {/* Two-Factor Authentication */}
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-semibold text-sm">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">2FA via SMS or authenticator</p>
              </div>
              <Button variant="outline" size="sm">
                Setup
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Backup & Recovery */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Backup & Recovery</CardTitle>
            <CardDescription>Secure your wallet access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Private Key */}
            <div className="p-3 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-sm">Private Key</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                >
                  {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>

              {showPrivateKey && (
                <div className="space-y-2">
                  <div className="bg-white dark:bg-slate-950 p-2 rounded font-mono text-xs break-all border">
                    {privateKey}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1"
                      onClick={handleCopyPrivateKey}
                    >
                      <Copy className="h-3 w-3" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1"
                      onClick={handleExportPrivateKey}
                    >
                      <Download className="h-3 w-3" />
                      Export
                    </Button>
                  </div>
                  {copied && <p className="text-xs text-green-600 dark:text-green-400">Copied!</p>}
                  <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20 mt-2">
                    <AlertDescription className="text-xs text-red-700 dark:text-red-300">
                      ⚠️ Never share your private key. Anyone with this key can access your funds.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {!showPrivateKey && (
                <p className="text-xs text-muted-foreground">Click eye icon to reveal</p>
              )}
            </div>

            {/* Seed Phrase */}
            <div className="p-3 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-sm">Seed Phrase (12 words)</p>
                <Badge variant="outline">Backed Up</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Your recovery seed phrase is securely stored and backed up
              </p>
              <Button variant="outline" className="w-full gap-1" size="sm">
                <Download className="h-3 w-3" />
                Download Backup
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                label: 'Large Transactions',
                desc: 'Alert for transactions over $1,000',
              },
              {
                label: 'Price Alerts',
                desc: 'Notify when assets reach target price',
              },
              {
                label: 'Security Events',
                desc: 'Login attempts and suspicious activity',
              },
              {
                label: 'Staking Rewards',
                desc: 'Notification when rewards are earned',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Button
                  variant={notifications ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNotifications(!notifications)}
                >
                  {notifications ? 'On' : 'Off'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="text-base text-red-600 dark:text-red-400">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30">
              <Trash2 className="h-4 w-4" />
              Remove Wallet from Device
            </Button>
            <p className="text-xs text-muted-foreground">
              You can import this wallet on another device using your seed phrase
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
