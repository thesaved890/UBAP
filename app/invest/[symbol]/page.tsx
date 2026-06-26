"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, TrendingDown, Star, Info } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const stocksData = {
  TSLA: {
    name: "Tesla Inc.",
    price: 248.42,
    change: 3.2,
    high52: 299.29,
    low52: 138.8,
    marketCap: "788.2B",
    pe: "76.45",
    dividend: null,
    description:
      "Electric vehicles and clean energy company leading the transition to sustainable transportation with innovative electric vehicles, energy storage, and solar products.",
    sector: "Consumer Cyclical",
  },
  AAPL: {
    name: "Apple Inc.",
    price: 189.84,
    change: -1.5,
    high52: 199.62,
    low52: 164.08,
    marketCap: "2.95T",
    pe: "31.23",
    dividend: 0.48,
    description:
      "Technology hardware and consumer electronics company designing, manufacturing, and marketing smartphones, personal computers, tablets, wearables, and accessories worldwide.",
    sector: "Technology",
  },
  NFLX: {
    name: "Netflix Inc.",
    price: 587.32,
    change: 5.8,
    high52: 623.75,
    low52: 344.73,
    marketCap: "251.8B",
    pe: "42.18",
    dividend: null,
    description:
      "Streaming entertainment service with over 260 million paid memberships in over 190 countries enjoying TV series, films, and games across a wide variety of genres and languages.",
    sector: "Communication Services",
  },
  MSFT: {
    name: "Microsoft Corporation",
    price: 415.26,
    change: 2.1,
    high52: 430.82,
    low52: 309.45,
    marketCap: "3.09T",
    pe: "37.89",
    dividend: 0.72,
    description:
      "Technology company developing, licensing, and supporting software, services, devices, and solutions worldwide, including cloud computing, productivity software, and gaming.",
    sector: "Technology",
  },
  NVDA: {
    name: "NVIDIA Corporation",
    price: 875.28,
    change: 4.5,
    high52: 974.00,
    low52: 390.48,
    marketCap: "2.16T",
    pe: "71.32",
    dividend: 0.04,
    description:
      "Semiconductor company designing and manufacturing graphics processing units and system on chip units for gaming, professional visualization, data center, and automotive markets.",
    sector: "Technology",
  },
  AMZN: {
    name: "Amazon.com Inc.",
    price: 178.35,
    change: 1.8,
    high52: 188.65,
    low52: 118.35,
    marketCap: "1.85T",
    pe: "53.42",
    dividend: null,
    description:
      "E-commerce and cloud computing company offering online retail, cloud infrastructure, digital streaming, and artificial intelligence services globally.",
    sector: "Consumer Cyclical",
  },
  GOOGL: {
    name: "Alphabet Inc.",
    price: 142.65,
    change: -0.8,
    high52: 153.78,
    low52: 102.21,
    marketCap: "1.79T",
    pe: "25.87",
    dividend: null,
    description:
      "Technology company providing internet search, online advertising, cloud computing, software, and hardware products through Google and other subsidiaries.",
    sector: "Communication Services",
  },
  META: {
    name: "Meta Platforms Inc.",
    price: 512.42,
    change: 3.4,
    high52: 542.81,
    low52: 279.43,
    marketCap: "1.31T",
    pe: "28.94",
    dividend: null,
    description:
      "Social technology company building platforms for people to connect, find communities, and grow businesses through Facebook, Instagram, WhatsApp, and other products.",
    sector: "Communication Services",
  },
  KO: {
    name: "The Coca-Cola Company",
    price: 62.48,
    change: 0.5,
    high52: 64.99,
    low52: 55.28,
    marketCap: "270.1B",
    pe: "26.15",
    dividend: 1.84,
    description:
      "Beverage company manufacturing and distributing various nonalcoholic beverages worldwide, including sparkling soft drinks, water, sports drinks, and juice.",
    sector: "Consumer Defensive",
  },
  JPM: {
    name: "JPMorgan Chase & Co.",
    price: 198.75,
    change: -0.3,
    high52: 210.49,
    low52: 143.27,
    marketCap: "574.6B",
    pe: "11.23",
    dividend: 4.00,
    description:
      "Financial services firm offering investment banking, financial services for consumers and businesses, commercial banking, and asset management.",
    sector: "Financial Services",
  },
  V: {
    name: "Visa Inc.",
    price: 275.83,
    change: 1.2,
    high52: 290.96,
    low52: 227.81,
    marketCap: "571.2B",
    pe: "31.45",
    dividend: 0.45,
    description:
      "Payments technology company operating a global retail electronic payments network facilitating digital payments between consumers, merchants, and financial institutions.",
    sector: "Financial Services",
  },
  JNJ: {
    name: "Johnson & Johnson",
    price: 157.32,
    change: -0.5,
    high52: 168.85,
    low52: 143.13,
    marketCap: "380.5B",
    pe: "23.67",
    dividend: 1.19,
    description:
      "Healthcare company developing medical devices, pharmaceuticals, and consumer health products for disease prevention, diagnosis, and treatment worldwide.",
    sector: "Healthcare",
  },
  PG: {
    name: "Procter & Gamble Co.",
    price: 165.28,
    change: 0.7,
    high52: 171.36,
    low52: 144.39,
    marketCap: "392.8B",
    pe: "27.89",
    dividend: 0.94,
    description:
      "Consumer goods company providing branded consumer packaged goods including beauty, grooming, health care, fabric care, and home care products.",
    sector: "Consumer Defensive",
  },
  DIS: {
    name: "The Walt Disney Company",
    price: 113.45,
    change: 2.3,
    high52: 123.74,
    low52: 78.73,
    marketCap: "207.2B",
    pe: "40.12",
    dividend: null,
    description:
      "Entertainment company operating theme parks, producing films and television programs, and providing streaming services through Disney+, Hulu, and ESPN+.",
    sector: "Communication Services",
  },
  NKE: {
    name: "NIKE Inc.",
    price: 75.68,
    change: -1.2,
    high52: 123.39,
    low52: 70.75,
    marketCap: "115.4B",
    pe: "22.45",
    dividend: 0.37,
    description:
      "Footwear and athletic apparel company designing, developing, and selling athletic footwear, apparel, equipment, and accessories worldwide.",
    sector: "Consumer Cyclical",
  },
}

export default function StockDetailPage({ params }: { params: { symbol: string } }) {
  const symbol = params.symbol
  const [selectedPeriod, setSelectedPeriod] = useState("1D")
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isWatchlisted, setIsWatchlisted] = useState(false)

  const stock = stocksData[symbol.toUpperCase() as keyof typeof stocksData] || stocksData.AAPL

  const chartData = [
    { time: "9:30AM", price: stock.price * 0.985 },
    { time: "10:00AM", price: stock.price * 0.99 },
    { time: "11:00AM", price: stock.price * 0.995 },
    { time: "12:00PM", price: stock.price * 1.002 },
    { time: "1:00PM", price: stock.price * 1.008 },
    { time: "2:00PM", price: stock.price * 1.012 },
    { time: "3:00PM", price: stock.price * 1.015 },
    { time: "4:00PM", price: stock.price },
  ]

  const maxPrice = Math.max(...chartData.map((d) => d.price))
  const minPrice = Math.min(...chartData.map((d) => d.price))
  const priceRange = maxPrice - minPrice

  const changeAmount = (stock.price * stock.change) / 100
  const openPrice = stock.price - changeAmount * 0.8
  const highPrice = stock.price * 1.015
  const lowPrice = stock.price * 0.985

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/invest">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">{symbol.toUpperCase()}</h1>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsWatchlisted(!isWatchlisted)}
              aria-label={isWatchlisted ? "Remove from watchlist" : "Add to watchlist"}
            >
              <Star className={`h-5 w-5 ${isWatchlisted ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              aria-label="More options"
            >
              <Info className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* Stock Card */}
        <Card className="bg-white">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{symbol[0].toUpperCase()}</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{stock.name}</h2>
                  <p className="text-sm text-gray-500">{symbol.toUpperCase()} • NASDAQ</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">${stock.price.toFixed(2)}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  {stock.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <p className={`text-sm font-medium ${stock.change > 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {stock.change > 0 ? "+" : ""}${changeAmount.toFixed(2)} ({stock.change > 0 ? "+" : ""}
                    {stock.change.toFixed(2)}%)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart Card */}
        <Card className="bg-white">
          <CardContent className="pt-6 pb-4">
            <div className="h-48 relative mb-4">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`stockGradient-${symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0 ${100 - ((chartData[0].price - minPrice) / priceRange) * 80} ${chartData
                    .map(
                      (d, i) =>
                        `L ${(i * 100) / (chartData.length - 1)} ${100 - ((d.price - minPrice) / priceRange) * 80}`
                    )
                    .join(" ")} L 100 100 L 0 100 Z`}
                  fill={`url(#stockGradient-${symbol})`}
                />
                <path
                  d={`M 0 ${100 - ((chartData[0].price - minPrice) / priceRange) * 80} ${chartData
                    .map(
                      (d, i) =>
                        `L ${(i * 100) / (chartData.length - 1)} ${100 - ((d.price - minPrice) / priceRange) * 80}`
                    )
                    .join(" ")}`}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>9:30AM</span>
                <span>12PM</span>
                <span>4PM</span>
              </div>
            </div>

            <div className="flex gap-2 border-t pt-4">
              {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedPeriod === period
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  type="button"
                >
                  {period}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="bg-white">
          <CardContent className="pt-6 pb-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Open</p>
                <p className="text-base font-bold text-gray-900">${openPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">High</p>
                <p className="text-base font-bold text-gray-900">${highPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Low</p>
                <p className="text-base font-bold text-gray-900">${lowPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Mkt Cap</p>
                <p className="text-base font-bold text-gray-900">{stock.marketCap}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">P/E Ratio</p>
                <p className="text-base font-bold text-gray-900">{stock.pe}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">52W High</p>
                <p className="text-base font-bold text-gray-900">${stock.high52.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Card */}
        <Card className="bg-white">
          <CardContent className="pt-6 pb-6">
            <h3 className="text-base font-bold text-gray-900 mb-3">About {stock.name}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {showFullDescription ? stock.description : `${stock.description.substring(0, 150)}...`}
            </p>
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-sm text-primary font-medium mt-2 hover:underline"
              type="button"
            >
              {showFullDescription ? "Show less" : "Read more"}
            </button>
          </CardContent>
        </Card>

        {/* My Investment Card - Only show for AAPL as demo */}
        {symbol.toUpperCase() === "AAPL" && (
          <Card className="bg-white border-l-4 border-l-primary shadow-md">
            <CardContent className="pt-6 pb-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">My Investment</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Invested</p>
                  <p className="text-lg font-bold text-gray-900">$500.00</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Current Value</p>
                  <p className="text-lg font-bold text-emerald-600">$523.45</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Gain</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <p className="text-base font-bold text-emerald-600">+$23.45 (+4.69%)</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Holding Period</p>
                  <p className="text-base font-bold text-gray-900">23 days</p>
                </div>
              </div>
              <Link href={`/invest/${symbol}/sell`}>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 font-semibold bg-transparent">
                  Withdraw Profits
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        <div className="h-20" />
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            <Link href={`/invest/${symbol}/buy`}>
              <Button className="w-full h-[52px] bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg">
                Buy
              </Button>
            </Link>
            <Link href={`/invest/${symbol}/sell`}>
              <Button
                variant="outline"
                className="w-full h-[52px] bg-white hover:bg-gray-50 text-gray-900 border-gray-300 font-semibold rounded-lg"
              >
                Sell
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
