"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Eye,
  EyeOff,
  TrendingUp,
  Settings,
  ArrowDownRight,
  CreditCard,
  Shield,
  Users,
  DollarSign,
  Zap,
  TrendingDown,
  Sparkles,
  ArrowRight,
  Globe,
  Bell,
  Sun,
  Moon,
  ChevronRight,
  PiggyBank,
  Wallet,
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { BalanceCardSkeleton } from "@/components/loading-skeleton"
import { UBAPBackground } from "@/components/ubap-background"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/hooks/use-translation"
import { PiBalanceStore } from "@/lib/pi-balance-store"

export default function HomePage() {
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguage()
  const [showBalances, setShowBalances] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(3)
  const [piBalance, setPiBalance] = useState(0) // Declare setPiBalance

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "sw", name: "Kiswahili", flag: "🇹🇿" },
    { code: "am", name: "አማርኛ", flag: "🇪🇹" },
    { code: "ha", name: "Hausa", flag: "🇳🇬" },
    { code: "zu", name: "isiZulu", flag: "🇿🇦" },
    { code: "yo", name: "Yorùbá", flag: "🇳🇬" },
    { code: "ig", name: "Igbo", flag: "🇳🇬" },
  ]

  useEffect(() => {
    // Check for dark mode
    const darkMode = localStorage.getItem("ubap_dark_mode")
    setIsDarkMode(darkMode === "true")
    if (darkMode === "true") {
      document.documentElement.classList.add("dark")
    }

    // Load Pi balance
    const loadedBalance = PiBalanceStore.getBalance()
    setPiBalance(loadedBalance)

    // Simulate loading
    setTimeout(() => setIsLoading(false), 800)

    // Refresh balance every 2 seconds to catch updates
    const interval = setInterval(() => {
      const currentBalance = PiBalanceStore.getBalance()
      setPiBalance(currentBalance)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem("ubap_dark_mode", String(newMode))
    if (newMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const cryptoAssets = [
    {
      name: "Pi Coin",
      symbol: "π",
      balance: piBalance,
      value: piBalance * 314159,
      change: 5.2,
      color: "bg-primary",
      slug: "pi",
      marketCap: 1,
      price: 314159,
    },
  ]

  const preciousMetals = [
    { name: "Gold", symbol: "AU", grams: 15.5, value: 12450.0, color: "bg-secondary", change: 1.2 },
    { name: "Diamond", symbol: "💎", carats: 2.3, value: 8900.0, color: "bg-accent/30", change: 0.5 },
    { name: "Silver", symbol: "AG", grams: 245.0, value: 6780.0, color: "bg-muted-foreground/20", change: -0.8 },
    { name: "Platinum", symbol: "PT", grams: 8.2, value: 4890.0, color: "bg-[#E5E4E2]", change: 0.3 },
    { name: "Palladium", symbol: "PD", grams: 3.5, value: 3675.0, color: "bg-[#CED0DD]", change: 1.9 },
  ]

  const fiatBalances = [
    { name: "Nigerian Naira", code: "NGN", balance: 450000, symbol: "₦", flag: "🇳🇬", usdValue: 300 },
    { name: "South African Rand", code: "ZAR", balance: 12500, symbol: "R", flag: "🇿🇦", usdValue: 694.44 },
    { name: "West African CFA", code: "XOF", balance: 85000, symbol: "CFA", flag: "🌍", usdValue: 141.67 },
    { name: "Kenyan Shilling", code: "KES", balance: 68000, symbol: "KSh", flag: "🇰🇪", usdValue: 523.08 },
  ]

  const stocksPortfolio = [
    { symbol: "TSLA", name: "Tesla", shares: 2.5, value: 1875.0, change: 3.2 },
    { symbol: "AAPL", name: "Apple", shares: 5.0, value: 3450.0, change: 1.8 },
    { symbol: "NVDA", name: "NVIDIA", shares: 1.2, value: 2890.0, change: 5.5 },
  ]

  const totalCrypto = cryptoAssets.reduce((sum, asset) => sum + asset.value, 0)
  const totalMetals = preciousMetals.reduce((sum, metal) => sum + metal.value, 0)
  const totalFiat = fiatBalances.reduce((sum, fiat) => sum + fiat.usdValue, 0)
  const totalStocks = stocksPortfolio.reduce((sum, stock) => sum + stock.value, 0)
  const totalValue = totalCrypto + totalMetals + totalFiat + totalStocks

  const todayGainAmount = 1247.89
  const todayGainPercent = 2.8

  const allAssets = [
    ...cryptoAssets.map((a) => ({ name: a.name, change: a.change, type: "Crypto" })),
    ...preciousMetals.map((m) => ({ name: m.name, change: m.change, type: "Materials" })),
    ...stocksPortfolio.map((s) => ({ name: s.name, change: s.change, type: "Stocks" })),
  ]
  const bestPerformer = allAssets.reduce((max, asset) => (asset.change > max.change ? asset : max))
  const worstPerformer = allAssets.reduce((min, asset) => (asset.change < min.change ? asset : min))

  const recentActivity = [
    { type: "buy", asset: "AAPL", amount: "$500", time: "2 min ago", category: "Stocks" },
    { type: "send", asset: "BTC", amount: "0.005 BTC", time: "15 min ago", category: "Crypto" },
    { type: "convert", asset: "Pi → NGN", amount: "100 π", time: "1 hour ago", category: "Conversion" },
    { type: "deposit", asset: "Standard Bank", amount: "R5,000", time: "2 hours ago", category: "Bank" },
    { type: "buy", asset: "Gold", amount: "2.5g", time: "3 hours ago", category: "Materials" },
    { type: "stake", asset: "ETH", amount: "0.5 ETH", time: "5 hours ago", category: "Staking" },
    { type: "receive", asset: "XRP", amount: "200 XRP", time: "8 hours ago", category: "Crypto" },
  ]

  const priceAlerts = [
    { asset: "Pi Coin", message: "Reached target price of $314,159", time: "10 min ago" },
    { asset: "Gold", message: "Price dropped below $80/gram", time: "1 hour ago" },
  ]

  const marketNews = [
    { title: "Bitcoin ETF approval boosts market confidence", source: "CryptoNews", time: "1h ago" },
    { title: "African central banks explore CBDC adoption", source: "FinanceAfrica", time: "3h ago" },
    { title: "Gold prices surge amid global uncertainty", source: "Bloomberg", time: "5h ago" },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground p-4 pb-8">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold tracking-tight">UBAP</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-primary-foreground">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <BalanceCardSkeleton />
          </div>
        </header>
        <main className="max-w-lg mx-auto px-4 py-6 space-y-6 pb-24">
          <div className="grid grid-cols-3 gap-3">
            <BalanceCardSkeleton />
            <BalanceCardSkeleton />
            <BalanceCardSkeleton />
          </div>
          <BalanceCardSkeleton />
          <BalanceCardSkeleton />
          <BalanceCardSkeleton />
        </main>
      </div>
    )
  }

  return (
    <>
      <UBAPBackground />
      <div className="min-h-screen relative z-10">
        <header className="bg-primary text-primary-foreground p-4 pb-8 relative z-20">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold tracking-tight">UBAP</h1>
              </div>
              <div className="flex items-center gap-2">
                <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                  <SelectTrigger className="w-auto gap-2 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 h-9">
                    <Globe className="h-4 w-4" />
                    <SelectValue>
                      {languages.find((l) => l.code === language)?.flag} {languages.find((l) => l.code === language)?.name}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={toggleDarkMode}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Link href="/notifications">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary-foreground hover:bg-primary-foreground/20 relative"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 rounded-full bg-red-600 text-white text-xs flex items-center justify-center border-2 border-primary">
                        {unreadNotifications}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>
            </div>


            <Card className="bg-primary-foreground/10 border-primary-foreground/30 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm opacity-90">{t("totalBalance")}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                    onClick={() => setShowBalances(!showBalances)}
                    aria-label={showBalances ? "Hide balances" : "Show balances"}
                  >
                    {showBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-4xl font-bold mb-2">
                  {showBalances
                    ? `$${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : "••••••"}
                </p>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-500/20 text-primary-foreground border-0 hover:bg-emerald-500/30"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />+{todayGainPercent}%
                  </Badge>
                  <span className="text-xs opacity-75">
                    {showBalances ? `+$${todayGainAmount.toFixed(2)}` : "••••"} today
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 py-6 space-y-6 pb-24">
          {/* Quick Actions - Simplified */}
          <div className="grid grid-cols-3 gap-3">
            {/* Deposit Pi */}
            <Link href="/deposit-pi" title="Deposit Pi from your Pi Wallet">
              <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-2 border-amber-300 dark:border-amber-700 hover:scale-105 transition-transform cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="h-12 w-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                    <ArrowDownRight className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-bold text-sm text-amber-900 dark:text-amber-100">Deposit</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">Add Pi</p>
                </CardContent>
              </Card>
            </Link>

            {/* Virtual Card */}
            <Link href="/cards">
              <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-2 border-purple-300 dark:border-purple-700 hover:scale-105 transition-transform cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="h-12 w-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-bold text-sm text-purple-900 dark:text-purple-100">Cards</p>
                  <p className="text-xs text-purple-700 dark:text-purple-300">Pay</p>
                </CardContent>
              </Card>
            </Link>

            {/* Escrow */}
            <Link href="/escrow">
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-2 border-emerald-300 dark:border-emerald-700 hover:scale-105 transition-transform cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="h-12 w-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-bold text-sm text-emerald-900 dark:text-emerald-100">Escrow</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">Safe Pay</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Pi DEX Smart Exchange Banner */}
          <Link href="/smart-exchange">
            <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 border-0 hover:scale-[1.02] transition-transform cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-white">Smart Exchange</h3>
                      <Badge className="bg-amber-500 text-white text-xs">Pi DEX</Badge>
                    </div>
                    <p className="text-xs text-white/90">
                      Meilleur taux automatique • Économisez jusqu'à 5%
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Pi Payments Setup & Info */}
          <Link href="/pi-payments-setup">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-300 dark:border-blue-700 hover:scale-[1.02] transition-transform cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <Wallet className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-blue-900 dark:text-blue-100">Pi Payments</h3>
                      <Badge className="bg-blue-600 text-white text-xs">Real Pi</Badge>
                    </div>
                    <p className="text-xs text-blue-800 dark:text-blue-300">
                      Deposit Pi from your wallet • Setup & guide
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <p className="text-xs font-medium text-emerald-900 dark:text-emerald-100">{t("bestPerformer").split(' ')[0]}</p>
                </div>
                <p className="text-sm font-bold text-emerald-900 dark:text-emerald-100">{bestPerformer.name}</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">+{bestPerformer.change}%</p>
              </CardContent>
            </Card>

            <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <p className="text-xs font-medium text-red-900 dark:text-red-100">{t("worstPerformer").split(' ')[0]}</p>
                </div>
                <p className="text-sm font-bold text-red-900 dark:text-red-100">{worstPerformer.name}</p>
                <p className="text-xs text-red-700 dark:text-red-300">{worstPerformer.change}%</p>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <p className="text-xs font-medium text-amber-900 dark:text-amber-100">Pending</p>
                </div>
                <p className="text-sm font-bold text-amber-900 dark:text-amber-100">3 Txns</p>
                <p className="text-xs text-amber-700 dark:text-amber-300">Processing</p>
              </CardContent>
            </Card>
          </div>

          <Card className="animate-fade-in" style={{ animationDelay: "150ms" }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{t("markets")}</CardTitle>
                <Link href="/portfolio">
                  <Button variant="ghost" size="sm" className="h-8 px-3 text-primary hover:bg-primary/10">
                    {t("viewAll")}
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {cryptoAssets.slice(0, 4).map((crypto) => (
                <Link key={crypto.symbol} href={`/crypto/${crypto.slug}`}>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full ${crypto.color} flex items-center justify-center`}>
                        <span className="text-white font-bold text-sm">{crypto.symbol[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{crypto.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {showBalances ? `${crypto.balance.toFixed(4)} ${crypto.symbol}` : "••••"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">
                        {showBalances ? `$${crypto.value.toFixed(2)}` : "••••"}
                      </p>
                      <p
                        className={`text-xs ${crypto.change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                      >
                        {crypto.change >= 0 ? "+" : ""}
                        {crypto.change}%
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "175ms" }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{t("preciousMaterials")}</CardTitle>
                <Link href="/materials">
                  <Button variant="ghost" size="sm" className="h-8 px-3 text-primary hover:bg-primary/10">
                    {t("trade")}
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {preciousMetals.slice(0, 3).map((metal) => (
                <div
                  key={metal.symbol}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full ${metal.color} flex items-center justify-center`}>
                      <span className="text-sm font-bold">{metal.symbol}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{metal.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {showBalances ? `${metal.grams || metal.carats} ${metal.grams ? "g" : "ct"}` : "••••"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{showBalances ? `$${metal.value.toFixed(2)}` : "••••"}</p>
                    <p
                      className={`text-xs ${metal.change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {metal.change >= 0 ? "+" : ""}
                      {metal.change}%
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{t("fiatBalances")}</CardTitle>
                <Link href="/banks">
                  <Button variant="ghost" size="sm" className="h-8 px-3 text-primary hover:bg-primary/10">
                    {t("banks")}
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {fiatBalances.map((fiat) => (
                <div
                  key={fiat.code}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg">
                      {fiat.flag}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{fiat.code}</p>
                      <p className="text-xs text-muted-foreground">{fiat.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">
                      {showBalances ? `${fiat.symbol}${fiat.balance.toLocaleString()}` : "••••"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {showBalances ? `≈ $${fiat.usdValue.toFixed(2)}` : "••••"}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "225ms" }}>
            <CardHeader>
              <CardTitle className="text-lg">Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="20"
                        strokeDasharray={`${(totalCrypto / totalValue) * 251.2} 251.2`}
                        className="transition-all duration-500"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--chart-4))"
                        strokeWidth="20"
                        strokeDasharray={`${(totalStocks / totalValue) * 251.2} 251.2`}
                        strokeDashoffset={`-${(totalCrypto / totalValue) * 251.2}`}
                        className="transition-all duration-500"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--secondary))"
                        strokeWidth="20"
                        strokeDasharray={`${(totalMetals / totalValue) * 251.2} 251.2`}
                        strokeDashoffset={`-${((totalCrypto + totalStocks) / totalValue) * 251.2}`}
                        className="transition-all duration-500"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="20"
                        strokeDasharray={`${(totalFiat / totalValue) * 251.2} 251.2`}
                        strokeDashoffset={`-${((totalCrypto + totalStocks + totalMetals) / totalValue) * 251.2}`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold">100%</p>
                        <p className="text-xs text-muted-foreground">Allocated</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">Crypto</p>
                      <p className="text-xs text-muted-foreground">
                        {showBalances ? `$${totalCrypto.toFixed(0)}` : "••••"} (
                        {((totalCrypto / totalValue) * 100).toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-chart-4" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">Stocks</p>
                      <p className="text-xs text-muted-foreground">
                        {showBalances ? `$${totalStocks.toFixed(0)}` : "••••"} (
                        {((totalStocks / totalValue) * 100).toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">Materials</p>
                      <p className="text-xs text-muted-foreground">
                        {showBalances ? `$${totalMetals.toFixed(0)}` : "••••"} (
                        {((totalMetals / totalValue) * 100).toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-muted" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">Cash</p>
                      <p className="text-xs text-muted-foreground">
                        {showBalances ? `$${totalFiat.toFixed(0)}` : "••••"} (
                        {((totalFiat / totalValue) * 100).toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{t("recentActivity")}</CardTitle>
                <Link href="/history">
                  <Button variant="ghost" size="sm" className="h-8 px-3 text-primary hover:bg-primary/10">
                    {t("viewAll")}
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.slice(0, 5).map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        activity.type === "buy"
                          ? "bg-emerald-100 dark:bg-emerald-950"
                          : activity.type === "send"
                            ? "bg-blue-100 dark:bg-blue-950"
                            : activity.type === "convert"
                              ? "bg-amber-100 dark:bg-amber-950"
                              : "bg-purple-100 dark:bg-purple-950"
                      }`}
                    >
                      {activity.type === "buy" && <ArrowDownRight className="h-5 w-5 text-emerald-600" />}
                      {activity.type === "send" && <ArrowDownRight className="h-5 w-5 text-blue-600" />}
                      {activity.type === "convert" && <ArrowDownRight className="h-5 w-5 text-amber-600" />}
                      {(activity.type === "deposit" || activity.type === "stake" || activity.type === "receive") && (
                        <ArrowDownRight className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold capitalize">{activity.type}</p>
                      <p className="text-xs text-muted-foreground">{activity.asset}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{activity.amount}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {priceAlerts.length > 0 && (
            <Card className="bg-accent/10 border-accent/30 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-accent" />
                  <p className="text-lg">Price Alerts</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {priceAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 flex-shrink-0 mt-0.5 text-accent" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{alert.asset}</p>
                      <p className="text-xs text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card className="animate-fade-in" style={{ animationDelay: "500ms" }}>
            <CardHeader>
              <CardTitle className="text-lg">{t("marketNews")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {marketNews.map((news, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all cursor-pointer"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold leading-snug">{news.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">{news.source}</p>
                      <span className="text-xs text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">{news.time}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "250ms" }}>
            <CardHeader>
              <CardTitle className="text-lg">{t("quickActions")}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Link href="/community">
                <Button variant="outline" className="w-full h-auto flex-col py-4 gap-2 bg-transparent">
                  <Shield className="h-6 w-6 text-primary" />
                  <div className="text-center">
                    <p className="font-semibold text-sm">{t("community")}</p>
                    <p className="text-xs text-muted-foreground">Referrals & Social</p>
                  </div>
                </Button>
              </Link>
              <Link href="/learn">
                <Button variant="outline" className="w-full h-auto flex-col py-4 gap-2 bg-transparent">
                  <CreditCard className="h-6 w-6 text-secondary" />
                  <div className="text-center">
                    <p className="font-semibold text-sm">{t("learn")}</p>
                    <p className="text-xs text-muted-foreground">Complete courses</p>
                  </div>
                </Button>
              </Link>
              <Link href="/recommendations">
                <Button variant="outline" className="w-full h-auto flex-col py-4 gap-2 bg-transparent">
                  <Globe className="h-6 w-6 text-violet-600" />
                  <div className="text-center">
                    <p className="font-semibold text-sm">{t("recommendations")}</p>
                    <p className="text-xs text-muted-foreground">Get recommendations</p>
                  </div>
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" className="w-full h-auto flex-col py-4 gap-2 bg-transparent">
                  <Moon className="h-6 w-6 text-amber-600" />
                  <div className="text-center">
                    <p className="font-semibold text-sm">{t("portfolio")}</p>
                    <p className="text-xs text-muted-foreground">View allocation</p>
                  </div>
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "700ms" }}>
            <Link href="/smart-savings">
              <Card className="hover:bg-muted/50 transition-all cursor-pointer hover:scale-[1.02]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                      <PiggyBank className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <p className="text-sm font-semibold">Smart Savings</p>
                  <p className="text-xs text-muted-foreground mt-1">Épargnez intelligemment</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tontine">
              <Card className="hover:bg-muted/50 transition-all cursor-pointer hover:scale-[1.02] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100">Pi Tontine</p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">Epargne rotative</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}
