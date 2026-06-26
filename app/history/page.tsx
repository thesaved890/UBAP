"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Download, Send, ArrowDownUp, ExternalLink, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { useState } from "react"

const transactions = [
  {
    id: "TX-2024-001",
    type: "send",
    asset: "π Pi Coin",
    amount: "-125.50",
    value: "$376.50",
    date: "Today, 2:30 PM",
    status: "completed",
    to: "Paul Kamau",
    hash: "0x7a3d9f2e8b1c4a6d5e9f7b2c3d8a1e4f6b9c2d5e8a3b7c1f4d6e9a2b5c8d1e4f",
    blockNumber: 15234567,
    network: "Pi Network",
  },
  {
    id: "TX-2024-002",
    type: "receive",
    asset: "XRP",
    amount: "+250.00",
    value: "$262.50",
    date: "Yesterday, 5:15 PM",
    status: "completed",
    from: "Maria Diop",
    hash: "r3kmxyz9abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567abc",
    blockNumber: 78901234,
    network: "XRP Ledger",
  },
  {
    id: "TX-2024-003",
    type: "convert",
    asset: "π → ₦",
    amount: "200 π",
    value: "₦90,000",
    date: "Yesterday, 11:30 AM",
    status: "completed",
    hash: "0x1b4c7e9d2f5a8c3b6e1d4f7a2c5b8e1d4f7a2c5b8e1d4f7a2c5b8e1d4f7a2c5b",
    blockNumber: 15234512,
    network: "Multi-chain",
  },
  {
    id: "TX-2024-004",
    type: "send",
    asset: "BTC",
    amount: "-0.0050",
    value: "$335.00",
    date: "2 days ago",
    status: "completed",
    to: "Kofi Mensah",
    hash: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
    blockNumber: 832456,
    network: "Bitcoin",
  },
  {
    id: "TX-2024-005",
    type: "receive",
    asset: "XLM",
    amount: "+1,500.00",
    value: "$292.50",
    date: "3 days ago",
    status: "completed",
    from: "Aisha Okafor",
    hash: "GABY2K3R5MNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ123",
    blockNumber: 45678901,
    network: "Stellar",
  },
  {
    id: "TX-2024-006",
    type: "convert",
    asset: "Gold → π",
    amount: "2.5g",
    value: "670.27 π",
    date: "4 days ago",
    status: "completed",
    hash: "0x9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d",
    blockNumber: 15234401,
    network: "Multi-chain",
  },
  {
    id: "TX-2024-007",
    type: "send",
    asset: "XRP",
    amount: "-100.00",
    value: "$105.00",
    date: "5 days ago",
    status: "pending",
    to: "Ibrahim Diallo",
    hash: "r7mnopqr123stu456vwx789yz012abc345def678ghi901jkl234mno567pqr890",
    blockNumber: null,
    network: "XRP Ledger",
  },
]

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTransaction, setSelectedTransaction] = useState<(typeof transactions)[0] | null>(null)

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ("to" in tx && tx.to?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ("from" in tx && tx.from?.toLowerCase().includes(searchQuery.toLowerCase())),
  )

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
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <p className="text-sm opacity-90 mt-1">Complete history with blockchain verification</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="send">Sent</TabsTrigger>
            <TabsTrigger value="receive">Received</TabsTrigger>
            <TabsTrigger value="convert">Converted</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-3 mt-6">
            {filteredTransactions.map((tx) => (
              <Card
                key={tx.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedTransaction(tx)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          tx.type === "send"
                            ? "bg-destructive/10 text-destructive"
                            : tx.type === "receive"
                              ? "bg-primary/10 text-primary"
                              : "bg-accent/10 text-accent"
                        }`}
                      >
                        {tx.type === "send" ? (
                          <Send className="h-5 w-5" />
                        ) : tx.type === "receive" ? (
                          <Download className="h-5 w-5" />
                        ) : (
                          <ArrowDownUp className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{tx.asset}</p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                        {"to" in tx && tx.to && <p className="text-xs text-muted-foreground">To: {tx.to}</p>}
                        {"from" in tx && tx.from && <p className="text-xs text-muted-foreground">From: {tx.from}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${tx.amount.startsWith("+") ? "text-primary" : "text-foreground"}`}>
                        {tx.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.value}</p>
                      <Badge variant={tx.status === "completed" ? "secondary" : "outline"} className="mt-1 text-xs">
                        {tx.status === "completed" ? (
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="send" className="space-y-3 mt-6">
            {filteredTransactions
              .filter((tx) => tx.type === "send")
              .map((tx) => (
                <Card
                  key={tx.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedTransaction(tx)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                          <Send className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{tx.asset}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                          {"to" in tx && tx.to && <p className="text-xs text-muted-foreground">To: {tx.to}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{tx.amount}</p>
                        <p className="text-xs text-muted-foreground">{tx.value}</p>
                        <Badge variant={tx.status === "completed" ? "secondary" : "outline"} className="mt-1 text-xs">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
          <TabsContent value="receive" className="space-y-3 mt-6">
            {filteredTransactions
              .filter((tx) => tx.type === "receive")
              .map((tx) => (
                <Card
                  key={tx.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedTransaction(tx)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <Download className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{tx.asset}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                          {"from" in tx && tx.from && <p className="text-xs text-muted-foreground">From: {tx.from}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{tx.amount}</p>
                        <p className="text-xs text-muted-foreground">{tx.value}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
          <TabsContent value="convert" className="space-y-3 mt-6">
            {filteredTransactions
              .filter((tx) => tx.type === "convert")
              .map((tx) => (
                <Card
                  key={tx.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedTransaction(tx)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                          <ArrowDownUp className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{tx.asset}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{tx.amount}</p>
                        <p className="text-xs text-muted-foreground">{tx.value}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end"
            onClick={() => setSelectedTransaction(null)}
          >
            <Card className="w-full max-w-lg mx-auto mb-0 rounded-b-none" onClick={(e) => e.stopPropagation()}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Transaction Details</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedTransaction(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Transaction ID</p>
                    <p className="font-mono text-sm">{selectedTransaction.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Type</p>
                    <Badge>
                      {selectedTransaction.type.charAt(0).toUpperCase() + selectedTransaction.type.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Asset</p>
                    <p className="font-semibold">{selectedTransaction.asset}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Amount</p>
                    <p className="font-semibold text-lg">{selectedTransaction.amount}</p>
                    <p className="text-sm text-muted-foreground">{selectedTransaction.value}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Date & Time</p>
                    <p className="font-semibold">{selectedTransaction.date}</p>
                  </div>
                  {"to" in selectedTransaction && selectedTransaction.to && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Recipient</p>
                      <p className="font-semibold">{selectedTransaction.to}</p>
                    </div>
                  )}
                  {"from" in selectedTransaction && selectedTransaction.from && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Sender</p>
                      <p className="font-semibold">{selectedTransaction.from}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Network</p>
                    <p className="font-semibold">{selectedTransaction.network}</p>
                  </div>
                  {selectedTransaction.blockNumber && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Block Number</p>
                      <p className="font-mono text-sm">{selectedTransaction.blockNumber.toLocaleString()}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="font-mono text-xs break-all">{selectedTransaction.hash}</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Block Explorer
                    </Button>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <Badge variant={selectedTransaction.status === "completed" ? "default" : "outline"}>
                      {selectedTransaction.status === "completed" ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
