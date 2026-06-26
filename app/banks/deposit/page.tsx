"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowDownToLine, Clock, Shield, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { useState } from "react"

const linkedBanks = [
  {
    id: 1,
    name: "FirstBank Nigeria",
    accountNumber: "****3456",
    currency: "NGN",
    balance: "₦450,000",
    depositTime: "0-5 min",
  },
  {
    id: 2,
    name: "Standard Bank",
    accountNumber: "****7890",
    currency: "ZAR",
    balance: "R15,250",
    depositTime: "5-10 min",
  },
  {
    id: 3,
    name: "Equity Bank",
    accountNumber: "****2341",
    currency: "KES",
    balance: "KSh82,500",
    depositTime: "5-10 min",
  },
]

export default function DepositPage() {
  const [selectedBank, setSelectedBank] = useState("")
  const [amount, setAmount] = useState("")

  const handleDeposit = () => {
    if (!selectedBank || !amount) return
    
    const bank = linkedBanks.find((b) => b.id.toString() === selectedBank)
    if (!bank) return
    
    alert(`✅ Deposit Initiated!\n\nFrom: ${bank.name} ${bank.accountNumber}\nAmount: ${amount} ${bank.currency}\nTo: UBAP Wallet\n\nProcessing Fee: Free\nEstimated Time: ${bank.depositTime}\n\nTransaction ID: ${Math.random().toString(36).substring(7).toUpperCase()}\n\nYou will receive a confirmation once the deposit is complete!`)
    
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
          <h1 className="text-2xl font-bold">Deposit to UBAP</h1>
          <p className="text-sm opacity-90 mt-1">Transfer funds from your bank account</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Instant Bank Deposit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Bank Account</Label>
              <Select value={selectedBank} onValueChange={setSelectedBank}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose account" />
                </SelectTrigger>
                <SelectContent>
                  {linkedBanks.map((bank) => (
                    <SelectItem key={bank.id} value={bank.id.toString()}>
                      {bank.name} {bank.accountNumber} • {bank.balance}
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
            </div>

            {selectedBank && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Processing Fee</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Processing Time</span>
                  <Badge variant="secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    {linkedBanks.find((b) => b.id.toString() === selectedBank)?.depositTime}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">You will receive</span>
                  <span className="font-semibold text-lg">{amount || "0.00"}</span>
                </div>
              </div>
            )}

            <Button 
              className="w-full" 
              size="lg" 
              disabled={!selectedBank || !amount}
              onClick={handleDeposit}
            >
              <ArrowDownToLine className="h-5 w-5 mr-2" />
              Deposit {amount || "0.00"}
            </Button>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Secured by bank-grade encryption and 2FA verification</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="font-semibold text-sm">Instant Deposits</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                <li>• Funds available in 0-15 minutes</li>
                <li>• No deposit fees</li>
                <li>• Secure API integration with your bank</li>
                <li>• Real-time balance updates</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}
