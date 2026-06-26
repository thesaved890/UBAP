"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Shield, Clock, CheckCircle2, AlertCircle, User, FileText } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { useState } from "react"

export default function EscrowPage() {
  const [activeTab, setActiveTab] = useState<"create" | "active" | "history">("create")
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [description, setDescription] = useState("")
  const [condition, setCondition] = useState("")

  const piBalance = 1250.45
  const escrowFee = amount ? parseFloat(amount) * 0.005 : 0 // 0.5% fee
  const totalLocked = amount ? parseFloat(amount) + escrowFee : 0

  const handleCreateEscrow = () => {
    if (!amount || !recipient || !description) {
      alert("Please fill in all required fields")
      return
    }

    const escrowId = Math.random().toString(36).substring(7).toUpperCase()
    alert(
      `✅ Escrow Created Successfully!\n\n` +
      `Escrow ID: ${escrowId}\n` +
      `Amount Locked: π ${parseFloat(amount).toFixed(4)}\n` +
      `Fee: π ${escrowFee.toFixed(4)}\n` +
      `Total: π ${totalLocked.toFixed(4)}\n` +
      `Recipient: ${recipient}\n\n` +
      `The Pi is now safely locked in escrow.\n` +
      `The recipient can only receive it once you confirm completion.`
    )

    setAmount("")
    setRecipient("")
    setDescription("")
    setCondition("")
    setActiveTab("active")
  }

  const activeEscrows = [
    {
      id: "ESC7X2K",
      amount: 50.5,
      recipient: "Paul Kamau",
      description: "Website development services",
      status: "pending",
      created: "2 hours ago"
    },
    {
      id: "ESC9M4P",
      amount: 120.0,
      recipient: "Maria Diop",
      description: "Used car purchase - Toyota Corolla 2018",
      status: "awaiting_delivery",
      created: "1 day ago"
    },
  ]

  const escrowHistory = [
    {
      id: "ESC3B7N",
      amount: 75.25,
      recipient: "Kofi Mensah",
      description: "Freelance graphic design",
      status: "completed",
      completed: "3 days ago"
    },
    {
      id: "ESC1K9W",
      amount: 200.0,
      recipient: "Amina Hassan",
      description: "Laptop purchase - MacBook Pro",
      status: "completed",
      completed: "1 week ago"
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4">
        <div className="max-w-lg mx-auto">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white mb-4 hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Pi Escrow</h1>
              <p className="text-sm opacity-90">Secure peer-to-peer transactions</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Info Banner */}
        <Card className="border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
              <div className="text-sm">
                <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-1">
                  How Escrow Works
                </p>
                <p className="text-emerald-700 dark:text-emerald-300">
                  Your Pi is safely locked until you confirm delivery. Protects both buyer and seller from fraud. Fee: 0.5%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={activeTab === "create" ? "default" : "outline"}
            className={activeTab !== "create" ? "bg-transparent" : ""}
            onClick={() => setActiveTab("create")}
          >
            Create New
          </Button>
          <Button
            variant={activeTab === "active" ? "default" : "outline"}
            className={activeTab !== "active" ? "bg-transparent" : ""}
            onClick={() => setActiveTab("active")}
          >
            Active ({activeEscrows.length})
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "outline"}
            className={activeTab !== "history" ? "bg-transparent" : ""}
            onClick={() => setActiveTab("history")}
          >
            History
          </Button>
        </div>

        {/* Create Escrow Tab */}
        {activeTab === "create" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create New Escrow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Your Pi Balance</Label>
                <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">π</span>
                    <span className="font-semibold">Pi Coin</span>
                  </div>
                  <span className="text-sm font-bold">π {piBalance.toFixed(4)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Amount to Lock</Label>
                <Input
                  type="number"
                  placeholder="0.0000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.0001"
                  className="text-lg font-semibold"
                />
              </div>

              <div className="space-y-2">
                <Label>Recipient Pi Address</Label>
                <Input
                  placeholder="Enter recipient wallet address"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Transaction Description</Label>
                <Textarea
                  placeholder="E.g. Payment for laptop, freelance work, car purchase..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Release Condition (Optional)</Label>
                <Input
                  placeholder="E.g. After delivery confirmation, Upon completion..."
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                />
              </div>

              {amount && parseFloat(amount) > 0 && (
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-semibold">π {parseFloat(amount).toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Escrow Fee (0.5%)</span>
                    <span className="font-semibold">π {escrowFee.toFixed(4)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-semibold">Total Locked</span>
                    <span className="font-bold text-lg">π {totalLocked.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">USD Value</span>
                    <span className="font-semibold">${(totalLocked * 314159).toLocaleString()}</span>
                  </div>
                </div>
              )}

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleCreateEscrow}
                disabled={!amount || !recipient || !description}
              >
                <Shield className="h-5 w-5 mr-2" />
                Create Secure Escrow
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Active Escrows Tab */}
        {activeTab === "active" && (
          <div className="space-y-4">
            {activeEscrows.map((escrow) => (
              <Card key={escrow.id} className="border-l-4 border-l-amber-500">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm font-semibold">{escrow.id}</span>
                        <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-100">
                          <Clock className="h-3 w-3 mr-1" />
                          {escrow.status === "pending" ? "Pending" : "Awaiting Delivery"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{escrow.created}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">π {escrow.amount.toFixed(4)}</p>
                      <p className="text-xs text-muted-foreground">${(escrow.amount * 314159).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">To:</span>
                      <span className="font-medium">{escrow.recipient}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">For:</span>
                      <span className="font-medium">{escrow.description}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="bg-transparent" size="sm">
                      View Details
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Release Pi
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {activeEscrows.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No active escrows</p>
                  <Button 
                    variant="link" 
                    className="mt-2"
                    onClick={() => setActiveTab("create")}
                  >
                    Create your first escrow
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-4">
            {escrowHistory.map((escrow) => (
              <Card key={escrow.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm font-semibold">{escrow.id}</span>
                        <Badge variant="secondary" className="bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-100">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{escrow.completed}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">π {escrow.amount.toFixed(4)}</p>
                      <p className="text-xs text-muted-foreground">${(escrow.amount * 314159).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">To:</span>
                      <span className="font-medium">{escrow.recipient}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">For:</span>
                      <span className="font-medium">{escrow.description}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* How It Works */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-base">How Pi Escrow Protects You</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">
                1
              </div>
              <div>
                <p className="font-semibold">Lock Pi Safely</p>
                <p className="text-muted-foreground text-xs">Your Pi is secured in smart contract escrow</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">
                2
              </div>
              <div>
                <p className="font-semibold">Seller Delivers</p>
                <p className="text-muted-foreground text-xs">Recipient provides goods/service as agreed</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">
                3
              </div>
              <div>
                <p className="font-semibold">Confirm & Release</p>
                <p className="text-muted-foreground text-xs">You confirm receipt and Pi is released to seller</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}
