"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, TrendingDown, PieChart, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export default function PortfolioPage() {
  const [showBalances, setShowBalances] = useState(true)

  const cryptoAssets = [
    { name: "Pi Coin", symbol: "π", value: 392825905.55, allocation: 19.5, color: "#047857" },
    { name: "Bitcoin", symbol: "BTC", value: 1567.89, allocation: 8.1, color: "#F7931A" },
    { name: "Ethereum", symbol: "ETH", value: 2345.67, allocation: 12.2, color: "#627EEA" },
    { name: "XRP", symbol: "XRP", value: 892.42, allocation: 4.6, color: "#23292F" },
    { name: "Stellar", symbol: "XLM", value: 456.78, allocation: 2.4, color: "#14B6E7" },
    { name: "Binance Coin", symbol: "BNB", value: 1678.9, allocation: 8.7, color: "#F3BA2F" },
    { name: "USD Coin", symbol: "USDC", value: 5000.0, allocation: 26.0, color: "#2775CA" },
    { name: "Tether", symbol: "USDT", value: 3200.0, allocation: 16.6, color: "#26A17B" },
    { name: "Bitcoin Cash", symbol: "BCH", value: 678.45, allocation: 3.5, color: "#8DC351" },
  ]

  const stockHoldings = [
    { symbol: "TSLA", name: "Tesla Inc.", shares: 2.5, avgPrice: 220.0, currentPrice: 248.42, value: 621.05 },
    { symbol: "AAPL", name: "Apple Inc.", shares: 5.3, avgPrice: 175.0, currentPrice: 189.84, value: 1006.15 },
    { symbol: "NVDA", name: "NVIDIA Corp.", shares: 0.8, avgPrice: 750.0, currentPrice: 876.35, value: 701.08 },
    { symbol: "MSFT", name: "Microsoft Corp.", shares: 1.2, avgPrice: 400.0, currentPrice: 428.15, value: 513.78 },
  ]

  const totalCrypto = cryptoAssets.reduce((sum, asset) => sum + asset.value, 0)
  const totalStocks = stockHoldings.reduce((sum, stock) => sum + stock.value, 0)
  const totalValue = totalCrypto + totalStocks
  const initialInvestment = 15000
  const initialStockInvestment = 2500
  const profitLoss = totalValue - (initialInvestment + initialStockInvestment)
  const profitLossPercentage = ((profitLoss / (initialInvestment + initialStockInvestment)) * 100).toFixed(2)

  const pieData = [
    ...cryptoAssets.map((asset) => ({
      name: asset.name,
      value: asset.value,
      color: asset.color,
    })),
    ...stockHoldings.map((stock) => ({
      name: stock.symbol,
      value: stock.value,
      color: "#D97706",
    })),
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setShowBalances(!showBalances)}
            >
              {showBalances ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </Button>
          </div>
          <h1 className="text-2xl font-bold mb-2">Portfolio Overview</h1>
          <p className="text-sm opacity-90">Crypto & Stock Investments</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Total Portfolio Value */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
            <p className="text-4xl font-bold mb-3">
              {showBalances ? `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "••••••"}
            </p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Profit/Loss</p>
                <p className={`text-lg font-semibold ${profitLoss >= 0 ? "text-primary" : "text-destructive"}`}>
                  {profitLoss >= 0 ? "+" : ""}${profitLoss.toFixed(2)}
                </p>
              </div>
              <Badge variant={profitLoss >= 0 ? "default" : "destructive"} className="text-sm">
                {profitLoss >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {profitLossPercentage}%
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-primary-foreground/20">
              <div>
                <p className="text-xs opacity-75">Crypto</p>
                <p className="font-semibold">{showBalances ? `$${totalCrypto.toFixed(2)}` : "••••"}</p>
              </div>
              <div>
                <p className="text-xs opacity-75">Stocks</p>
                <p className="font-semibold">{showBalances ? `$${totalStocks.toFixed(2)}` : "••••"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Asset Allocation Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Asset Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPie>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value.toFixed(0)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
              </RechartsPie>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Tabs defaultValue="crypto" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
          </TabsList>

          <TabsContent value="crypto" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Crypto Holdings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cryptoAssets.map((asset) => (
                  <div key={asset.symbol} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-white shadow-md"
                        style={{ backgroundColor: asset.color }}
                      >
                        {asset.symbol}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{asset.name}</p>
                        <p className="text-xs text-muted-foreground">{asset.allocation}% of portfolio</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">
                        {showBalances
                          ? `$${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                          : "••••"}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stocks" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Stock Holdings</CardTitle>
                  <Link href="/invest">
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-primary hover:bg-primary/10">
                      Buy More
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {stockHoldings.map((stock) => {
                  const gainLoss = stock.value - stock.shares * stock.avgPrice
                  const gainLossPercent = ((gainLoss / (stock.shares * stock.avgPrice)) * 100).toFixed(2)
                  return (
                    <Link key={stock.symbol} href={`/invest/${stock.symbol}`}>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-secondary/30 flex items-center justify-center font-bold text-sm">
                            {stock.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{stock.symbol}</p>
                            <p className="text-xs text-muted-foreground">
                              {stock.shares} shares @ ${stock.avgPrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            {showBalances ? `$${stock.value.toFixed(2)}` : "••••"}
                          </p>
                          <div
                            className={`flex items-center gap-1 text-xs ${Number(gainLossPercent) >= 0 ? "text-primary" : "text-destructive"}`}
                          >
                            {Number(gainLossPercent) >= 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {gainLossPercent}%
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Investment</span>
                    <span className="font-semibold">${initialStockInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Value</span>
                    <span className="font-semibold">${totalStocks.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t">
                    <span className="font-semibold">Stock Gains</span>
                    <span
                      className={`font-bold ${totalStocks - initialStockInvestment >= 0 ? "text-primary" : "text-destructive"}`}
                    >
                      {totalStocks - initialStockInvestment >= 0 ? "+" : ""}$
                      {(totalStocks - initialStockInvestment).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Investment Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Investment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Total Invested</span>
              <span className="font-semibold">${(initialInvestment + initialStockInvestment).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Current Value</span>
              <span className="font-semibold">
                ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Total Return</span>
              <span className={`font-semibold ${profitLoss >= 0 ? "text-primary" : "text-destructive"}`}>
                {profitLoss >= 0 ? "+" : ""}${profitLoss.toFixed(2)} ({profitLossPercentage}%)
              </span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
