"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { X, DollarSign, Wallet, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const africanCurrencies = [
  { code: "XOF", name: "CFA Franc (West Africa)", symbol: "CFA", rate: 600 },
  { code: "XAF", name: "CFA Franc (Central Africa)", symbol: "FCFA", rate: 600 },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", rate: 1550 },
  { code: "ZAR", name: "South African Rand", symbol: "R", rate: 18.5 },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£", rate: 48.5 },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", rate: 158 },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "GH₵", rate: 12.3 },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh", rate: 2620 },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh", rate: 3740 },
  { code: "MAD", name: "Moroccan Dirham", symbol: "DH", rate: 10.1 },
]

const stocksData = {
  AAPL: { name: "Apple Inc.", price: 189.84, shares: 2.634, invested: 500, currentValue: 523.45 },
  TSLA: { name: "Tesla Inc.", price: 248.42, shares: 0, invested: 0, currentValue: 0 },
}

export default function SellStockPage({ params }: { params: { symbol: string } }) {
  const router = useRouter()
  const symbol = params.symbol.toUpperCase()
  const stock = stocksData[symbol as keyof typeof stocksData] || stocksData.AAPL

  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawTo, setWithdrawTo] = useState("pi")
  const [selectedCurrency, setSelectedCurrency] = useState("XOF") // Declare selectedCurrency

  const profit = stock.currentValue - stock.invested
  const profitPercent = stock.invested > 0 ? ((profit / stock.invested) * 100).toFixed(2) : "0.00"
  const fee = withdrawAmount ? (parseFloat(withdrawAmount) * 0.005).toFixed(2) : "0.00"
  const netAmount = withdrawAmount ? (parseFloat(withdrawAmount) - parseFloat(fee)).toFixed(2) : "0.00"

  const handleConfirm = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) < 10) {
      alert("⚠️ Minimum Withdrawal Required\n\nMinimum withdrawal is $10\n\nPlease increase your withdrawal amount.")
      return
    }
    if (parseFloat(withdrawAmount) > stock.currentValue) {
      alert("⚠️ Insufficient Balance\n\nYou don't have enough balance to withdraw this amount.\n\nAvailable: $" + stock.currentValue.toFixed(2))
      return
    }
    
    if (withdrawTo === "pi") {
      const piAmount = (parseFloat(netAmount) / 314159).toFixed(8)
      alert(`✅ Withdrawal Successful!\n\nWithdrew: $${withdrawAmount}\nProcessing Fee: -$${fee}\nNet Amount: $${netAmount}\nReceived: ${piAmount} Pi\n\nTransaction ID: ${Math.random().toString(36).substring(7).toUpperCase()}\n\nPi has been sent to your wallet!`)
    } else {
      const currency = africanCurrencies.find((c) => c.code === selectedCurrency)
      const localAmount = (parseFloat(netAmount) * (currency?.rate || 1)).toFixed(2)
      alert(`✅ Withdrawal Initiated!\n\nWithdrew: $${withdrawAmount}\nProcessing Fee: -$${fee}\nNet Amount: $${netAmount}\nReceiving: ${currency?.symbol}${localAmount}\n\nTransaction ID: ${Math.random().toString(36).substring(7).toUpperCase()}\n\nFunds will be transferred to your bank in 1-2 business days!`)
    }
    
    router.push(`/invest/${symbol}`)
  }

  if (stock.shares === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <div className="text-center py-8">
            <p className="text-lg font-semibold text-gray-900 mb-4">No Investment Found</p>
            <p className="text-sm text-gray-600 mb-6">You don't have any shares of {symbol} to sell.</p>
            <Link href={`/invest/${symbol}`}>
              <Button className="bg-primary hover:bg-primary/90">Go Back</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-900">Withdraw Investment</h2>
          <Link href={`/invest/${symbol}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </Link>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Investment Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Invested</p>
                <p className="text-base font-bold text-gray-900">${stock.invested.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Current Value</p>
                <p className="text-base font-bold text-emerald-600">${stock.currentValue.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Profit/Loss</p>
                <p className="text-base font-bold text-emerald-600">
                  +${profit.toFixed(2)} (+{profitPercent}%)
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Shares Owned</p>
                <p className="text-base font-bold text-gray-900">{stock.shares.toFixed(6)}</p>
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="withdrawAmount" className="text-sm font-medium text-gray-700">
              Withdrawal Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <Input
                id="withdrawAmount"
                type="number"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="pl-8 h-12 text-lg font-semibold border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Available: ${stock.currentValue.toFixed(2)}</p>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/90 text-xs font-medium h-6 px-2"
                onClick={() => setWithdrawAmount(stock.currentValue.toString())}
              >
                Max
              </Button>
            </div>
          </div>

          {/* Withdrawal Method Options */}
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Withdraw To</Label>
              <RadioGroup value={withdrawTo} onValueChange={setWithdrawTo} className="space-y-3">
                {/* Pi Wallet */}
                <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border-2 border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem value="pi" id="pi-wallet" className="text-primary" />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                      π
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">Pi Network Wallet</p>
                      <p className="text-xs text-gray-500">Instant transfer</p>
                    </div>
                  </div>
                </label>

                {/* Bank Account with African Currencies */}
                <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border-2 border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem value="bank" id="bank-account" className="text-primary" />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">Bank Account</p>
                      <p className="text-xs text-gray-500">African currencies available</p>
                    </div>
                  </div>
                </label>
              </RadioGroup>

              {/* Currency Selector (visible only when bank is selected) */}
              {withdrawTo === "bank" && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Select Currency</Label>
                  <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {africanCurrencies.map((curr) => (
                        <SelectItem key={curr.code} value={curr.code}>
                          {curr.name} ({curr.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-2">
                    Rate: 1 USD ≈{" "}
                    {africanCurrencies.find((c) => c.code === selectedCurrency)?.rate}{" "}
                    {africanCurrencies.find((c) => c.code === selectedCurrency)?.symbol}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Fee Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Withdrawal amount</span>
              <span className="font-semibold text-gray-900">${withdrawAmount || "0.00"}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Processing fee (0.5%)</span>
              <span className="font-semibold text-gray-900">${fee}</span>
            </div>
            <div className="border-t border-gray-300 pt-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">You receive</span>
              <span className="text-lg font-bold text-gray-900">${netAmount}</span>
            </div>
          </div>

          {/* Confirm Button */}
          <Button
            onClick={handleConfirm}
            className="w-full h-[52px] bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-lg shadow-md"
            disabled={!withdrawAmount || parseFloat(withdrawAmount) < 10}
          >
            Confirm Withdrawal
          </Button>
        </div>
      </div>
    </div>
  )
}
