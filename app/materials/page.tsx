"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Info,
  Download,
  Vault,
  Truck,
  Shield,
  Calendar,
  LineChart,
} from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { useState } from "react"

const materials = [
  {
    name: "Gold",
    symbol: "XAU",
    holdings: 15.5,
    unit: "grams",
    value: 12450.0,
    color: "bg-secondary text-secondary-foreground",
    pricePerUnit: 803.23,
    pricePerOz: 2497.45,
    marketChange: 1.8,
    purity: ["24K (99.9%)", "22K (91.6%)", "18K (75.0%)"],
  },
  {
    name: "Silver",
    symbol: "XAG",
    holdings: 245.0,
    unit: "grams",
    value: 6780.0,
    color: "bg-muted text-muted-foreground",
    pricePerUnit: 27.67,
    pricePerOz: 23.45,
    marketChange: -0.3,
    purity: ["99.9% (Fine)", "92.5% (Sterling)"],
  },
  {
    name: "Diamond",
    symbol: "💎",
    holdings: 2.3,
    unit: "carats",
    value: 8900.0,
    color: "bg-chart-3 text-primary-foreground",
    pricePerUnit: 3869.57,
    pricePerOz: null,
    marketChange: 0.5,
    purity: ["VS1", "VS2", "VVS1", "VVS2"],
  },
  {
    name: "Platinum",
    symbol: "XPT",
    holdings: 8.2,
    unit: "grams",
    value: 4890.0,
    color: "bg-[#E5E4E2] text-foreground",
    pricePerUnit: 596.34,
    pricePerOz: 945.0,
    marketChange: 2.1,
    purity: ["95.0%", "99.9%"],
  },
  {
    name: "Palladium",
    symbol: "XPD",
    holdings: 3.5,
    unit: "grams",
    value: 3675.0,
    color: "bg-[#CED0DD] text-foreground",
    pricePerUnit: 1050.0,
    pricePerOz: 1025.0,
    marketChange: -1.5,
    purity: ["99.5%", "99.9%"],
  },
]

const africancurrencies = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1.0 },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", rate: 1500 },
  { code: "ZAR", name: "South African Rand", symbol: "R", rate: 18.5 },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", rate: 130 },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£", rate: 31 },
]

const vaultLocations = [
  { name: "Johannesburg Secure Vault", country: "South Africa", capacity: "95%", flag: "🇿🇦" },
  { name: "Lagos Premium Storage", country: "Nigeria", capacity: "87%", flag: "🇳🇬" },
  { name: "Nairobi Gold Reserve", country: "Kenya", capacity: "92%", flag: "🇰🇪" },
  { name: "Cairo Diamond Facility", country: "Egypt", capacity: "78%", flag: "🇪🇬" },
]

const marketNews = [
  { title: "Gold prices surge on economic uncertainty", time: "2 hours ago", sentiment: "positive" },
  { title: "Silver demand increases in African markets", time: "5 hours ago", sentiment: "positive" },
  { title: "Platinum production faces supply constraints", time: "1 day ago", sentiment: "negative" },
]

export default function MaterialsPage() {
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")
  const [selectedMaterial, setSelectedMaterial] = useState("gold")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [ownershipType, setOwnershipType] = useState("digital")
  const [selectedPurity, setSelectedPurity] = useState("")
  const [selectedVault, setSelectedVault] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [insureDelivery, setInsureDelivery] = useState(true)
  const [chartView, setChartView] = useState("1D")

  const currentMaterial = materials.find((m) => m.name.toLowerCase() === selectedMaterial)
  const selectedCurrency = africancurrencies.find((c) => c.code === currency)
  const estimatedCost = amount && currentMaterial ? Number.parseFloat(amount) * currentMaterial.pricePerUnit : 0
  const convertedPrice = estimatedCost && selectedCurrency ? estimatedCost * selectedCurrency.rate : estimatedCost
  const processingFee = ownershipType === "physical" ? 25 : 5
  const insuranceFee = ownershipType === "physical" && insureDelivery ? 15 : 0
  const totalCost = estimatedCost + processingFee + insuranceFee

  const handleBuy = () => {
    if (!amount || Number.parseFloat(amount) <= 0) return
    
    const ownership = ownershipType === "physical" ? "Physical Delivery" : "Digital Certificate"
    const deliveryInfo = ownershipType === "physical" 
      ? `\nDelivery to: ${deliveryAddress || "Not specified"}\nInsurance: ${insureDelivery ? "Yes (+$15)" : "No"}`
      : `\nStorage: ${selectedVault || "To be assigned"}`
    
    alert(`✅ Purchase Successful!\n\nBought: ${amount} ${currentMaterial?.unit} of ${currentMaterial?.name}\nOwnership: ${ownership}\nPurity: ${selectedPurity || "Standard"}${deliveryInfo}\n\nMaterial Cost: $${estimatedCost.toFixed(2)}\nProcessing Fee: $${processingFee}\nInsurance: $${insuranceFee}\nTotal: $${totalCost.toFixed(2)}\n\nTransaction ID: ${Math.random().toString(36).substring(7).toUpperCase()}\n\nEstimated time: ${ownershipType === "physical" ? "3-7 days" : "Instant"}`)
    
    // Reset form
    setAmount("")
    setDeliveryAddress("")
  }

  const handleSell = () => {
    if (!amount || Number.parseFloat(amount) <= 0) return
    
    const sellValue = estimatedCost > 5 ? estimatedCost - 5 : 0
    
    alert(`✅ Sale Successful!\n\nSold: ${amount} ${currentMaterial?.unit} of ${currentMaterial?.name}\nMarket Value: $${estimatedCost.toFixed(2)}\nProcessing Fee: -$5.00\nYou Receive: $${sellValue.toFixed(2)}\n\nTransaction ID: ${Math.random().toString(36).substring(7).toUpperCase()}\n\nFunds will be credited to your UBAP wallet instantly!`)
    
    // Reset form
    setAmount("")
  }

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
          <h1 className="text-2xl font-bold">Precious Materials</h1>
          <p className="text-sm opacity-90 mt-1">Trade gold, silver, diamond, platinum & palladium</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Holdings Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Your Holdings</CardTitle>
              <Badge variant="secondary" className="text-xs">
                Total: ${materials.reduce((sum, m) => sum + m.value, 0).toLocaleString()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {materials.map((material) => (
              <Link key={material.name} href={`/materials/${material.name.toLowerCase()}`}>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all cursor-pointer hover:scale-[1.02]">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-12 w-12 rounded-full ${material.color} flex items-center justify-center font-bold text-sm`}
                    >
                      {material.symbol}
                    </div>
                    <div>
                      <p className="font-semibold">{material.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {material.holdings} {material.unit} @ ${material.pricePerUnit.toFixed(2)}/
                        {material.unit === "grams" ? "g" : "ct"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${material.value.toLocaleString()}</p>
                    <div
                      className={`flex items-center gap-1 text-xs ${material.marketChange > 0 ? "text-primary" : "text-destructive"}`}
                    >
                      {material.marketChange > 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {Math.abs(material.marketChange)}%
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Trading Interface */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trade Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="buy" onValueChange={(v) => setTradeType(v as "buy" | "sell")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>
              <TabsContent value="buy" className="space-y-4">
                <div className="space-y-2">
                  <Label>Material</Label>
                  <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gold">Gold (XAU)</SelectItem>
                      <SelectItem value="silver">Silver (XAG)</SelectItem>
                      <SelectItem value="diamond">Diamond</SelectItem>
                      <SelectItem value="platinum">Platinum (XPT)</SelectItem>
                      <SelectItem value="palladium">Palladium (XPD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ownership Type</Label>
                  <RadioGroup value={ownershipType} onValueChange={setOwnershipType}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value="digital" id="digital" />
                      <Label htmlFor="digital" className="flex-1 cursor-pointer">
                        <div>
                          <p className="font-medium">Digital Certificate</p>
                          <p className="text-xs text-muted-foreground">Instant, from $10 minimum</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value="physical" id="physical" />
                      <Label htmlFor="physical" className="flex-1 cursor-pointer">
                        <div>
                          <p className="font-medium">Physical Delivery</p>
                          <p className="text-xs text-muted-foreground">Shipped to verified address</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {currentMaterial && currentMaterial.purity && (
                  <div className="space-y-2">
                    <Label>Purity/Grade</Label>
                    <Select value={selectedPurity} onValueChange={setSelectedPurity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select purity" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentMaterial.purity.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Amount ({currentMaterial?.unit})</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-muted-foreground">Minimum: $10 equivalent (fractional ownership)</p>
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border-2 border-primary">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                      π
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Pay with Pi Network</p>
                      <p className="text-xs text-primary font-medium">1 Pi = $314,159</p>
                    </div>
                  </div>
                </div>

                {ownershipType === "digital" && (
                  <div className="space-y-2">
                    <Label>Storage Vault</Label>
                    <Select value={selectedVault} onValueChange={setSelectedVault}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vault location" />
                      </SelectTrigger>
                      <SelectContent>
                        {vaultLocations.map((vault) => (
                          <SelectItem key={vault.name} value={vault.name}>
                            {vault.flag} {vault.name} - {vault.capacity} capacity
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {ownershipType === "physical" && (
                  <>
                    <div className="space-y-2">
                      <Label>Delivery Address</Label>
                      <Input
                        placeholder="Enter verified KYC address"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        <Shield className="h-3 w-3 inline mr-1" />
                        Only KYC Level 3 verified addresses accepted
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="insurance"
                        checked={insureDelivery}
                        onCheckedChange={(checked) => setInsureDelivery(checked as boolean)}
                      />
                      <Label htmlFor="insurance" className="text-sm cursor-pointer">
                        Add insurance (+$15) - Covers up to $50,000
                      </Label>
                    </div>
                  </>
                )}

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Material Cost</span>
                    <span className="font-semibold">
                      {selectedCurrency?.symbol}
                      {convertedPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing Fee</span>
                    <span className="font-semibold">${processingFee}.00</span>
                  </div>
                  {insuranceFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Insurance Fee</span>
                      <span className="font-semibold">${insuranceFee}.00</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Time</span>
                    <span className="font-semibold">{ownershipType === "physical" ? "3-7 days" : "Instant"}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-semibold">Total Cost</span>
                    <span className="font-bold text-lg">${totalCost.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg" 
                  disabled={!amount || Number.parseFloat(amount) <= 0}
                  onClick={handleBuy}
                >
                  Buy {currentMaterial?.name}
                </Button>
              </TabsContent>

              <TabsContent value="sell" className="space-y-4">
                <div className="space-y-2">
                  <Label>Material</Label>
                  <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((m) => (
                        <SelectItem key={m.name} value={m.name.toLowerCase()}>
                          {m.name} - {m.holdings} {m.unit} available
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Amount ({currentMaterial?.unit})</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    max={currentMaterial?.holdings}
                  />
                  <p className="text-xs text-muted-foreground">
                    Available: {currentMaterial?.holdings} {currentMaterial?.unit}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Convert To</Label>
                  <Select defaultValue="fiat">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fiat">Fiat Currency</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="stocks">Stocks/Shares</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Value</span>
                    <span className="font-semibold">${estimatedCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing Fee</span>
                    <span className="font-semibold text-destructive">-$5.00</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-semibold">You will receive</span>
                    <span className="font-bold text-lg text-primary">
                      ${estimatedCost > 5 ? (estimatedCost - 5).toFixed(2) : "0.00"}
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg" 
                  disabled={!amount || Number.parseFloat(amount) <= 0}
                  onClick={handleSell}
                >
                  Sell {currentMaterial?.name}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Live Spot Prices</CardTitle>
              <Button variant="ghost" size="sm" className="h-8">
                <LineChart className="h-4 w-4 mr-1" />
                Charts
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {materials.map((material) => (
              <div key={material.name} className="space-y-2 pb-3 border-b last:border-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{material.name}</span>
                  <Badge variant={material.marketChange > 0 ? "default" : "destructive"} className="text-xs">
                    {material.marketChange > 0 ? "+" : ""}
                    {material.marketChange}%
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Per {material.unit === "grams" ? "gram" : "carat"}</p>
                    <p className="font-semibold">${material.pricePerUnit.toFixed(2)}</p>
                  </div>
                  {material.pricePerOz && (
                    <div>
                      <p className="text-muted-foreground">Per ounce</p>
                      <p className="font-semibold">${material.pricePerOz.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Vault className="h-5 w-5" />
              Secure Storage Vaults
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {vaultLocations.map((vault) => (
              <div key={vault.name} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{vault.flag}</span>
                  <div>
                    <p className="font-semibold text-sm">{vault.name}</p>
                    <p className="text-xs text-muted-foreground">{vault.country}</p>
                  </div>
                </div>
                <Badge variant="outline">{vault.capacity}</Badge>
              </div>
            ))}
            <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg text-xs">
              <Shield className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
              <p className="text-muted-foreground">
                All materials stored with AES-256 encryption, insured up to $250,000 per user
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Commodities News
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {marketNews.map((news, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                <div
                  className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${news.sentiment === "positive" ? "bg-primary" : "bg-destructive"}`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{news.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{news.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Purchases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-semibold text-sm">Gold 24K Certificate</p>
                <p className="text-xs text-muted-foreground">5.5g • Digital • Jan 10, 2026</p>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-semibold text-sm">Silver 99.9% Certificate</p>
                <p className="text-xs text-muted-foreground">50g • Physical • Jan 5, 2026</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Truck className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  <strong>Fractional Ownership:</strong> Start investing from just $10 equivalent in any precious
                  material.
                </p>
                <p>
                  <strong>Physical Delivery:</strong> Available to KYC Level 3 verified addresses across Africa with
                  full insurance tracking (3-7 business days).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}
