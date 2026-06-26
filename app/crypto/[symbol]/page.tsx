"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Download, TrendingUp, TrendingDown, Info, QrCode, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const cryptoData: Record<
  string,
  {
    name: string
    symbol: string
    balance: number
    value: number
    change: number
    color: string
    address: string
    description: string
    marketCap: number
    marketCapRank: number
    supportsStaking?: boolean
    stakingAPY?: number
  }
> = {
  pi: {
    name: "Pi Coin",
    symbol: "π",
    balance: 1250.45,
    value: 392825905.55,
    change: 5.2,
    color: "bg-primary text-primary-foreground",
    address: "GABY...K3R5",
    description: "Pi Network native cryptocurrency",
    marketCap: 2500000000,
    marketCapRank: 1,
    price: 314159,
  },
  btc: {
    name: "Bitcoin",
    symbol: "BTC",
    balance: 0.0234,
    value: 1567.89,
    change: -2.1,
    color: "bg-[#F7931A] text-white",
    address: "1A1z...P2Q",
    description: "The original cryptocurrency",
    marketCap: 850000000000,
    marketCapRank: 1,
  },
  eth: {
    name: "Ethereum",
    symbol: "ETH",
    balance: 0.567,
    value: 2345.67,
    change: 4.8,
    color: "bg-[#627EEA] text-white",
    address: "0x7a2...9F3",
    description: "Smart contract platform",
    marketCap: 280000000000,
    marketCapRank: 2,
    supportsStaking: true,
    stakingAPY: 4.5,
  },
  xrp: {
    name: "XRP",
    symbol: "XRP",
    balance: 850.3,
    value: 892.42,
    change: 3.7,
    color: "bg-[#23292F] text-white",
    address: "rN7n...4R2",
    description: "Ripple payment protocol token",
    marketCap: 25000000000,
    marketCapRank: 4,
  },
  xlm: {
    name: "Stellar",
    symbol: "XLM",
    balance: 2340.0,
    value: 456.78,
    change: 1.8,
    color: "bg-[#14B6E7] text-white",
    address: "GDQP...7B9",
    description: "Stellar network native token",
    marketCap: 2800000000,
    marketCapRank: 23,
  },
  bnb: {
    name: "Binance Coin",
    symbol: "BNB",
    balance: 3.45,
    value: 1678.9,
    change: 2.3,
    color: "bg-[#F3BA2F] text-white",
    address: "bnb1...8k4",
    description: "Binance ecosystem token",
    marketCap: 45000000000,
    marketCapRank: 4,
    supportsStaking: true,
    stakingAPY: 7.2,
  },
  usdc: {
    name: "USD Coin",
    symbol: "USDC",
    balance: 5000.0,
    value: 5000.0,
    change: 0.1,
    color: "bg-[#2775CA] text-white",
    address: "0x4f5...2a8",
    description: "USD-backed stablecoin",
    marketCap: 32000000000,
    marketCapRank: 6,
  },
  usdt: {
    name: "Tether",
    symbol: "USDT",
    balance: 3200.0,
    value: 3200.0,
    change: 0.0,
    color: "bg-[#26A17B] text-white",
    address: "0x9d3...6b1",
    description: "Leading stablecoin",
    marketCap: 95000000000,
    marketCapRank: 3,
  },
  bch: {
    name: "Bitcoin Cash",
    symbol: "BCH",
    balance: 1.89,
    value: 678.45,
    change: -1.2,
    color: "bg-[#8DC351] text-white",
    address: "qr8v...3m2",
    description: "Bitcoin fork with larger blocks",
    marketCap: 7500000000,
    marketCapRank: 18,
  },
}

const chartData = {
  "1D": [
    { time: "00:00", price: 95 },
    { time: "04:00", price: 92 },
    { time: "08:00", price: 98 },
    { time: "12:00", price: 96 },
    { time: "16:00", price: 102 },
    { time: "20:00", price: 100 },
    { time: "Now", price: 105 },
  ],
  "1W": [
    { time: "Mon", price: 88 },
    { time: "Tue", price: 92 },
    { time: "Wed", price: 95 },
    { time: "Thu", price: 98 },
    { time: "Fri", price: 102 },
    { time: "Sat", price: 100 },
    { time: "Sun", price: 105 },
  ],
  "1M": [
    { time: "Week 1", price: 75 },
    { time: "Week 2", price: 82 },
    { time: "Week 3", price: 88 },
    { time: "Week 4", price: 105 },
  ],
  "1Y": [
    { time: "Jan", price: 45 },
    { time: "Mar", price: 52 },
    { time: "May", price: 68 },
    { time: "Jul", price: 75 },
    { time: "Sep", price: 88 },
    { time: "Nov", price: 105 },
  ],
}

const africanCurrencies = [
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", rate: 1500 },
  { code: "ZAR", name: "South African Rand", symbol: "R", rate: 18 },
  { code: "XOF", name: "West African CFA", symbol: "CFA", rate: 600 },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", rate: 130 },
]

export default function CryptoDetailPage({ params }: { params: { symbol: string } }) {
  const [showAddress, setShowAddress] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState<"1D" | "1W" | "1M" | "1Y">("1D")
  const [showQR, setShowQR] = useState(false)
  const crypto = cryptoData[params.symbol.toLowerCase()]

  if (!crypto) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Cryptocurrency not found</p>
      </div>
    )
  }

  // Calculate USD price per unit
  const pricePerUnit = crypto.value / crypto.balance

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="max-w-lg mx-auto">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-primary-foreground mb-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`h-16 w-16 rounded-full ${crypto.color} flex items-center justify-center font-bold text-2xl shadow-lg`}
            >
              {crypto.symbol}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{crypto.name}</h1>
              <p className="text-sm opacity-90">{crypto.description}</p>
              <Badge variant="secondary" className="mt-1 bg-primary-foreground/20 border-0">
                Rank #{crypto.marketCapRank}
              </Badge>
            </div>
          </div>
          <div className="mb-2">
            <p className="text-sm opacity-90 mb-1">Current Balance</p>
            <p className="text-4xl font-bold">
              {crypto.balance.toFixed(4)} {crypto.symbol}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-xl">${crypto.value.toFixed(2)}</p>
              <Badge
                variant="secondary"
                className={`${crypto.change > 0 ? "bg-primary-foreground/20" : "bg-destructive/20"} border-0`}
              >
                {crypto.change > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(crypto.change)}%
              </Badge>
            </div>
            <p className="text-sm opacity-75 mt-1">
              ${pricePerUnit.toFixed(2)} per {crypto.symbol}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-14 flex-col gap-1">
            <Send className="h-5 w-5" />
            Send
          </Button>
          <Button variant="outline" className="h-14 flex-col gap-1 bg-transparent">
            <Download className="h-5 w-5" />
            Receive
          </Button>
        </div>

        {crypto.supportsStaking && (
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold mb-1">Earn with Staking</p>
                  <p className="text-2xl font-bold text-primary">{crypto.stakingAPY}% APY</p>
                  <p className="text-xs text-muted-foreground mt-1">Stake {crypto.symbol} to earn rewards</p>
                </div>
                <Link href={`/staking/${params.symbol}`}>
                  <Button>Start Staking</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Price Chart</CardTitle>
              <div className="flex gap-1">
                {(["1D", "1W", "1M", "1Y"] as const).map((tf) => (
                  <Button
                    key={tf}
                    variant={selectedTimeframe === tf ? "default" : "ghost"}
                    size="sm"
                    className="h-8 px-3 text-xs"
                    onClick={() => setSelectedTimeframe(tf)}
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData[selectedTimeframe]}>
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={crypto.change > 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))"}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Market Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Market Cap</span>
              <span className="font-semibold">${(crypto.marketCap / 1000000000).toFixed(2)}B</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">24h Volume</span>
              <span className="font-semibold">${((crypto.marketCap * 0.05) / 1000000000).toFixed(2)}B</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Rank</span>
              <span className="font-semibold">#{crypto.marketCapRank}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Local Fiat Value</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {africanCurrencies.map((currency) => (
              <div key={currency.code} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm font-medium">{currency.name}</span>
                <span className="font-semibold">
                  {currency.symbol}
                  {(crypto.value * currency.rate).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Wallet Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <p className="font-mono text-sm">{showAddress ? crypto.address : "••••••••"}</p>
              <Button variant="ghost" size="sm" onClick={() => setShowAddress(!showAddress)}>
                {showAddress ? "Hide" : "Show"}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="bg-transparent" onClick={() => setShowQR(!showQR)}>
                <QrCode className="h-4 w-4 mr-2" />
                QR Code
              </Button>
              <Button variant="outline" className="bg-transparent">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            {showQR && (
              <div className="flex items-center justify-center p-6 bg-white rounded-lg">
                <div className="w-48 h-48 bg-muted flex items-center justify-center text-xs text-center">
                  QR Code for
                  <br />
                  {crypto.address}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/history">
                  View All
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { type: "Received", amount: 125.5, date: "Today, 2:30 PM", from: "Paul K." },
              { type: "Sent", amount: -45.2, date: "Yesterday, 5:15 PM", to: "Maria D." },
              { type: "Converted", amount: 200.0, date: "2 days ago", from: "XRP" },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-semibold text-sm">{tx.type}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                  {tx.from && <p className="text-xs text-muted-foreground">From: {tx.from}</p>}
                  {tx.to && <p className="text-xs text-muted-foreground">To: {tx.to}</p>}
                </div>
                <p className={`font-semibold ${tx.amount > 0 ? "text-primary" : "text-foreground"}`}>
                  {tx.amount > 0 ? "+" : ""}
                  {tx.amount.toFixed(2)} {crypto.symbol}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                <p>
                  All {crypto.name} transactions are secured on the blockchain. Transaction fees are automatically
                  calculated based on network conditions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
