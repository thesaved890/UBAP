"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BottomNav } from "@/components/bottom-nav"
import {
  ArrowLeft,
  CreditCard,
  Plus,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Smartphone,
  Copy,
  CheckCircle2,
  AlertCircle,
  Wallet,
  Apple,
} from "lucide-react"
import { PI_CONFIG } from "@/lib/pi-config"

const africanCurrencies = [
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", country: "Nigeria", flag: "🇳🇬" },
  { code: "XOF", name: "CFA Franc", symbol: "CFA", country: "West Africa", flag: "🌍" },
  { code: "ZAR", name: "South African Rand", symbol: "R", country: "South Africa", flag: "🇿🇦" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", country: "Kenya", flag: "🇰🇪" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", country: "Ghana", flag: "🇬🇭" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh", country: "Tanzania", flag: "🇹🇿" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh", country: "Uganda", flag: "🇺🇬" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£", country: "Egypt", flag: "🇪🇬" },
]

interface VirtualCard {
  id: string
  cardNumber: string
  cvv: string
  expiryDate: string
  currency: string
  currencySymbol: string
  balance: number
  status: "active" | "frozen"
  cardholderName: string
  country: string
  flag: string
  piReserved: number
  provider: "Visa" | "Mastercard"
}

export default function VirtualCardsPage() {
  const [cards, setCards] = useState<VirtualCard[]>([
    {
      id: "1",
      cardNumber: "5399 8765 4321 0987",
      cvv: "123",
      expiryDate: "12/28",
      currency: "NGN",
      currencySymbol: "₦",
      balance: 450000,
      status: "active",
      cardholderName: "ADEBAYO OLUWASEUN",
      country: "Nigeria",
      flag: "🇳🇬",
      piReserved: 1.43,
      provider: "Mastercard",
    },
  ])

  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showRechargeDialog, setShowRechargeDialog] = useState(false)
  const [selectedCard, setSelectedCard] = useState<VirtualCard | null>(null)
  const [showCardDetails, setShowCardDetails] = useState<{ [key: string]: boolean }>({})
  const [showCVV, setShowCVV] = useState<{ [key: string]: boolean }>({})
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const [newCardCurrency, setNewCardCurrency] = useState("NGN")
  const [newCardName, setNewCardName] = useState("ADEBAYO OLUWASEUN")
  const [initialBalance, setInitialBalance] = useState("")
  const [rechargeAmount, setRechargeAmount] = useState("")

  const piBalance = 125.5847

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const toggleCardStatus = (cardId: string) => {
    setCards(cards.map(card => 
      card.id === cardId 
        ? { ...card, status: card.status === "active" ? "frozen" : "active" }
        : card
    ))
  }

  const handleAddToApplePay = (card: VirtualCard) => {
    if (card.status === "frozen") {
      alert("Veuillez d'abord dégeler votre carte avant de l'ajouter à Apple Pay.")
      return
    }
    
    // Navigate to add to wallet page
    window.location.href = `/cards/add-to-wallet?type=apple&card=${card.cardNumber.slice(-4)}`
  }

  const handleAddToGooglePay = (card: VirtualCard) => {
    if (card.status === "frozen") {
      alert("Veuillez d'abord dégeler votre carte avant de l'ajouter à Google Pay.")
      return
    }
    
    // Navigate to add to wallet page
    window.location.href = `/cards/add-to-wallet?type=google&card=${card.cardNumber.slice(-4)}`
  }

  const createCard = () => {
    const currency = africanCurrencies.find(c => c.code === newCardCurrency)
    if (!currency || !initialBalance) return

    const piNeeded = parseFloat(initialBalance) / PI_CONFIG.GCV_RATE
    
    const newCard: VirtualCard = {
      id: Date.now().toString(),
      cardNumber: `${5300 + Math.floor(Math.random() * 100)} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      cvv: Math.floor(Math.random() * 900 + 100).toString(),
      expiryDate: "12/29",
      currency: currency.code,
      currencySymbol: currency.symbol,
      balance: parseFloat(initialBalance),
      status: "active",
      cardholderName: newCardName.toUpperCase(),
      country: currency.country,
      flag: currency.flag,
      piReserved: piNeeded,
      provider: Math.random() > 0.5 ? "Visa" : "Mastercard",
    }

    setCards([...cards, newCard])
    setShowCreateDialog(false)
    setInitialBalance("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">My Cards</h1>
            <p className="text-xs text-muted-foreground">Virtual Payment Cards</p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Card
          </Button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Pi Balance */}
        <Card className="border-primary/30 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Pi Balance</p>
                <p className="text-3xl font-bold text-primary">π {piBalance.toFixed(4)}</p>
                <p className="text-xs text-muted-foreground mt-1">Use to fund cards</p>
              </div>
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                <Wallet className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Virtual Cards List */}
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="relative">
              {/* Realistic 3D Card Design */}
              <div 
                className={`relative w-full aspect-[1.586/1] rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02] ${
                  card.status === "frozen" ? "grayscale opacity-60" : ""
                }`}
                style={{
                  background: card.provider === "Visa" 
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                }}
              >
                {/* African Pattern Overlay */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                {/* Card Content */}
                <div className="relative h-full p-6 flex flex-col justify-between text-white">
                  {/* Top Section */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs opacity-80 mb-1">{card.country}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold">{card.currencySymbol} {card.balance.toLocaleString()}</p>
                        <Badge 
                          variant={card.status === "active" ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {card.status === "active" ? "Active" : "Frozen"}
                        </Badge>
                      </div>
                      <p className="text-[10px] opacity-70">π {card.piReserved.toFixed(4)} reserved</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="h-10 w-12 rounded bg-amber-400/30 backdrop-blur-sm flex items-center justify-center">
                        <CreditCard className="h-6 w-6" />
                      </div>
                    </div>
                  </div>

                  {/* Card Number */}
                  <div>
                    <button
                      onClick={() => setShowCardDetails({...showCardDetails, [card.id]: !showCardDetails[card.id]})}
                      className="flex items-center gap-2 w-full group"
                    >
                      <p className="text-xl font-mono tracking-[0.2em]">
                        {showCardDetails[card.id] 
                          ? card.cardNumber 
                          : `${card.cardNumber.slice(0, 4)} •••• •••• ${card.cardNumber.slice(-4)}`
                        }
                      </p>
                      {showCardDetails[card.id] ? (
                        <EyeOff className="h-4 w-4 opacity-70" />
                      ) : (
                        <Eye className="h-4 w-4 opacity-70" />
                      )}
                    </button>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs opacity-70 mb-1">Cardholder</p>
                      <p className="text-sm font-bold tracking-wider">{card.cardholderName}</p>
                    </div>
                    <div className="flex items-end gap-6">
                      <div>
                        <p className="text-xs opacity-70 mb-1">Expires</p>
                        <p className="text-sm font-bold">{card.expiryDate}</p>
                      </div>
                      {showCardDetails[card.id] && (
                        <div>
                          <p className="text-xs opacity-70 mb-1">CVV</p>
                          <p className="text-sm font-bold">{card.cvv}</p>
                        </div>
                      )}
                      <div className="text-right">
                        {card.provider === "Visa" ? (
                          <svg className="h-8 w-auto" viewBox="0 0 48 16" fill="white">
                            <path d="M19.7 1.5l-6.3 13h-3.3l-3.1-9.8c-.2-.6-.3-1-.8-1.3-.8-.5-2.1-.9-3.2-1.2l.1-.2h5.5c.7 0 1.3.5 1.5 1.2l1.4 7.4 3.4-8.6h3zm13.2 8.7c0-3.4-4.7-3.6-4.7-5.1 0-.5.4-.9 1.4-1 1-.1 2.6.2 3.8.8l.7-3.2c-1.2-.4-2.7-.8-4.5-.8-3.2 0-5.4 1.7-5.4 4.1 0 1.8 1.6 2.8 2.8 3.4 1.3.6 1.7 1 1.7 1.5 0 .8-.9 1.1-1.8 1.1-1.5 0-2.3-.2-3.5-.7l-.6 3.2c1.2.5 3.4.9 5.7.9 3.4 0 5.6-1.6 5.6-4.2zm8.5 4.3h2.9l-2.5-13h-2.7c-.6 0-1.2.4-1.4 1l-5 12h3.2l.6-1.7h4l.4 1.7zm-3.5-4.1l1.6-4.6 1 4.6h-2.6zm-17.8-8.9l-2.5 13h-3l2.5-13h3z"/>
                          </svg>
                        ) : (
                          <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="white">
                            <circle cx="15" cy="16" r="11" fillOpacity="0.8"/>
                            <circle cx="33" cy="16" r="11" fillOpacity="0.8"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => handleCopy(card.cardNumber.replace(/\s/g, ''), `card-${card.id}`)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copiedField === `card-${card.id}` ? "Copied!" : "Copy Number"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    setSelectedCard(card)
                    setShowRechargeDialog(true)
                  }}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Add Money
                </Button>
                <Button
                  variant={card.status === "active" ? "outline" : "default"}
                  size="sm"
                  onClick={() => toggleCardStatus(card.id)}
                >
                  {card.status === "active" ? (
                    <><Lock className="h-4 w-4 mr-2" /> Freeze</>
                  ) : (
                    <><Unlock className="h-4 w-4 mr-2" /> Unfreeze</>
                  )}
                </Button>
              </div>

              {/* Mobile Wallet Integration */}
              <Card className="mt-3">
                <CardContent className="pt-4 pb-4">
                  <p className="text-xs text-muted-foreground mb-3">Add to Mobile Wallet</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-transparent"
                      onClick={() => handleAddToApplePay(card)}
                    >
                      <Apple className="h-4 w-4 mr-2" />
                      Apple Pay
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-transparent"
                      onClick={() => handleAddToGooglePay(card)}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Google Pay
                    </Button>
                  </div>
                  {card.status === "frozen" && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Unfreeze card to add to mobile wallet
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {cards.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <CreditCard className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-semibold mb-2">No Cards Yet</p>
              <p className="text-sm text-muted-foreground mb-4">Create your first virtual card</p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Card
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Create Card Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Virtual Card</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Currency</Label>
              <Select value={newCardCurrency} onValueChange={setNewCardCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {africanCurrencies.map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.flag} {currency.name} ({currency.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Cardholder Name</Label>
              <Input 
                value={newCardName} 
                onChange={(e) => setNewCardName(e.target.value)}
                placeholder="Your name as it appears"
              />
            </div>

            <div>
              <Label>Initial Balance ({africanCurrencies.find(c => c.code === newCardCurrency)?.symbol})</Label>
              <Input 
                type="number"
                value={initialBalance}
                onChange={(e) => setInitialBalance(e.target.value)}
                placeholder="Enter amount"
              />
              {initialBalance && (
                <p className="text-xs text-muted-foreground mt-1">
                  Will deduct π {(parseFloat(initialBalance) / PI_CONFIG.GCV_RATE).toFixed(4)} from your balance
                </p>
              )}
            </div>

            <Button 
              className="w-full"
              onClick={createCard}
              disabled={!initialBalance || parseFloat(initialBalance) <= 0}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Card
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Recharge Dialog */}
      <Dialog open={showRechargeDialog} onOpenChange={setShowRechargeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Money to Card</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedCard && (
              <>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Current Balance</p>
                  <p className="text-2xl font-bold text-primary">
                    {selectedCard.currencySymbol} {selectedCard.balance.toLocaleString()}
                  </p>
                </div>

                <div>
                  <Label>Amount to Add ({selectedCard.currencySymbol})</Label>
                  <Input 
                    type="number"
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                  {rechargeAmount && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Will deduct π {(parseFloat(rechargeAmount) / PI_CONFIG.GCV_RATE).toFixed(4)} from your Pi balance
                    </p>
                  )}
                </div>

                <Button 
                  className="w-full"
                  onClick={() => {
                    if (selectedCard && rechargeAmount) {
                      const newBalance = selectedCard.balance + parseFloat(rechargeAmount)
                      const piDeducted = parseFloat(rechargeAmount) / PI_CONFIG.GCV_RATE
                      
                      setCards(cards.map(card => 
                        card.id === selectedCard.id 
                          ? { ...card, balance: newBalance, piReserved: card.piReserved + piDeducted }
                          : card
                      ))
                      setShowRechargeDialog(false)
                      setRechargeAmount("")
                    }
                  }}
                  disabled={!rechargeAmount || parseFloat(rechargeAmount) <= 0}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Add Money
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  )
}
