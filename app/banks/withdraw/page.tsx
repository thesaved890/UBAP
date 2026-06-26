"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowUpFromLine, Clock, Shield, AlertCircle } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { useState } from "react"

const linkedBanks = [
  { id: 1, name: "FirstBank Nigeria", accountNumber: "****3456", currency: "NGN", withdrawalTime: "30 min - 2h" },
  { id: 2, name: "Standard Bank", accountNumber: "****7890", currency: "ZAR", withdrawalTime: "1-4h" },
  { id: 3, name: "Equity Bank", accountNumber: "****2341", currency: "KES", withdrawalTime: "2-6h" },
]

export default function WithdrawPage() {
  const [selectedBank, setSelectedBank] = useState("")
  const [amount, setAmount] = useState("")
  const ubapiBalance = "₦850,000"

  const handleWithdraw = () => {
    if (!selectedBank || !amount) return
    
    const bank = linkedBanks.find((b) => b.id.toString() === selectedBank)
    if (!bank) return
    
    const totalAmount = Number.parseFloat(amount) + 50
    
    alert(`✅ Withdrawal Initiated!\n\nAmount: ₦${Number.parseFloat(amount).toLocaleString()}\nWithdrawal Fee: ₦50\nTotal: ₦${totalAmount.toLocaleString()}\nTo: ${bank.name} ${bank.accountNumber}\n\nEstimated Time: ${bank.withdrawalTime}\n\nTransaction ID: ${Math.random().toString(36).substring(7).toUpperCase()}\n\nYou will receive a notification when the funds arrive in your bank account!`)
    
    // Reset form
    setAmount("")
    setSelectedBank("")
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="max-w-lg mx-auto">
          <Link href="/banks">
            <Button variant="ghost" size="icon" className="text-primary-foreground mb-4 hover:bg-primary-foreground/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Withdraw to Bank</h1>
          <p className="text-sm opacity-90 mt-1">Transfer funds to your bank account</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Withdraw Funds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
              <p className="text-2xl font-bold">{ubapiBalance}</p>
            </div>

            <div className="space-y-2">
              <Label>Select Bank Account</Label>
              <Select value={selectedBank} onValueChange={setSelectedBank}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose account" />
                </SelectTrigger>
                <SelectContent>
                  {linkedBanks.map((bank) => (
                    <SelectItem key={bank.id} value={bank.id.toString()}>
                      {bank.name} {bank.accountNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg font-semibold"
              />
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                Withdraw maximum
              </Button>
            </div>

            {selectedBank && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Withdrawal Fee</span>
                  <span className="font-semibold">₦50</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Processing Time</span>
                  <Badge variant="secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    {linkedBanks.find((b) => b.id.toString() === selectedBank)?.withdrawalTime}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-semibold text-lg">
                    {amount ? `₦${(Number.parseFloat(amount) + 50).toLocaleString()}` : "₦0.00"}
                  </span>
                </div>
              </div>
            )}

            <Button 
              className="w-full" 
              size="lg" 
              disabled={!selectedBank || !amount}
              onClick={handleWithdraw}
            >
              <ArrowUpFromLine className="h-5 w-5 mr-2" />
              Withdraw {amount || "0.00"}
            </Button>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Protected by PIN verification and transaction monitoring</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Withdrawal Processing Times</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Processing time varies by country and bank</li>
                  <li>• Funds typically arrive within 24 hours</li>
                  <li>• Some banks may take up to 48 hours</li>
                  <li>• You'll receive a notification when complete</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}
