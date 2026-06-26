"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Star, TrendingUp, TrendingDown, Info } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function InvestPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [watchlist, setWatchlist] = useState<string[]>(["TSLA", "AAPL", "NVDA"])

  const featuredStocks = [
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 248.42,
      change: 3.2,
      high52: 299.29,
      low52: 138.8,
      marketCap: "788.2B",
      pe: 76.45,
      dividend: null,
    },
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 189.84,
      change: -1.5,
      high52: 199.62,
      low52: 164.08,
      marketCap: "2.95T",
      pe: 31.23,
      dividend: 0.48,
    },
    {
      symbol: "NFLX",
      name: "Netflix Inc.",
      price: 587.32,
      change: 5.8,
      high52: 623.75,
      low52: 344.73,
      marketCap: "251.8B",
      pe: 42.18,
      dividend: null,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 428.15,
      change: 2.1,
      high52: 468.35,
      low52: 362.9,
      marketCap: "3.18T",
      pe: 35.67,
      dividend: 0.72,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 178.25,
      change: 1.9,
      high52: 201.2,
      low52: 118.35,
      marketCap: "1.86T",
      pe: 54.32,
      dividend: null,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 163.42,
      change: -0.8,
      high52: 175.58,
      low52: 121.46,
      marketCap: "2.05T",
      pe: 26.89,
      dividend: null,
    },
    {
      symbol: "META",
      name: "Meta Platforms",
      price: 512.78,
      change: 4.3,
      high52: 542.81,
      low52: 279.43,
      marketCap: "1.31T",
      pe: 28.54,
      dividend: 0.5,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      price: 876.35,
      change: 6.7,
      high52: 974.12,
      low52: 405.25,
      marketCap: "2.16T",
      pe: 68.92,
      dividend: 0.16,
    },
    {
      symbol: "KO",
      name: "Coca-Cola Co.",
      price: 62.84,
      change: 0.5,
      high52: 65.77,
      low52: 55.72,
      marketCap: "271.3B",
      pe: 24.56,
      dividend: 3.12,
    },
    {
      symbol: "JPM",
      name: "JPMorgan Chase",
      price: 198.45,
      change: -0.3,
      high52: 215.27,
      low52: 135.19,
      marketCap: "571.8B",
      pe: 11.23,
      dividend: 2.87,
    },
    {
      symbol: "V",
      name: "Visa Inc.",
      price: 278.92,
      change: 1.6,
      high52: 290.68,
      low52: 226.43,
      marketCap: "574.2B",
      pe: 31.45,
      dividend: 0.89,
    },
    {
      symbol: "JNJ",
      name: "Johnson & Johnson",
      price: 156.78,
      change: -0.4,
      high52: 168.85,
      low52: 143.13,
      marketCap: "381.6B",
      pe: 18.92,
      dividend: 2.91,
    },
    {
      symbol: "PG",
      name: "Procter & Gamble",
      price: 168.34,
      change: 0.8,
      high52: 176.23,
      low52: 144.31,
      marketCap: "397.5B",
      pe: 26.78,
      dividend: 2.65,
    },
    {
      symbol: "DIS",
      name: "Walt Disney Co.",
      price: 112.56,
      change: 2.4,
      high52: 123.74,
      low52: 78.73,
      marketCap: "205.3B",
      pe: 42.31,
      dividend: null,
    },
    {
      symbol: "NKE",
      name: "Nike Inc.",
      price: 98.75,
      change: -1.2,
      high52: 129.44,
      low52: 82.22,
      marketCap: "152.7B",
      pe: 28.67,
      dividend: 1.45,
    },
  ]

  const filteredStocks =
    searchQuery.length > 0
      ? featuredStocks.filter(
          (stock) =>
            stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : featuredStocks

  const toggleWatchlist = (symbol: string) => {
    setWatchlist((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Invest in Stocks</h1>
              <p className="text-xs opacity-90">Fractional shares • 5000+ stocks</p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search stocks (TSLA, AAPL, etc.)"
              className="pl-10 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {watchlist.length > 0 && searchQuery.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-accent fill-accent" />
                Your Watchlist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {featuredStocks
                .filter((stock) => watchlist.includes(stock.symbol))
                .map((stock) => (
                  <Link key={stock.symbol} href={`/invest/${stock.symbol}`}>
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm">
                          {stock.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{stock.symbol}</p>
                          <p className="text-xs text-muted-foreground">{stock.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">${stock.price.toFixed(2)}</p>
                        <div
                          className={`flex items-center gap-1 text-xs ${stock.change > 0 ? "text-primary" : "text-destructive"}`}
                        >
                          {stock.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {Math.abs(stock.change)}%
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {searchQuery ? `Search Results (${filteredStocks.length})` : "Featured Stocks"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredStocks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No stocks found matching "{searchQuery}"</p>
                <p className="text-xs mt-1">Try searching by symbol or company name</p>
              </div>
            ) : (
              filteredStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all"
                >
                  <Link href={`/invest/${stock.symbol}`} className="flex items-center gap-3 flex-1">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm">
                      {stock.symbol.slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">{stock.symbol}</p>
                        {stock.dividend && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0">
                            {stock.dividend}%
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{stock.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Cap: {stock.marketCap}</p>
                    </div>
                  </Link>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold text-sm">${stock.price.toFixed(2)}</p>
                      <div
                        className={`flex items-center gap-1 text-xs ${stock.change > 0 ? "text-primary" : "text-destructive"}`}
                      >
                        {stock.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {Math.abs(stock.change)}%
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleWatchlist(stock.symbol)
                      }}
                    >
                      <Star
                        className={`h-4 w-4 ${watchlist.includes(stock.symbol) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                      />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
              <div>
                <p className="font-semibold text-sm mb-1">Investment Options</p>
                <p className="text-xs text-muted-foreground">
                  Invest using crypto, fiat, or precious metals. All conversions happen instantly with market rates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
