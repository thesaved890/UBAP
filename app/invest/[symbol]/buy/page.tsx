"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { X, DollarSign, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const stocksData = {
  AAPL: { name: "Apple Inc.", price: 189.84, logo: "🍎" },
  TSLA: { name: "Tesla Inc.", price: 248.42, logo: "⚡" },
  NVDA: { name: "NVIDIA Corp.", price: 876.35, logo: "🎮" },
  NFLX: { name: "Netflix Inc.", price: 587.32, logo: "🎬" },
  MSFT: { name: "Microsoft Corp.", price: 428.15, logo: "💻" },
  AMZN: { name: "Amazon.com Inc.", price: 178.25, logo: "📦" },
  GOOGL: { name: "Alphabet Inc.", price: 163.42, logo: "🔍" },
  META: { name: "Meta Platforms", price: 512.78, logo: "👥" },
}

export default function BuyStockPage({ params }: { params: { symbol: string } }) {
  const router = useRouter()
  const symbol = params.symbol.toUpperCase()
  const stock = stocksData[symbol as keyof typeof stocksData] || stocksData.AAPL

  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("pi")

  const availableBalance = 10000
  const shares = amount ? (parseFloat(amount) / stock.price).toFixed(6) : "0"
  const fee = amount ? (parseFloat(amount) * 0.005).toFixed(2) : "0.00"
  const total = amount ? (parseFloat(amount) + parseFloat(fee)).toFixed(2) : "0.00"

  const handleConfirm = () => {
    if (!amount || parseFloat(amount) < 10) {
      alert("⚠️ Minimum Investment Required\n\nMinimum investment is $10\n\nPlease increase your investment amount.")
      return
    }
    const piAmount = (parseFloat(total) / 314159).toFixed(8)
    alert(`✅ Investment Successful!\n\nPurchased: ${shares} shares of ${symbol}\nStock Price: $${stock.price.toFixed(2)}\nInvestment: $${amount}\nProcessing Fee: $${fee}\nTotal: $${total}\n\nPaid with: ${piAmount} Pi\n\nTransaction ID: ${Math.random().toString(36).substring(7).toUpperCase()}\n\nYour shares have been added to your portfolio!`)
    router.push(`/invest/${symbol}`)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-900">Invest in {symbol}</h2>
          <Link href={`/invest/${symbol}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </Link>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stock Info */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-4xl">
              {stock.logo}
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">{stock.name}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">${stock.price.toFixed(2)}</p>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
              Investment Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 h-12 text-lg font-semibold border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
            <p className="text-sm text-emerald-600 font-medium">Available: ${availableBalance.toLocaleString()}</p>
          </div>

          {/* Payment Method - Pi Only */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Payment Method</Label>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white border-2 border-primary">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                  π
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-base">Pay with Pi Network</p>
                  <p className="text-sm text-primary font-semibold">1 Pi = $314,159</p>
                  <p className="text-xs text-gray-500 mt-1">Only Pi accepted for purchases</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <div className="bg-emerald-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-900">You receive</span>
              <span className="text-lg font-bold text-emerald-900">{shares} shares</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Processing fee (0.5%)</span>
              <span className="text-sm text-gray-600">${fee}</span>
            </div>
            <div className="border-t border-emerald-200 pt-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">Total cost</span>
              <span className="text-lg font-bold text-gray-900">${total}</span>
            </div>
          </div>

          {/* Confirm Button */}
          <Button
            onClick={handleConfirm}
            className="w-full h-[52px] bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-lg shadow-md"
            disabled={!amount || parseFloat(amount) < 10}
          >
            Confirm Investment
          </Button>
        </div>
      </div>
    </div>
  )
}
