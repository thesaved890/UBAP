"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  ArrowRight, 
  TrendingUp, 
  Info, 
  CheckCircle2, 
  Sparkles, 
  Zap,
  Clock,
  Shield,
  AlertCircle,
  Smartphone
} from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

// African Currencies
const africanCurrencies = {
  ngn: { name: "Nigerian Naira", symbol: "₦", rate: 1500, country: "Nigeria" },
  zar: { name: "South African Rand", symbol: "R", rate: 18, country: "South Africa" },
  xof: { name: "West African CFA Franc", symbol: "CFA", rate: 600, country: "West Africa" },
  xaf: { name: "Central African CFA Franc", symbol: "FCFA", rate: 600, country: "Central Africa" },
  kes: { name: "Kenyan Shilling", symbol: "KSh", rate: 130, country: "Kenya" },
  egp: { name: "Egyptian Pound", symbol: "E£", rate: 49, country: "Egypt" },
  mad: { name: "Moroccan Dirham", symbol: "DH", rate: 10, country: "Morocco" },
  ghs: { name: "Ghanaian Cedi", symbol: "GH₵", rate: 12, country: "Ghana" },
  tzs: { name: "Tanzanian Shilling", symbol: "TSh", rate: 2500, country: "Tanzania" },
  ugx: { name: "Ugandan Shilling", symbol: "USh", rate: 3700, country: "Uganda" },
  etb: { name: "Ethiopian Birr", symbol: "Br", rate: 122, country: "Ethiopia" },
  aoa: { name: "Angolan Kwanza", symbol: "Kz", rate: 825, country: "Angola" },
  cdf: { name: "Congolese Franc", symbol: "FC", rate: 2700, country: "DR Congo" },
  rwf: { name: "Rwandan Franc", symbol: "RF", rate: 1300, country: "Rwanda" },
  zmw: { name: "Zambian Kwacha", symbol: "ZK", rate: 27, country: "Zambia" },
}

// Mobile Money Providers
const mobileMoneyProviders = [
  { id: "mpesa", name: "M-Pesa", countries: ["Kenya", "Tanzania", "South Africa"] },
  { id: "orange", name: "Orange Money", countries: ["West Africa", "Senegal", "Mali"] },
  { id: "mtn", name: "MTN Mobile Money", countries: ["Ghana", "Uganda", "Nigeria"] },
  { id: "airtel", name: "Airtel Money", countries: ["Kenya", "Tanzania", "Zambia"] },
  { id: "wave", name: "Wave", countries: ["Senegal", "Côte d'Ivoire"] },
  { id: "moov", name: "Moov Money", countries: ["West Africa"] },
]

// African Banks by Country
const africanBanks = {
  Nigeria: ["Access Bank", "GTBank", "UBA", "First Bank", "Zenith Bank", "Ecobank Nigeria", "Fidelity Bank", "FCMB"],
  "South Africa": ["Standard Bank", "FNB", "Nedbank", "ABSA", "Capitec Bank", "Investec"],
  Kenya: ["Equity Bank", "KCB", "Co-operative Bank", "Standard Chartered Kenya", "Barclays Kenya", "I&M Bank"],
  Ghana: ["GCB Bank", "Ecobank Ghana", "Standard Chartered Ghana", "Barclays Ghana", "Zenith Bank Ghana"],
  Egypt: ["National Bank of Egypt", "Banque Misr", "Commercial International Bank", "Banque du Caire"],
  Morocco: ["Attijariwafa Bank", "BMCE Bank", "Banque Populaire", "Société Générale Maroc"],
  "West Africa": ["Ecobank", "Bank of Africa", "Orabank", "Coris Bank"],
  "Central Africa": ["BGFI Bank", "Equity Bank", "Banque Atlantique", "Afriland First Bank"],
  Tanzania: ["CRDB Bank", "NMB Bank", "Equity Bank Tanzania"],
  Uganda: ["Stanbic Bank Uganda", "Centenary Bank", "DFCU Bank"],
  Ethiopia: ["Commercial Bank of Ethiopia", "Awash Bank", "Dashen Bank"],
  Angola: ["Banco BIC", "Banco BAI", "Standard Bank Angola"],
  "DR Congo": ["Rawbank", "Equity BCDC", "Trust Merchant Bank"],
  Rwanda: ["Bank of Kigali", "Equity Bank Rwanda", "I&M Bank Rwanda"],
  Zambia: ["Zanaco", "Standard Chartered Zambia", "FNB Zambia"],
}

export default function SmartExchangePage() {
  const [fromAmount, setFromAmount] = useState("")
  const [toCurrency, setToCurrency] = useState("ngn")
  const [showResults, setShowResults] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "mobile">("mobile")
  const [transactionComplete, setTransactionComplete] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<any>(null)
  
  // Bank details
  const [bankCountry, setBankCountry] = useState("")
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")
  const [ibanPhoto, setIbanPhoto] = useState<string | null>(null)
  const [extractingIban, setExtractingIban] = useState(false)
  
  // Mobile Money details
  const [mobileProvider, setMobileProvider] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [mobileName, setMobileName] = useState("")
  
  const [referenceNumber, setReferenceNumber] = useState("")

  const piRate = 314159 // $314,159 per Pi
  const selectedCurrency = africanCurrencies[toCurrency as keyof typeof africanCurrencies]

  const calculateRoutes = () => {
    const piAmount = Number.parseFloat(fromAmount) || 0
    if (piAmount === 0) return []

    const piToUsd = piAmount * piRate
    const exchangeRate = selectedCurrency.rate

    // Route 1: Direct UBAP conversion
    const route1Amount = piToUsd * exchangeRate
    
    // Route 2: Pi → USDC (via Pi DEX) → Fiat (better rate via liquidity)
    const route2Amount = piToUsd * 1.02 * exchangeRate
    
    // Route 3: Pi → BTC → Fiat (longer route, higher fees)
    const route3Amount = piToUsd * 0.98 * exchangeRate

    return [
      {
        id: 1,
        name: "Direct UBAP",
        path: `Pi → ${toCurrency.toUpperCase()}`,
        amount: route1Amount,
        fee: piToUsd * 0.01,
        speed: "Instant",
        description: "Taux standard UBAP",
      },
      {
        id: 2,
        name: "Via Pi DEX (USDC)",
        path: `Pi → USDC → ${toCurrency.toUpperCase()}`,
        amount: route2Amount,
        fee: piToUsd * 0.015,
        speed: "2-3 min",
        description: "Meilleure liquidité via Pi DEX",
        recommended: true,
      },
      {
        id: 3,
        name: "Via Bitcoin",
        path: `Pi → BTC → ${toCurrency.toUpperCase()}`,
        amount: route3Amount,
        fee: piToUsd * 0.025,
        speed: "5-10 min",
        description: "Route alternative",
      },
    ].sort((a, b) => b.amount - a.amount)
  }

  const handleCompare = () => {
    if (fromAmount && Number.parseFloat(fromAmount) > 0) {
      setShowResults(true)
    }
  }

  const handleConfirmRoute = (route: any) => {
    setSelectedRoute(route)
    setShowResults(false)
    setShowPaymentForm(true)
  }

  const handleConfirmPayment = () => {
    const refNum = `UBAP${Date.now().toString().slice(-8)}`
    setReferenceNumber(refNum)
    setTransactionComplete(true)
  }

  const handleIbanPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const imageBase64 = reader.result as string
        setIbanPhoto(imageBase64)
        setExtractingIban(true)
        
        try {
          // Call OCR API to extract bank information
          const response = await fetch('/api/ocr/extract-bank-info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64 }),
          })

          if (!response.ok) {
            throw new Error('OCR extraction failed')
          }

          const result = await response.json()
          
          if (result.success && result.data) {
            setAccountNumber(result.data.accountNumber)
            setAccountName(result.data.accountName)
            if (result.data.bankName && result.data.bankName !== 'Unknown Bank') {
              setBankName(result.data.bankName)
            }
          } else {
            throw new Error('No data extracted')
          }
        } catch (error) {
          console.error('[v0] OCR extraction error:', error)
          alert('Extraction échouée. Veuillez entrer les informations manuellement.')
        } finally {
          setExtractingIban(false)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setShowPaymentForm(false)
    setTransactionComplete(false)
    setFromAmount("")
    setShowResults(false)
    setBankCountry("")
    setBankName("")
    setAccountNumber("")
    setAccountName("")
    setIbanPhoto(null)
    setMobileProvider("")
    setMobileNumber("")
    setMobileName("")
    setSelectedRoute(null)
  }

  const routes = calculateRoutes()
  const bestRoute = routes[0]
  const savings = routes.length > 1 ? routes[0].amount - routes[routes.length - 1].amount : 0

  return (
    <div className="min-h-screen bg-background pb-20 relative z-10">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 bg-transparent">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Smart Exchange</h1>
              <Badge className="bg-amber-500 text-white text-xs">Pi DEX</Badge>
            </div>
            <p className="text-sm opacity-90">Convertir Pi en argent local</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {!showPaymentForm && !transactionComplete && (
          <>
            {/* Info Banner */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-4 pb-4">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Comment ça fonctionne?
                    </h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      UBAP compare automatiquement 3 routes de conversion via Pi DEX Mainnet et choisit la meilleure pour vous. 
                      Économisez jusqu'à 5% sans effort!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exchange Form */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Vous envoyez (Pi)</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={fromAmount}
                      onChange={(e) => {
                        setFromAmount(e.target.value)
                        setShowResults(false)
                      }}
                      className="text-lg pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                      π
                    </span>
                  </div>
                  {fromAmount && (
                    <p className="text-xs text-muted-foreground">
                      ≈ ${(Number.parseFloat(fromAmount) * piRate).toLocaleString()} USD
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Vous recevez</Label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(africanCurrencies).map(([code, curr]) => (
                        <SelectItem key={code} value={code}>
                          {curr.symbol} {curr.name} - {curr.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600"
                  onClick={handleCompare}
                  disabled={!fromAmount || Number.parseFloat(fromAmount) <= 0}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Comparer les Routes Pi DEX
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {showResults && routes.length > 0 && (
              <>
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-800 dark:text-green-200 mb-1">Meilleur résultat</p>
                        <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                          {selectedCurrency.symbol} {bestRoute.amount.toLocaleString()}
                        </p>
                      </div>
                      {savings > 0 && (
                        <div className="text-right">
                          <p className="text-xs text-green-700 dark:text-green-300">Vous économisez</p>
                          <p className="text-lg font-bold text-green-600">
                            +{selectedCurrency.symbol} {savings.toFixed(2)}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  {routes.map((route) => (
                    <Card key={route.id} className={route.recommended ? "border-2 border-green-500" : ""}>
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{route.name}</h3>
                              {route.recommended && (
                                <Badge className="bg-green-500 text-white text-xs">Meilleur</Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{route.path}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold">
                              {selectedCurrency.symbol} {route.amount.toLocaleString()}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {route.speed}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{route.description}</p>
                        <Button
                          className="w-full"
                          variant={route.recommended ? "default" : "outline"}
                          onClick={() => handleConfirmRoute(route)}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Choisir cette route
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {/* How It Works */}
            {!showResults && (
              <Card className="bg-muted/50">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Pourquoi Smart Exchange?</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Sécurisé par Pi DEX Mainnet officiel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Trouve automatiquement le meilleur taux pour vous</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>Réception en 2-3 minutes via Mobile Money ou banque</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Payment Form */}
        {showPaymentForm && !transactionComplete && selectedRoute && (
          <>
            <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Vous recevrez</p>
                    <p className="text-3xl font-bold">
                      {selectedCurrency.symbol} {selectedRoute.amount.toLocaleString()}
                    </p>
                  </div>
                  <Badge className="bg-white/20 text-white">Via {selectedRoute.name}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold text-lg">Où voulez-vous recevoir l'argent?</h3>
                
                <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "bank" | "mobile")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="mobile">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Mobile Money
                    </TabsTrigger>
                    <TabsTrigger value="bank">Banque</TabsTrigger>
                  </TabsList>

                  <TabsContent value="mobile" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Opérateur Mobile Money *</Label>
                      <Select value={mobileProvider} onValueChange={setMobileProvider}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre opérateur" />
                        </SelectTrigger>
                        <SelectContent>
                          {mobileMoneyProviders.map((provider) => (
                            <SelectItem key={provider.id} value={provider.id}>
                              {provider.name} ({provider.countries.join(", ")})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Numéro de Téléphone *</Label>
                      <Input
                        placeholder="+XXX XXX XXX XXXX"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        type="tel"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Nom du Titulaire *</Label>
                      <Input
                        placeholder="Nom enregistré sur le compte"
                        value={mobileName}
                        onChange={(e) => setMobileName(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="bank" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Sélectionnez votre Pays *</Label>
                      <Select value={bankCountry} onValueChange={(value) => {
                        setBankCountry(value)
                        setBankName("")
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisissez votre pays" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(africanBanks).map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {bankCountry && (
                      <div className="space-y-2">
                        <Label>Sélectionnez votre Banque *</Label>
                        <Select value={bankName} onValueChange={setBankName}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisissez votre banque" />
                          </SelectTrigger>
                          <SelectContent>
                            {africanBanks[bankCountry as keyof typeof africanBanks].map((bank) => (
                              <SelectItem key={bank} value={bank}>
                                {bank}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {bankName && (
                      <>
                        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                          <CardContent className="pt-4 pb-4">
                            <Label className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-3 block">
                              Upload Photo IBAN (Recommandé)
                            </Label>
                            <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
                              Prenez une photo de votre RIB/IBAN. Le système extraira automatiquement les informations.
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleIbanPhotoUpload}
                              className="hidden"
                              id="iban-upload"
                            />
                            <label htmlFor="iban-upload">
                              <Button type="button" variant="outline" className="w-full bg-transparent" asChild>
                                <span>
                                  <Smartphone className="h-4 w-4 mr-2" />
                                  {ibanPhoto ? "Changer la photo" : "Choisir depuis la galerie"}
                                </span>
                              </Button>
                            </label>
                            
                            {extractingIban && (
                              <div className="mt-3 flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                                <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                Extraction des informations en cours...
                              </div>
                            )}

                            {ibanPhoto && !extractingIban && (
                              <div className="mt-3">
                                <img src={ibanPhoto || "/placeholder.svg"} alt="IBAN" className="rounded-lg border-2 border-blue-300 max-h-32 object-contain mx-auto" />
                                <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Informations extraites avec succès
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        <div className="space-y-2">
                          <Label>Numéro de Compte / IBAN *</Label>
                          <Input
                            placeholder="Sera rempli automatiquement depuis la photo"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="font-mono"
                            disabled={extractingIban}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Nom du Titulaire *</Label>
                          <Input
                            placeholder="Sera rempli automatiquement depuis la photo"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            disabled={extractingIban}
                          />
                        </div>
                      </>
                    )}
                  </TabsContent>
                </Tabs>

                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                  disabled={
                    extractingIban ||
                    (paymentMethod === "bank"
                      ? !bankCountry || !bankName || !accountNumber || !accountName
                      : !mobileProvider || !mobileNumber || !mobileName)
                  }
                  onClick={handleConfirmPayment}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Confirmer le Paiement
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Transaction Success */}
        {transactionComplete && selectedRoute && (
          <>
            <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <CardContent className="pt-6 pb-6 text-center">
                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Transaction Réussie!</h2>
                <p className="text-sm opacity-90">Votre conversion a été effectuée via {selectedRoute.name}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 space-y-4">
                <div className="text-center pb-4 border-b">
                  <p className="text-sm text-muted-foreground mb-1">Vous recevrez</p>
                  <p className="text-3xl font-bold text-green-600">
                    {selectedCurrency.symbol} {selectedRoute.amount.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Référence</span>
                    <span className="font-mono font-bold">{referenceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Route utilisée</span>
                    <span className="font-medium">{selectedRoute.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temps estimé</span>
                    <span className="font-medium">{selectedRoute.speed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Destination</span>
                    <span className="font-medium">
                      {paymentMethod === "bank" ? bankName : `${mobileProvider} - ${mobileNumber}`}
                    </span>
                  </div>
                </div>

                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                  <CardContent className="pt-3 pb-3">
                    <div className="flex gap-2">
                      <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <div className="text-xs text-blue-800 dark:text-blue-200">
                        <p className="font-semibold mb-1">Prochaines étapes:</p>
                        <p>1. La conversion est en cours via Pi DEX Mainnet</p>
                        <p>2. Les fonds seront crédités dans {selectedRoute.speed}</p>
                        <p>3. Vous recevrez une notification de confirmation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={resetForm} className="bg-transparent">
                    Nouvelle Conversion
                  </Button>
                  <Link href="/">
                    <Button className="w-full">Retour Accueil</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
