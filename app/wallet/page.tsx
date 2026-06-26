'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  Send,
  Plus,
  Settings,
  Copy,
  QrCode,
  ChevronRight,
  Wallet,
  TrendingUp,
  Lock,
  Bell,
  RefreshCw,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BottomNav } from '@/components/bottom-nav'
import { useTranslation } from '@/hooks/use-translation'
import { PiBalanceStore } from '@/lib/pi-balance-store'

interface Transaction {
  id: string
  type: 'send' | 'receive' | 'swap' | 'buy' | 'stake'
  asset: string
  amount: string
  amountUSD: number
  timestamp: string
  status: 'completed' | 'pending' | 'failed'
  address?: string
  description: string
}

export default function WalletPage() {
  const { t } = useTranslation()
  const [showBalance, setShowBalance] = useState(true)
  const [piBalance, setPiBalance] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // Mock wallet address (in production, this would come from Pi Network)
  const walletAddress = process.env.NEXT_PUBLIC_UBAP_WALLET_ADDRESS || '0x1234...5678'

  // Mock transactions
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'receive',
      asset: 'Pi Coin',
      amount: '100.00 π',
      amountUSD: 31415900,
      timestamp: '2 hours ago',
      status: 'completed',
      description: 'Received from Pioneer Network',
    },
    {
      id: '2',
      type: 'send',
      asset: 'Pi Coin',
      amount: '25.00 π',
      amountUSD: 7853975,
      timestamp: '5 hours ago',
      status: 'completed',
      address: '0xAbcd...1234',
      description: 'Sent to wallet',
    },
    {
      id: '3',
      type: 'swap',
      asset: 'Pi → XRP',
      amount: '50.00 π → 8500 XRP',
      amountUSD: 15707950,
      timestamp: '1 day ago',
      status: 'completed',
      description: 'Converted to XRP',
    },
    {
      id: '4',
      type: 'buy',
      asset: 'Gold',
      amount: '5.5g',
      amountUSD: 4400,
      timestamp: '2 days ago',
      status: 'completed',
      description: 'Precious metal purchase',
    },
    {
      id: '5',
      type: 'stake',
      asset: 'Pi Staking',
      amount: '30.00 π',
      amountUSD: 9424770,
      timestamp: '3 days ago',
      status: 'completed',
      description: 'Staking rewards earned',
    },
  ])

  // Mock assets
  const assets = [
    { name: 'Pi Coin', symbol: 'π', balance: piBalance, value: piBalance * 314159, change: 5.2 },
    { name: 'XRP', symbol: 'XRP', balance: 500, value: 425.5, change: 2.1 },
    { name: 'Bitcoin', symbol: 'BTC', balance: 0.025, value: 1260, change: -1.3 },
    { name: 'Gold', symbol: 'AU', balance: 5.5, value: 4400, change: 0.8, unit: 'g' },
  ]

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)

  useEffect(() => {
    // Load Pi balance
    const loadedBalance = PiBalanceStore.getBalance()
    setPiBalance(loadedBalance)
  }, [])

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate refresh
    setTimeout(() => {
      const loadedBalance = PiBalanceStore.getBalance()
      setPiBalance(loadedBalance)
      setIsLoading(false)
    }, 1500)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <ArrowUpRight className="h-4 w-4" />
      case 'receive':
        return <ArrowDownLeft className="h-4 w-4" />
      case 'swap':
        return <RefreshCw className="h-4 w-4" />
      case 'buy':
        return <Plus className="h-4 w-4" />
      case 'stake':
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Wallet className="h-4 w-4" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'send':
        return 'text-red-500'
      case 'receive':
        return 'text-green-500'
      case 'swap':
        return 'text-blue-500'
      case 'buy':
        return 'text-purple-500'
      case 'stake':
        return 'text-amber-500'
      default:
        return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3 flex items-center justify-between">
        <h1 className="font-bold text-base">App Wallet</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Link href="/wallet/settings">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-2xl mx-auto">
        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{t('totalBalance') || 'Total Balance'}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>

              <div className="space-y-2">
                <h2 className="text-4xl font-bold">
                  {showBalance
                    ? `$${totalValue.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : '••••••'}
                </h2>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-0">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2.8% today
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {showBalance ? '+$847.50' : '••••'} today
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Link href="/deposit-pi">
            <Button className="w-full h-auto py-4 flex flex-col gap-2 bg-green-600 hover:bg-green-700">
              <Plus className="h-5 w-5" />
              <span className="text-xs">Deposit</span>
            </Button>
          </Link>
          <Link href="/banks/withdraw">
            <Button className="w-full h-auto py-4 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700">
              <Send className="h-5 w-5" />
              <span className="text-xs">Send</span>
            </Button>
          </Link>
          <Link href="/smart-exchange">
            <Button className="w-full h-auto py-4 flex flex-col gap-2 bg-purple-600 hover:bg-purple-700">
              <RefreshCw className="h-5 w-5" />
              <span className="text-xs">Swap</span>
            </Button>
          </Link>
        </div>

        {/* Wallet Address */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Wallet Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-muted p-3 rounded-lg flex items-center justify-between gap-2">
              <code className="text-xs font-mono break-all text-muted-foreground">
                {walletAddress}
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={handleCopyAddress}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {copied && <p className="text-xs text-green-600 dark:text-green-400">Address copied!</p>}
            <Button variant="outline" className="w-full gap-2">
              <QrCode className="h-4 w-4" />
              Show QR Code
            </Button>
          </CardContent>
        </Card>

        {/* Assets Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Assets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {assets.map((asset, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{asset.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {asset.balance} {asset.symbol}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">${asset.value.toFixed(2)}</p>
                  <p className={`text-xs ${asset.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {asset.change >= 0 ? '+' : ''}
                    {asset.change}%
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Recent Transactions</CardTitle>
              <Link href="/history">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`h-10 w-10 rounded-full bg-muted flex items-center justify-center ${getTransactionColor(
                      tx.type,
                    )}`}
                  >
                    {getTransactionIcon(tx.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{tx.asset}</p>
                    <p className="text-xs text-muted-foreground">{tx.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="font-semibold text-sm">{tx.amount}</p>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(tx.status)}`}>
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Lock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-amber-900 dark:text-amber-100">Security Tips</p>
                <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
                  Never share your private key or seed phrase. UBAP team will never ask for them.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
