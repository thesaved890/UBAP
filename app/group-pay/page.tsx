"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Users, Gift, Heart, Calendar, Share2, Check, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface GroupPayment {
  id: string
  title: string
  description: string
  organizer: string
  goal: number
  collected: number
  contributors: number
  category: "wedding" | "funeral" | "gift" | "event" | "other"
  deadline: string
  currency: string
  status: "active" | "completed" | "cancelled"
}

export default function GroupPayPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<GroupPayment | null>(null)
  const [contributeAmount, setContributeAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"ubap" | "bank" | "mobile">("ubap")

  // Mock data
  const myGroups: GroupPayment[] = [
    {
      id: "1",
      title: "Mariage de Joseph & Marie",
      description: "Collecte pour le cadeau de mariage de nos amis Joseph et Marie",
      organizer: "Pierre Nkomo",
      goal: 0.05,
      collected: 0.032,
      contributors: 8,
      category: "wedding",
      deadline: "2024-02-15",
      currency: "XAF",
      status: "active",
    },
    {
      id: "2",
      title: "Funérailles Maman Thérèse",
      description: "Soutien pour la famille de Maman Thérèse qui nous a quitté",
      organizer: "Famille Mbala",
      goal: 0.08,
      collected: 0.078,
      contributors: 15,
      category: "funeral",
      deadline: "2024-02-10",
      currency: "CDF",
      status: "active",
    },
  ]

  const availableGroups: GroupPayment[] = [
    {
      id: "3",
      title: "Anniversaire Chef Équipe IT",
      description: "Cadeau pour l'anniversaire de notre chef d'équipe",
      organizer: "Équipe Development",
      goal: 0.03,
      collected: 0.018,
      contributors: 6,
      category: "gift",
      deadline: "2024-02-20",
      currency: "NGN",
      status: "active",
    },
    {
      id: "4",
      title: "Fête de fin d'année église",
      description: "Organisation de la fête communautaire de fin d'année",
      organizer: "Comité Église",
      goal: 0.1,
      collected: 0.045,
      contributors: 12,
      category: "event",
      deadline: "2024-03-01",
      currency: "XAF",
      status: "active",
    },
  ]

  const categoryIcons = {
    wedding: { icon: Heart, color: "text-pink-600", bg: "bg-pink-100 dark:bg-pink-950" },
    funeral: { icon: Heart, color: "text-slate-600", bg: "bg-slate-100 dark:bg-slate-950" },
    gift: { icon: Gift, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-950" },
    event: { icon: Calendar, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-950" },
    other: { icon: Users, color: "text-green-600", bg: "bg-green-100 dark:bg-green-950" },
  }

  const handleContribute = () => {
    if (!selectedPayment || !contributeAmount) return
    alert(`✅ Contribution envoyée!\n\nMontant: π ${contributeAmount}\nCagnotte: ${selectedPayment.title}\n\nMerci pour votre générosité!`)
    setSelectedPayment(null)
    setContributeAmount("")
  }

  const handleShare = (payment: GroupPayment) => {
    const message = `🎁 Participez à: ${payment.title}\n\nObjectif: π ${payment.goal}\nDéjà collecté: π ${payment.collected}\n\nRejoignez-nous sur UBAP!`
    alert(`📤 Lien de partage créé:\n\n${message}`)
  }

  const getProgress = (payment: GroupPayment) => {
    return (payment.collected / payment.goal) * 100
  }

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setShowCreateForm(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Créer une Cagnotte</h1>
              <p className="text-sm opacity-90">Collecte pour un événement</p>
            </div>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la Cagnotte *</Label>
                <Input id="title" placeholder="Ex: Mariage de Jean & Marie" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Détails sur l'événement..." rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <select
                  id="category"
                  className="w-full p-2 rounded-md border bg-background"
                >
                  <option value="wedding">Mariage</option>
                  <option value="funeral">Funérailles</option>
                  <option value="gift">Cadeau</option>
                  <option value="event">Événement</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goal">Objectif (Pi) *</Label>
                  <Input id="goal" type="number" step="0.001" placeholder="0.050" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Date Limite</Label>
                  <Input id="deadline" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Monnaie Locale</Label>
                <select
                  id="currency"
                  className="w-full p-2 rounded-md border bg-background"
                >
                  <option value="XAF">XAF (Franc CFA)</option>
                  <option value="CDF">CDF (Franc Congolais)</option>
                  <option value="NGN">NGN (Naira)</option>
                  <option value="ZAR">ZAR (Rand)</option>
                  <option value="KES">KES (Shilling Kenyan)</option>
                </select>
              </div>

              <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <Label className="text-blue-900 dark:text-blue-100">Comment voulez-vous recevoir les fonds? *</Label>
                <div className="space-y-2">
                  <label className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === "ubap" ? "border-blue-400 bg-blue-100 dark:bg-blue-900/40" : "border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/20"}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="ubap" 
                      checked={paymentMethod === "ubap"}
                      onChange={(e) => setPaymentMethod(e.target.value as "ubap" | "bank" | "mobile")}
                      className="mt-1" 
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-blue-900 dark:text-blue-100">Compte UBAP (Recommandé)</p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">Recevez directement dans votre compte UBAP. Utilisez votre carte virtuelle ou retirez quand vous voulez.</p>
                    </div>
                  </label>
                  
                  <label className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === "bank" ? "border-primary bg-muted" : "border-muted hover:bg-muted/50"}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="bank" 
                      checked={paymentMethod === "bank"}
                      onChange={(e) => setPaymentMethod(e.target.value as "ubap" | "bank" | "mobile")}
                      className="mt-1" 
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">Virement Bancaire</p>
                      <p className="text-xs text-muted-foreground">Transfert direct vers votre compte bancaire.</p>
                    </div>
                  </label>
                  
                  <label className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === "mobile" ? "border-primary bg-muted" : "border-muted hover:bg-muted/50"}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="mobile" 
                      checked={paymentMethod === "mobile"}
                      onChange={(e) => setPaymentMethod(e.target.value as "ubap" | "bank" | "mobile")}
                      className="mt-1" 
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">Mobile Money</p>
                      <p className="text-xs text-muted-foreground">Orange Money, MTN, Airtel Money selon votre pays.</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Conditional fields based on payment method */}
              {paymentMethod === "bank" && (
                <Card className="bg-muted/50">
                  <CardContent className="pt-4 space-y-3">
                    <h4 className="font-semibold text-sm">Détails du Compte Bancaire</h4>
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Nom de la Banque *</Label>
                      <Input id="bankName" placeholder="Ex: Ecobank, UBA, Equity Bank..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Numéro de Compte *</Label>
                      <Input id="accountNumber" placeholder="Votre numéro de compte" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountName">Nom du Titulaire *</Label>
                      <Input id="accountName" placeholder="Nom complet sur le compte" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Les fonds seront transférés vers ce compte une fois l'objectif atteint
                    </p>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === "mobile" && (
                <Card className="bg-muted/50">
                  <CardContent className="pt-4 space-y-3">
                    <h4 className="font-semibold text-sm">Détails Mobile Money</h4>
                    <div className="space-y-2">
                      <Label htmlFor="mobileOperator">Opérateur *</Label>
                      <select id="mobileOperator" className="w-full p-2 rounded-md border bg-background">
                        <option value="">Sélectionnez votre opérateur</option>
                        <option value="orange">Orange Money</option>
                        <option value="mtn">MTN Mobile Money</option>
                        <option value="airtel">Airtel Money</option>
                        <option value="mpesa">M-Pesa</option>
                        <option value="wave">Wave</option>
                        <option value="moov">Moov Money</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobileNumber">Numéro de Téléphone *</Label>
                      <Input id="mobileNumber" type="tel" placeholder="+243 XX XXX XXXX" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobileName">Nom du Titulaire *</Label>
                      <Input id="mobileName" placeholder="Nom enregistré sur le compte" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Les fonds seront envoyés sur ce numéro une fois l'objectif atteint
                    </p>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === "ubap" && (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    ✅ Les fonds arriveront directement dans votre compte UBAP actuel. Aucune information supplémentaire nécessaire.
                  </p>
                </div>
              )}

              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Créer la Cagnotte
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Une fois créée, vous pourrez partager le lien avec vos proches
              </p>
            </CardContent>
          </Card>

          {/* Info for organizer */}
          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="pt-6 space-y-3">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100">💡 En tant qu'organisateur:</h3>
              <div className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                <p>✅ <strong>Vous recevrez automatiquement</strong> les fonds dans votre compte UBAP quand l'objectif est atteint</p>
                <p>✅ Conversion automatique en <strong>monnaie locale</strong> que vous avez choisie</p>
                <p>✅ Utilisez les fonds via <strong>carte virtuelle UBAP</strong>, virement bancaire ou Mobile Money</p>
                <p>⚠️ Si objectif non atteint à la date limite, les contributeurs sont remboursés automatiquement</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (selectedPayment) {
    const IconComponent = categoryIcons[selectedPayment.category].icon
    const progress = getProgress(selectedPayment)

    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setSelectedPayment(null)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Contribuer</h1>
              <p className="text-sm opacity-90">{selectedPayment.title}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => handleShare(selectedPayment)}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
          {/* Payment Details */}
          <Card className="border-2">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className={`h-12 w-12 rounded-full ${categoryIcons[selectedPayment.category].bg} flex items-center justify-center`}>
                  <IconComponent className={`h-6 w-6 ${categoryIcons[selectedPayment.category].color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedPayment.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedPayment.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-primary/10">{selectedPayment.organizer[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">Organisé par <span className="font-semibold text-foreground">{selectedPayment.organizer}</span></span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="font-semibold">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">π {selectedPayment.collected.toFixed(4)}</span>
                  <span className="text-muted-foreground">sur π {selectedPayment.goal}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{selectedPayment.contributors}</p>
                  <p className="text-xs text-muted-foreground">Contributeurs</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{selectedPayment.deadline}</p>
                  <p className="text-xs text-muted-foreground">Date limite</p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Organisé par <span className="font-semibold text-foreground">{selectedPayment.organizer}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contribution Form */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Votre Contribution (Pi)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.001"
                  placeholder="0.005"
                  value={contributeAmount}
                  onChange={(e) => setContributeAmount(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  ≈ ${(parseFloat(contributeAmount || "0") * 314159).toLocaleString()} USD
                </p>
              </div>

              <Button
                onClick={handleContribute}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                disabled={!contributeAmount || Number.parseFloat(contributeAmount) <= 0}
              >
                <Check className="h-4 w-4 mr-2" />
                Confirmer la Contribution
              </Button>
            </CardContent>
          </Card>

          {/* How it works */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6 space-y-3">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Comment ça fonctionne?
              </h3>
              <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <p><strong>1. Vous contribuez:</strong> Votre Pi est envoyé dans un compte sécurisé UBAP</p>
                <p><strong>2. Objectif atteint:</strong> Les fonds sont automatiquement transférés à l'organisateur <strong>{selectedPayment.organizer}</strong></p>
                <p><strong>3. Réception:</strong> L'organisateur reçoit le total en <strong>{selectedPayment.currency}</strong> dans son compte UBAP</p>
                <p><strong>4. Utilisation:</strong> Il peut utiliser sa carte virtuelle UBAP, faire un virement bancaire ou retirer via Mobile Money</p>
              </div>
              <div className="pt-2 border-t border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  🔒 Sécurité garantie par UBAP - Remboursement automatique si objectif non atteint
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Paiements de Groupe</h1>
              <p className="text-sm opacity-90">Cagnottes collectives</p>
            </div>
          </div>
          <Button
            size="icon"
            className="bg-white text-green-600 hover:bg-white/90"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* My Groups */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Mes Cagnottes</h2>
            <Badge variant="secondary">{myGroups.length}</Badge>
          </div>

          {myGroups.map((payment) => {
            const IconComponent = categoryIcons[payment.category].icon
            const progress = getProgress(payment)

            return (
              <Card
                key={payment.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedPayment(payment)}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-full ${categoryIcons[payment.category].bg} flex items-center justify-center`}>
                      <IconComponent className={`h-5 w-5 ${categoryIcons[payment.category].color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{payment.title}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Avatar className="h-4 w-4">
                          <AvatarFallback className="text-[8px] bg-primary/10">{payment.organizer[0]}</AvatarFallback>
                        </Avatar>
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">{payment.organizer}</span> • Organisateur
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {progress.toFixed(0)}%
                    </Badge>
                  </div>

                  <Progress value={progress} className="h-1.5" />

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold">π {payment.collected.toFixed(4)} / {payment.goal}</span>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {payment.contributors}
                      </span>
                      <span>📅 {payment.deadline}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        {/* Available Groups */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cagnottes Disponibles</h2>
            <Badge variant="secondary">{availableGroups.length}</Badge>
          </div>

          {availableGroups.map((payment) => {
            const IconComponent = categoryIcons[payment.category].icon
            const progress = getProgress(payment)

            return (
              <Card
                key={payment.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors border-dashed"
                onClick={() => setSelectedPayment(payment)}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-full ${categoryIcons[payment.category].bg} flex items-center justify-center`}>
                      <IconComponent className={`h-5 w-5 ${categoryIcons[payment.category].color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{payment.title}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Avatar className="h-4 w-4">
                          <AvatarFallback className="text-[8px] bg-primary/10">{payment.organizer[0]}</AvatarFallback>
                        </Avatar>
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">{payment.organizer}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <Progress value={progress} className="h-1.5" />

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold">π {payment.collected.toFixed(4)} / {payment.goal}</span>
                    <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                      Contribuer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        {/* Info Card */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <TrendingUp className="h-5 w-5" />
              <h3 className="font-semibold text-sm">Comment ça marche?</h3>
            </div>
            <ul className="text-xs text-green-700 dark:text-green-300 space-y-1 ml-7">
              <li>• Créez une cagnotte pour un événement</li>
              <li>• Partagez le lien avec vos proches</li>
              <li>• Chacun contribue en Pi</li>
              <li>• L'organisateur reçoit le total automatiquement</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
