"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Plus,
  CheckCircle2,
  Trash2,
  ArrowDownToLine,
  ArrowUpFromLine,
  Repeat,
  Zap,
  Eye,
  EyeOff,
  Camera,
  Upload,
  X,
} from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { useState, useRef } from "react"

const africanBanks = [
  {
    name: "Standard Bank",
    country: "South Africa",
    countries: ["South Africa", "Namibia", "Botswana"],
    logo: "🏦",
    status: "connected",
    apiStatus: "active",
    depositTime: "0-5 min",
    withdrawalTime: "30 min - 2h",
  },
  {
    name: "Equity Bank",
    country: "Kenya",
    countries: ["Kenya", "Uganda", "Tanzania", "Rwanda"],
    logo: "🏦",
    status: "connected",
    apiStatus: "active",
    depositTime: "5-10 min",
    withdrawalTime: "1-4h",
  },
  {
    name: "Ecobank",
    country: "Pan-African",
    countries: ["Nigeria", "Ghana", "Senegal", "Côte d'Ivoire", "Benin", "Togo", "Burkina Faso", "Mali", "Niger"],
    logo: "🌍",
    status: "available",
    apiStatus: "active",
    depositTime: "5-15 min",
    withdrawalTime: "2-6h",
  },
  {
    name: "United Bank for Africa",
    country: "Nigeria",
    countries: ["Nigeria", "Ghana", "Kenya"],
    logo: "🏦",
    status: "available",
    apiStatus: "active",
    depositTime: "5-10 min",
    withdrawalTime: "1-4h",
  },
  {
    name: "Attijariwafa Bank",
    country: "Morocco",
    countries: ["Morocco", "Tunisia", "Senegal", "Côte d'Ivoire"],
    logo: "🏦",
    status: "available",
    apiStatus: "active",
    depositTime: "10-15 min",
    withdrawalTime: "4-12h",
  },
  {
    name: "Commercial Bank of Ethiopia",
    country: "Ethiopia",
    countries: ["Ethiopia"],
    logo: "🏦",
    status: "available",
    apiStatus: "active",
    depositTime: "10-15 min",
    withdrawalTime: "6-24h",
  },
  {
    name: "Absa Group",
    country: "South Africa",
    countries: ["South Africa", "Kenya", "Ghana", "Botswana"],
    logo: "🏦",
    status: "available",
    apiStatus: "active",
    depositTime: "5-10 min",
    withdrawalTime: "1-4h",
  },
  {
    name: "FirstBank Nigeria",
    country: "Nigeria",
    countries: ["Nigeria", "Ghana", "Senegal"],
    logo: "🏦",
    status: "connected",
    apiStatus: "active",
    depositTime: "0-5 min",
    withdrawalTime: "30 min - 2h",
  },
  {
    name: "Access Bank",
    country: "Nigeria",
    countries: ["Nigeria", "Ghana", "Kenya", "Zambia"],
    logo: "🏦",
    status: "available",
    apiStatus: "active",
    depositTime: "5-10 min",
    withdrawalTime: "1-4h",
  },
  {
    name: "Stanbic Bank",
    country: "Pan-African",
    countries: ["Uganda", "Kenya", "Ghana", "Zambia", "Botswana"],
    logo: "🌍",
    status: "available",
    apiStatus: "active",
    depositTime: "5-10 min",
    withdrawalTime: "1-4h",
  },
  {
    name: "Guaranty Trust Bank",
    country: "Nigeria",
    countries: ["Nigeria", "Ghana", "Kenya"],
    logo: "🏦",
    status: "available",
    apiStatus: "active",
    depositTime: "5-10 min",
    withdrawalTime: "1-4h",
  },
  {
    name: "Zenith Bank",
    country: "Nigeria",
    countries: ["Nigeria", "Ghana", "Sierra Leone"],
    logo: "🏦",
    status: "available",
    apiStatus: "active",
    depositTime: "5-10 min",
    withdrawalTime: "1-4h",
  },
  {
    name: "Bank of Africa",
    country: "Pan-African",
    countries: ["Benin", "Burkina Faso", "Mali", "Senegal", "Niger", "Togo", "Côte d'Ivoire"],
    logo: "🌍",
    status: "available",
    apiStatus: "active",
    depositTime: "10-20 min",
    withdrawalTime: "2-6h",
  },
  {
    name: "Coris Bank",
    country: "Burkina Faso",
    countries: ["Burkina Faso", "Benin", "Togo", "Niger", "Senegal"],
    logo: "🏦",
    status: "available",
    apiStatus: "active",
    depositTime: "10-15 min",
    withdrawalTime: "3-8h",
  },
  {
    name: "Banque Atlantique",
    country: "Togo",
    countries: ["Togo", "Benin", "Burkina Faso", "Mali", "Niger", "Senegal", "Côte d'Ivoire"],
    logo: "🏦",
    status: "available",
    apiStatus: "active",
    depositTime: "10-20 min",
    withdrawalTime: "2-6h",
  },
  {
    name: "Orabank",
    country: "Togo",
    countries: ["Togo", "Benin", "Burkina Faso", "Chad", "Côte d'Ivoire", "Guinea-Bissau", "Senegal"],
    logo: "🏦",
    status: "available",
    apiStatus: "active",
    depositTime: "10-20 min",
    withdrawalTime: "3-8h",
  },
  {
    name: "Société Générale",
    country: "Senegal",
    countries: ["Senegal", "Côte d'Ivoire", "Burkina Faso", "Benin", "Guinea", "Mali", "Mauritania"],
    logo: "🏦",
    status: "available",
    apiStatus: "active",
    depositTime: "5-15 min",
    withdrawalTime: "2-6h",
  },
  {
    name: "BCEAO",
    country: "Pan-African",
    countries: ["Benin", "Burkina Faso", "Côte d'Ivoire", "Guinea-Bissau", "Mali", "Niger", "Senegal", "Togo"],
    logo: "🌍",
    status: "available",
    apiStatus: "active",
    depositTime: "15-30 min",
    withdrawalTime: "4-12h",
  },
]

const linkedAccounts = [
  {
    id: 1,
    bankName: "FirstBank Nigeria",
    accountNumber: "****3456",
    fullAccount: "0123453456",
    accountName: "John Doe",
    country: "Nigeria",
    currency: "NGN",
    balance: "₦450,000.00",
    verified: true,
  },
  {
    id: 2,
    bankName: "Standard Bank",
    accountNumber: "****7890",
    fullAccount: "9876547890",
    accountName: "John Doe",
    country: "South Africa",
    currency: "ZAR",
    balance: "R15,250.00",
    verified: true,
  },
  {
    id: 3,
    bankName: "Equity Bank",
    accountNumber: "****2341",
    fullAccount: "5678912341",
    accountName: "John Doe",
    country: "Kenya",
    currency: "KES",
    balance: "KSh82,500.00",
    verified: false,
  },
]

export default function BanksPage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedBank, setSelectedBank] = useState("")
  const [showBalances, setShowBalances] = useState(true)
  const [activeTab, setActiveTab] = useState("accounts")
  
  // Bank linking form states
  const [linkStep, setLinkStep] = useState<'select' | 'details' | 'otp' | 'success'>('select')
  const [accountName, setAccountName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [iban, setIban] = useState("")
  const [otp, setOtp] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Bill payment states
  const [showBillPayment, setShowBillPayment] = useState(false)
  const [selectedBillType, setSelectedBillType] = useState<any>(null)
  const [billProvider, setBillProvider] = useState("")
  const [billAmount, setBillAmount] = useState("")
  const [billAccountNumber, setBillAccountNumber] = useState("")
  const [billCountry, setBillCountry] = useState("Nigeria")
  const [billCurrency, setBillCurrency] = useState("pi")
  const [paymentMethod, setPaymentMethod] = useState<"pi" | "bank" | "mobile">("pi")
  const [selectedBankForPayment, setSelectedBankForPayment] = useState("")
  const [mobileMoneyProvider, setMobileMoneyProvider] = useState("")
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState("")
  const [mobileMoneyPin, setMobileMoneyPin] = useState("")
  const [schoolIban, setSchoolIban] = useState("")
  const [schoolName, setSchoolName] = useState("")
  const [studentName, setStudentName] = useState("")
  const [uploadedIbanImage, setUploadedIbanImage] = useState<string | null>(null)
  const ibanFileInputRef = useRef<HTMLInputElement>(null)

  // Recurring transfer states
  const [showRecurringTransfer, setShowRecurringTransfer] = useState(false)
  const [recurringBank, setRecurringBank] = useState("")
  const [recurringAmount, setRecurringAmount] = useState("")
  const [recurringFrequency, setRecurringFrequency] = useState("monthly")
  const [recurringStartDate, setRecurringStartDate] = useState("")

  // Recipient payment information states
  const [recipientPiAddress, setRecipientPiAddress] = useState("")
  const [recipientBankName, setRecipientBankName] = useState("")
  const [recipientAccountNumber, setRecipientAccountNumber] = useState("")
  const [recipientAccountName, setRecipientAccountName] = useState("")
  const [recipientMobileNumber, setRecipientMobileNumber] = useState("")
  const [recipientMobileName, setRecipientMobileName] = useState("")

  const filteredBanks =
    selectedCountry !== "all" ? africanBanks.filter((bank) => bank.countries.includes(selectedCountry)) : africanBanks

  const africanCountries = [
    { name: "Nigeria", currency: "NGN", symbol: "₦" },
    { name: "South Africa", currency: "ZAR", symbol: "R" },
    { name: "Kenya", currency: "KES", symbol: "KSh" },
    { name: "Ghana", currency: "GHS", symbol: "GH₵" },
    { name: "Egypt", currency: "EGP", symbol: "E£" },
    { name: "Morocco", currency: "MAD", symbol: "DH" },
    { name: "Ethiopia", currency: "ETB", symbol: "Br" },
    { name: "Tanzania", currency: "TZS", symbol: "TSh" },
    { name: "Uganda", currency: "UGX", symbol: "USh" },
    { name: "Senegal", currency: "XOF", symbol: "CFA" },
    { name: "Côte d'Ivoire", currency: "XOF", symbol: "CFA" },
    { name: "Cameroon", currency: "XAF", symbol: "FCFA" },
    { name: "Rwanda", currency: "RWF", symbol: "FRw" },
    { name: "Zambia", currency: "ZMW", symbol: "ZK" },
    { name: "Botswana", currency: "BWP", symbol: "P" },
    { name: "Benin", currency: "XOF", symbol: "CFA" },
    { name: "Togo", currency: "XOF", symbol: "CFA" },
  ]

  const currencies = [
    { code: "pi", name: "Pi Network", symbol: "π", rate: 314159 },
    { code: "usd", name: "US Dollar", symbol: "$", rate: 1 },
    { code: "eur", name: "Euro", symbol: "€", rate: 0.92 },
  ]

  // Exchange rates for Pi to local currencies (approximate)
  const piExchangeRates: any = {
    NGN: 500000, // 1 Pi = 500,000 NGN
    ZAR: 3000, // 1 Pi = 3,000 ZAR
    KES: 20000, // 1 Pi = 20,000 KES
    GHS: 2500, // 1 Pi = 2,500 GHS
    EGP: 6000, // 1 Pi = 6,000 EGP
    MAD: 1600, // 1 Pi = 1,600 MAD
    ETB: 8000, // 1 Pi = 8,000 ETB
    TZS: 40000, // 1 Pi = 40,000 TZS
    UGX: 60000, // 1 Pi = 60,000 UGX
    XOF: 950000, // 1 Pi = 950,000 XOF (Benin, Togo, Senegal, Côte d'Ivoire)
    XAF: 950000, // 1 Pi = 950,000 XAF (Cameroon)
    RWF: 180000, // 1 Pi = 180,000 RWF
    ZMW: 4000, // 1 Pi = 4,000 ZMW
    BWP: 2200, // 1 Pi = 2,200 BWP
  }

  const mobileMoneyProviders: any = {
    Nigeria: ["MTN MoMo", "Airtel Money", "9mobile Money"],
    "South Africa": ["Vodacom M-Pesa", "MTN MoMo", "Capitec Pay"],
    Kenya: ["M-Pesa Safaricom", "Airtel Money", "T-Kash"],
    Ghana: ["MTN Mobile Money", "Vodafone Cash", "AirtelTigo Money"],
    Egypt: ["Vodafone Cash", "Orange Money", "Etisalat Cash"],
    Tanzania: ["M-Pesa Vodacom", "Tigo Pesa", "Airtel Money"],
    Uganda: ["MTN Mobile Money", "Airtel Money"],
    Benin: ["MTN Mobile Money", "Moov Money"],
    Togo: ["Togocom Money", "Moov Money"],
    Senegal: ["Orange Money", "Free Money", "Wave"],
    "Côte d'Ivoire": ["Orange Money", "MTN Mobile Money", "Moov Money"],
  }

  const billProvidersByCountry: any = {
    Nigeria: {
      electricity: ["AEDC", "EKEDC", "IKEDC", "IBEDC", "PHED", "KEDCO", "JED", "BEDC"],
      water: ["Lagos Water Corporation", "Abuja Water Board", "Kano Water Board"],
      airtime: ["MTN", "Airtel", "Glo", "9mobile"],
      internet: ["MTN", "Airtel", "Glo", "9mobile", "Smile", "Spectranet"],
      tv: ["DStv", "GOtv", "StarTimes", "ShowMax"],
      education: ["University of Lagos", "Covenant University", "UNILAG", "OAU", "UI"],
      rent: ["Landlord Payment", "Property Manager", "Estate Agent"],
      domestic: ["House Help", "Security Guard", "Nanny", "Cook", "Driver"],
    },
    "South Africa": {
      electricity: ["Eskom", "City Power", "City of Cape Town Electricity"],
      water: ["Johannesburg Water", "Cape Town Water", "Rand Water"],
      airtime: ["Vodacom", "MTN", "Cell C", "Telkom Mobile"],
      internet: ["Vodacom", "MTN", "Telkom", "Rain", "Afrihost"],
      tv: ["DStv", "StarSat", "OpenView", "Netflix"],
      education: ["University of Cape Town", "Wits University", "Stellenbosch University"],
      rent: ["Landlord Payment", "Property Manager", "Estate Agent"],
      domestic: ["Domestic Worker", "Security Guard", "Nanny", "Gardener"],
    },
    Kenya: {
      electricity: ["KPLC - Kenya Power", "REA"],
      water: ["Nairobi City Water", "Mombasa Water", "Kisumu Water"],
      airtime: ["Safaricom", "Airtel", "Telkom Kenya", "Faiba"],
      internet: ["Safaricom", "Airtel", "Telkom Kenya", "Zuku", "Faiba"],
      tv: ["DStv", "GOtv", "StarTimes", "Azam TV"],
      education: ["University of Nairobi", "Kenyatta University", "Strathmore University"],
      rent: ["Landlord Payment", "Property Manager", "Caretaker"],
      domestic: ["House Help", "Watchman", "Nanny", "Shamba Boy"],
    },
    Ghana: {
      electricity: ["ECG - Electricity Company of Ghana", "NEDCo"],
      water: ["Ghana Water Company", "Accra Water", "Kumasi Water"],
      airtime: ["MTN Ghana", "Vodafone Ghana", "AirtelTigo"],
      internet: ["MTN Ghana", "Vodafone Ghana", "AirtelTigo", "Surfline"],
      tv: ["DStv", "GOtv", "StarTimes"],
      education: ["University of Ghana", "KNUST", "Ashesi University"],
    },
    Egypt: {
      electricity: ["Egyptian Electricity", "North Cairo Electricity"],
      water: ["Cairo Water", "Alexandria Water"],
      airtime: ["Orange Egypt", "Vodafone Egypt", "Etisalat Egypt", "WE"],
      internet: ["Orange Egypt", "Vodafone Egypt", "Etisalat Egypt", "WE", "Noor"],
      tv: ["OSN", "beIN Sports", "Nilesat"],
      education: ["Cairo University", "American University in Cairo", "Alexandria University"],
    },
    Benin: {
      electricity: ["SBEE - Société Béninoise d'Energie Electrique"],
      water: ["SONEB - Société Nationale des Eaux du Bénin"],
      airtime: ["MTN Benin", "Moov Benin", "Libercom"],
      internet: ["MTN Benin", "Moov Benin", "Libercom", "Isocel"],
      tv: ["Canal+", "StarTimes", "TNT Benin"],
      education: ["Université d'Abomey-Calavi", "Université de Parakou", "ESMT Benin"],
    },
    Togo: {
      electricity: ["CEET - Compagnie Energie Electrique du Togo"],
      water: ["TdE - Togolaise des Eaux"],
      airtime: ["Togocom", "Moov Togo"],
      internet: ["Togocom", "Moov Togo", "GVA Togo"],
      tv: ["Canal+", "StarTimes", "TVT"],
      education: ["Université de Lomé", "Université de Kara", "ESTBA"],
    },
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
        // Simulate IBAN extraction
        const mockIban = "FR76 3000 6000 0112 3456 7890 189"
        setIban(mockIban)
        alert(`IBAN Detected!\n\n${mockIban}\n\nPlease verify the details before continuing.`)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleIbanUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedIbanImage(reader.result as string)
        // Simulate IBAN extraction from school document
        const mockSchoolIban = "FR76 3000 6000 0112 3456 7890 189"
        setSchoolIban(mockSchoolIban)
        alert(`School IBAN Detected!\n\n${mockSchoolIban}\n\nPlease verify the school details before continuing.`)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLinkBank = () => {
    setShowAddForm(true)
    setLinkStep('select')
    setSelectedBank("")
    setAccountName("")
    setAccountNumber("")
    setIban("")
    setOtp("")
    setUploadedImage(null)
  }

  const handleSelectBank = () => {
    if (!selectedBank) {
      alert("Please select a bank")
      return
    }
    setLinkStep('details')
  }

  const handleSubmitDetails = () => {
    if (!accountName || !accountNumber) {
      alert("Please fill in all required fields")
      return
    }
    // Simulate sending OTP
    setLinkStep('otp')
    alert(`Verification Code Sent!\n\nA 6-digit code has been sent to your phone number ending in ****${Math.floor(1000 + Math.random() * 9000)}\n\nPlease enter the code to verify your account.`)
  }

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit code")
      return
    }
    setLinkStep('success')
    setTimeout(() => {
      setShowAddForm(false)
      setLinkStep('select')
      alert(`Bank Account Linked Successfully!\n\n${selectedBank}\nAccount: ${accountNumber}\nName: ${accountName}\n\nYou can now deposit and withdraw funds instantly!`)
    }, 2000)
  }

  const handleOpenBillPayment = (category: any) => {
    setSelectedBillType(category)
    setBillProvider("")
    setBillAmount("")
    setBillAccountNumber("")
    setBillCountry("Nigeria")
    setBillCurrency("pi")
    setPaymentMethod("pi")
    setSelectedBankForPayment("")
    setMobileMoneyProvider("")
    setMobileMoneyNumber("")
    setSchoolIban("")
    setSchoolName("")
    setStudentName("")
    setUploadedIbanImage(null)
    setShowBillPayment(true)
  }

  // Calculate conversions
  const calculateConversions = () => {
    if (!billAmount) return null
    const piAmount = parseFloat(billAmount)
    const country = africanCountries.find(c => c.name === billCountry)
    if (!country) return null
    
    const localRate = piExchangeRates[country.currency]
    const localAmount = piAmount * localRate
    const usdAmount = piAmount * 314159 // Pi GCV rate: 1 Pi = $314,159
    
    return {
      pi: piAmount,
      local: localAmount,
      localSymbol: country.symbol,
      localCurrency: country.currency,
      usd: usdAmount
    }
  }

  const handleCreateRecurringTransfer = () => {
    if (!recurringBank || !recurringAmount || !recurringStartDate) {
      alert("Please fill in all required fields")
      return
    }

    const bank = linkedAccounts.find(b => b.id.toString() === recurringBank)
    if (!bank) return

    const frequencyText = recurringFrequency === "daily" ? "Daily" : recurringFrequency === "weekly" ? "Weekly" : "Monthly"
    
    alert(`Recurring Transfer Created!\n\nFrom: ${bank.bankName} ${bank.accountNumber}\nTo: UBAP Wallet\nAmount: ${bank.currency}${recurringAmount}\nFrequency: ${frequencyText}\nStart Date: ${new Date(recurringStartDate).toLocaleDateString()}\n\nTransaction ID: ${Math.random().toString(36).substring(7).toUpperCase()}\n\nYour automatic transfer is now active!`)
    
    setShowRecurringTransfer(false)
    setRecurringBank("")
    setRecurringAmount("")
    setRecurringFrequency("monthly")
    setRecurringStartDate("")
  }

  const handlePayBill = () => {
    const conversions = calculateConversions()
    const transactionId = Math.random().toString(36).substring(7).toUpperCase()
    
    let paymentDetails = ""
    
    if (selectedBillType?.label === "Education") {
      paymentDetails = `✅ School Fee Payment Successful!\n\nSchool: ${schoolName}\nStudent: ${studentName}\nIBAN: ${schoolIban}\n`
    } else {
      paymentDetails = `✅ Bill Payment Successful!\n\n${selectedBillType?.label}: ${billProvider}\nAccount: ${billAccountNumber}\n`
    }

    if (paymentMethod === "pi") {
      paymentDetails += `\nPaid: π ${billAmount}\nLocal Value: ${conversions?.localSymbol}${conversions?.local.toLocaleString()}\nUSD Value: $${conversions?.usd.toFixed(2)}`
    } else if (paymentMethod === "bank") {
      const bank = linkedAccounts.find(b => b.id.toString() === selectedBankForPayment)
      paymentDetails += `\nPaid via: ${bank?.bankName}\nAmount: ${conversions?.localSymbol}${billAmount}\nPi Equivalent: π ${conversions?.pi.toFixed(4)}`
    } else if (paymentMethod === "mobile") {
      paymentDetails += `\nPaid via: ${mobileMoneyProvider}\nNumber: ${mobileMoneyNumber}\nAmount: ${conversions?.localSymbol}${billAmount}\nPi Equivalent: π ${conversions?.pi.toFixed(4)}`
    }

    paymentDetails += `\n\nTransaction ID: ${transactionId}\nCountry: ${billCountry}\n\n⚡ Payment confirmed!\nYour service has been activated.`
    
    alert(paymentDetails)
    setShowBillPayment(false)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="max-w-lg mx-auto">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-primary-foreground mb-4 hover:bg-primary-foreground/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Bank Connections</h1>
          <p className="text-sm opacity-90 mt-1">Link African banks for instant transfers</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="transfer">Transfer</TabsTrigger>
            <TabsTrigger value="bills">Bills</TabsTrigger>
          </TabsList>

          {/* Accounts Tab */}
          <TabsContent value="accounts" className="space-y-6 mt-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="lg" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
                <Link href="/banks/deposit">
                  <ArrowDownToLine className="h-6 w-6 text-emerald-600" />
                  <span>Deposit</span>
                  <span className="text-xs text-muted-foreground">0-15 min</span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
                <Link href="/banks/withdraw">
                  <ArrowUpFromLine className="h-6 w-6 text-amber-600" />
                  <span>Withdraw</span>
                  <span className="text-xs text-muted-foreground">30 min - 24h</span>
                </Link>
              </Button>
            </div>

            {/* Linked Accounts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Your Bank Accounts</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowBalances(!showBalances)}
                    className="h-8 w-8"
                  >
                    {showBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {linkedAccounts.map((account) => (
                  <div key={account.id} className="p-4 rounded-lg bg-muted/50 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center text-2xl">
                          🏦
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{account.bankName}</p>
                            {account.verified && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{account.accountName}</p>
                          <p className="text-xs text-muted-foreground font-mono mt-1">{account.accountNumber}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {account.currency}
                            </Badge>
                            {showBalances && <span className="text-sm font-semibold">{account.balance}</span>}
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive"
                        onClick={() => {
                          if (confirm(`Unlink ${account.bankName}?\n\nThis will remove the bank account from your UBAP wallet.`)) {
                            alert(`${account.bankName} has been successfully unlinked.`)
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent"
                        asChild
                      >
                        <Link href="/banks/deposit">
                          <ArrowDownToLine className="h-4 w-4 mr-2" />
                          Deposit
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent"
                        asChild
                      >
                        <Link href="/banks/withdraw">
                          <ArrowUpFromLine className="h-4 w-4 mr-2" />
                          Withdraw
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}

                <Button 
                  variant="outline" 
                  className="w-full bg-transparent" 
                  onClick={handleLinkBank}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Link New Bank Account
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Supported Banks</CardTitle>
                <div className="mt-3">
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="Nigeria">🇳🇬 Nigeria</SelectItem>
                      <SelectItem value="Ghana">🇬🇭 Ghana</SelectItem>
                      <SelectItem value="Senegal">🇸🇳 Senegal</SelectItem>
                      <SelectItem value="Côte d'Ivoire">🇨🇮 Côte d'Ivoire</SelectItem>
                      <SelectItem value="Mali">🇲🇱 Mali</SelectItem>
                      <SelectItem value="Burkina Faso">🇧🇫 Burkina Faso</SelectItem>
                      <SelectItem value="Benin">🇧🇯 Benin</SelectItem>
                      <SelectItem value="Togo">🇹🇬 Togo</SelectItem>
                      <SelectItem value="Niger">🇳🇪 Niger</SelectItem>
                      <SelectItem value="Kenya">🇰🇪 Kenya</SelectItem>
                      <SelectItem value="South Africa">🇿🇦 South Africa</SelectItem>
                      <SelectItem value="Ethiopia">🇪🇹 Ethiopia</SelectItem>
                      <SelectItem value="Morocco">🇲🇦 Morocco</SelectItem>
                      <SelectItem value="Uganda">🇺🇬 Uganda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredBanks.map((bank, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{bank.logo}</span>
                        <div>
                          <p className="font-semibold text-sm">{bank.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {bank.countries.length > 1 ? `${bank.countries.length} countries` : bank.country}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={bank.status === "connected" ? "default" : "secondary"}
                        className={bank.status === "connected" ? "bg-emerald-600" : ""}
                      >
                        {bank.status === "connected" ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Connected
                          </>
                        ) : (
                          "Available"
                        )}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Deposit: {bank.depositTime}</span>
                      <span>Withdraw: {bank.withdrawalTime}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfer" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recurring Transfers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Set up automatic transfers from your bank to UBAP wallet
                </p>

                <div className="space-y-3">
                  {[
                    {
                      bank: "FirstBank Nigeria",
                      amount: "₦50,000",
                      frequency: "Weekly",
                      nextDate: "Dec 18",
                      active: true,
                    },
                    { bank: "Standard Bank", amount: "R2,500", frequency: "Monthly", nextDate: "Jan 1", active: true },
                  ].map((recurring, i) => (
                    <div key={i} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3 flex-1">
                          <Repeat className="h-5 w-5 text-emerald-600" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{recurring.bank}</p>
                            <p className="text-xs text-muted-foreground">
                              {recurring.frequency} • {recurring.amount}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={recurring.active ? "default" : "secondary"} className="bg-emerald-600">
                            Active
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => {
                              alert(`Manage Recurring Transfer\n\n${recurring.bank}\n${recurring.frequency} • ${recurring.amount}\n\nOptions:\n✓ Pause transfer\n✓ Edit amount\n✓ Change frequency\n✓ Cancel transfer\n\nSelect an option to proceed.`)
                            }}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Next transfer: {recurring.nextDate}</p>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setShowRecurringTransfer(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Recurring Transfer
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transfer History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    type: "Deposit",
                    bank: "FirstBank",
                    amount: "+ ₦50,000",
                    date: "Today, 2:30 PM",
                    status: "Completed",
                  },
                  {
                    type: "Withdrawal",
                    bank: "Standard Bank",
                    amount: "- R2,500",
                    date: "Yesterday",
                    status: "Completed",
                  },
                  { type: "Deposit", bank: "Equity Bank", amount: "+ KSh10,000", date: "Dec 10", status: "Completed" },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          tx.type === "Deposit" ? "bg-emerald-100" : "bg-amber-100"
                        }`}
                      >
                        {tx.type === "Deposit" ? (
                          <ArrowDownToLine className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <ArrowUpFromLine className="h-5 w-5 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">
                          {tx.type} • {tx.bank}
                        </p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{tx.amount}</p>
                      <Badge variant="secondary" className="text-xs">
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bills" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pay Bills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Pay utilities, buy airtime, and manage subscriptions directly from UBAP
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: "⚡", label: "Electricity", color: "bg-yellow-100", providers: ["IKEDC", "EKEDC", "EKEDP", "CIE", "SONABEL"] },
                    { icon: "💧", label: "Water", color: "bg-blue-100", providers: ["Lagos Water", "SODECI", "ONEA"] },
                    { icon: "📱", label: "Airtime", color: "bg-purple-100", providers: ["MTN", "Airtel", "Glo", "Orange", "Moov"] },
                    { icon: "📡", label: "Internet", color: "bg-green-100", providers: ["MTN", "Airtel", "Orange", "Glo"] },
                    { icon: "📺", label: "Cable TV", color: "bg-red-100", providers: ["DStv", "GOtv", "StarTimes", "Canal+"] },
                    { icon: "🎓", label: "Education", color: "bg-indigo-100", providers: ["School Fees", "University Fees"] },
                    { icon: "🏠", label: "Rent", color: "bg-orange-100", providers: ["Landlord Payment"] },
                    { icon: "👤", label: "Domestic Salary", color: "bg-pink-100", providers: ["House Staff", "Guard", "Nanny"] },
                  ].map((category, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      className="h-auto py-4 flex-col gap-2 bg-white hover:bg-primary/5 hover:border-primary transition-all cursor-pointer active:scale-95"
                      onClick={() => handleOpenBillPayment(category)}
                    >
                      <div
                        className={`h-12 w-12 rounded-full ${category.color} flex items-center justify-center text-2xl`}
                      >
                        {category.icon}
                      </div>
                      <span className="text-xs font-medium">{category.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Bill Payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { type: "Electricity", provider: "IKEDC", amount: "₦15,000", date: "Dec 12", status: "Paid" },
                  { type: "Airtime", provider: "MTN", amount: "₦5,000", date: "Dec 10", status: "Paid" },
                  { type: "Cable TV", provider: "DStv", amount: "₦8,500", date: "Dec 5", status: "Paid" },
                ].map((bill, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">
                          {bill.type} • {bill.provider}
                        </p>
                        <p className="text-xs text-muted-foreground">{bill.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold text-sm">{bill.amount}</p>
                        <Badge variant="secondary" className="text-xs">
                          {bill.status}
                        </Badge>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-transparent"
                        onClick={() => {
                          const piAmount = (parseFloat(bill.amount.replace(/[^0-9.]/g, '')) / 314159).toFixed(8)
                          alert(`✅ Repeat Payment Successful!\n\n${bill.type}: ${bill.provider}\nAmount: ${bill.amount}\nPaid with: ${piAmount} Pi\n\nTransaction ID: ${Math.random().toString(36).substring(7).toUpperCase()}\n\n⚡ Payment confirmed!\nYour service has been renewed.`)
                        }}
                      >
                        Pay Again
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />

      {/* Link Bank Account Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Link Bank Account</DialogTitle>
          </DialogHeader>

          {linkStep === 'select' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Your Bank</Label>
                <Select value={selectedBank} onValueChange={setSelectedBank}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {africanBanks.map((bank, i) => (
                      <SelectItem key={i} value={bank.name}>
                        {bank.logo} {bank.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={handleSelectBank}>
                Continue
              </Button>
            </div>
          )}

          {linkStep === 'details' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Account Holder Name</Label>
                <Input 
                  placeholder="John Doe" 
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Account Number</Label>
                <Input 
                  placeholder="0123456789" 
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>IBAN / RIB (Optional)</Label>
                <Input 
                  placeholder="FR76 3000 6000 0112 3456 7890 189" 
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Bank Statement or RIB</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="bg-transparent"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    From Gallery
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-transparent"
                    onClick={() => {
                      fileInputRef.current?.click()
                    }}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleFileUpload}
                />
                {uploadedImage && (
                  <div className="relative mt-2">
                    <img src={uploadedImage || "/placeholder.svg"} alt="Uploaded" className="w-full h-32 object-cover rounded-lg" />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => {
                        setUploadedImage(null)
                        setIban("")
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                We'll send a verification code to your registered phone number
              </p>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => setLinkStep('select')} className="bg-transparent">
                  Back
                </Button>
                <Button onClick={handleSubmitDetails}>
                  Send OTP
                </Button>
              </div>
            </div>
          )}

          {linkStep === 'otp' && (
            <div className="space-y-4">
              <div className="text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code sent to your phone
                </p>
              </div>

              <div className="space-y-2">
                <Label>Verification Code</Label>
                <Input 
                  placeholder="000000" 
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="text-center text-2xl tracking-widest"
                />
              </div>

              <Button 
                className="w-full" 
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6}
              >
                Verify & Link Account
              </Button>

              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => {
                  alert("Verification code resent!")
                }}
              >
                Resend Code
              </Button>
            </div>
          )}

          {linkStep === 'success' && (
            <div className="text-center py-8">
              <CheckCircle2 className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Account Linked!</h3>
              <p className="text-muted-foreground">
                Your bank account has been successfully linked to UBAP
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Recurring Transfer Dialog */}
      <Dialog open={showRecurringTransfer} onOpenChange={setShowRecurringTransfer}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Recurring Transfer</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Bank Account</Label>
              <Select value={recurringBank} onValueChange={setRecurringBank}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose bank account" />
                </SelectTrigger>
                <SelectContent>
                  {linkedAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id.toString()}>
                      {account.bankName} - {account.accountNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Transfer Amount</Label>
              <Input 
                type="number"
                placeholder="Enter amount"
                value={recurringAmount}
                onChange={(e) => setRecurringAmount(e.target.value)}
              />
              {recurringAmount && recurringBank && (
                <p className="text-xs text-muted-foreground">
                  {linkedAccounts.find(a => a.id.toString() === recurringBank)?.currency}{recurringAmount} will be transferred to your UBAP wallet
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select value={recurringFrequency} onValueChange={setRecurringFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input 
                type="date"
                value={recurringStartDate}
                onChange={(e) => setRecurringStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {recurringBank && recurringAmount && recurringStartDate && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Summary</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>From:</span>
                    <span className="font-medium text-foreground">
                      {linkedAccounts.find(a => a.id.toString() === recurringBank)?.bankName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-medium text-foreground">
                      {linkedAccounts.find(a => a.id.toString() === recurringBank)?.currency}{recurringAmount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frequency:</span>
                    <span className="font-medium text-foreground capitalize">{recurringFrequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Starts:</span>
                    <span className="font-medium text-foreground">
                      {new Date(recurringStartDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button 
              className="w-full" 
              onClick={handleCreateRecurringTransfer}
              disabled={!recurringBank || !recurringAmount || !recurringStartDate}
            >
              <Repeat className="h-4 w-4 mr-2" />
              Create Recurring Transfer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bill Payment Dialog */}
      <Dialog open={showBillPayment} onOpenChange={setShowBillPayment}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pay {selectedBillType?.label}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Country</Label>
              <Select value={billCountry} onValueChange={setBillCountry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {africanCountries.map((country) => (
                    <SelectItem key={country.name} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={paymentMethod === "pi" ? "default" : "outline"}
                  className={paymentMethod !== "pi" ? "bg-transparent" : ""}
                  onClick={() => setPaymentMethod("pi")}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">π</span>
                    <span className="text-xs">Pi Direct</span>
                  </div>
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === "bank" ? "default" : "outline"}
                  className={paymentMethod !== "bank" ? "bg-transparent" : ""}
                  onClick={() => setPaymentMethod("bank")}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">🏦</span>
                    <span className="text-xs">Bank</span>
                  </div>
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === "mobile" ? "default" : "outline"}
                  className={paymentMethod !== "mobile" ? "bg-transparent" : ""}
                  onClick={() => setPaymentMethod("mobile")}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">📱</span>
                    <span className="text-xs">Mobile</span>
                  </div>
                </Button>
              </div>
            </div>

            {paymentMethod === "bank" && (
              <div className="space-y-2">
                <Label>Select Bank Account</Label>
                <Select value={selectedBankForPayment} onValueChange={setSelectedBankForPayment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {linkedAccounts.map((account) => (
                      <SelectItem key={account.id} value={account.id.toString()}>
                        {account.bankName} - {account.accountNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {paymentMethod === "mobile" && (
              <>
                <div className="space-y-2">
                  <Label>Mobile Money Provider</Label>
                  <Select value={mobileMoneyProvider} onValueChange={setMobileMoneyProvider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {(mobileMoneyProviders[billCountry] || []).map((provider: string) => (
                        <SelectItem key={provider} value={provider}>
                          {provider}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Mobile Money Number</Label>
                  <Input 
                    placeholder="+XXX XXX XXX XXXX"
                    value={mobileMoneyNumber}
                    onChange={(e) => setMobileMoneyNumber(e.target.value)}
                  />
                </div>
              </>
            )}

            {selectedBillType?.label === "Rent" ? (
              <>
                <div className="space-y-2">
                  <Label>Landlord/Property Manager Name *</Label>
                  <Input 
                    placeholder="Enter landlord full name"
                    value={billProvider}
                    onChange={(e) => setBillProvider(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Property Address *</Label>
                  <Input 
                    placeholder="Full property address"
                    value={billAccountNumber}
                    onChange={(e) => setBillAccountNumber(e.target.value)}
                  />
                </div>



                <div className="space-y-2">
                  <Label>Rent Period *</Label>
                  <Select value={recurringFrequency} onValueChange={setRecurringFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly (3 months)</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : selectedBillType?.label === "Domestic Salary" ? (
              <>
                <div className="space-y-2">
                  <Label>Employee Name *</Label>
                  <Input 
                    placeholder="Full name of employee"
                    value={billProvider}
                    onChange={(e) => setBillProvider(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Position/Role *</Label>
                  <Select value={schoolIban} onValueChange={setSchoolIban}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="househelp">House Help</SelectItem>
                      <SelectItem value="guard">Security Guard</SelectItem>
                      <SelectItem value="nanny">Nanny</SelectItem>
                      <SelectItem value="cook">Cook</SelectItem>
                      <SelectItem value="driver">Driver</SelectItem>
                      <SelectItem value="gardener">Gardener</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>



                <div className="space-y-2">
                  <Label>ID/Reference Number</Label>
                  <Input 
                    placeholder="Employee ID or reference"
                    value={billAccountNumber}
                    onChange={(e) => setBillAccountNumber(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Payment Period *</Label>
                  <Select value={recurringFrequency} onValueChange={setRecurringFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : selectedBillType?.label === "Education" ? (
              <>
                <div className="space-y-2">
                  <Label>School/University Name *</Label>
                  <Input 
                    placeholder="Enter school name"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Student Name *</Label>
                  <Input 
                    placeholder="Enter student name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>School IBAN/Account Number *</Label>
                  <Input 
                    placeholder="Enter IBAN or paste from clipboard"
                    value={schoolIban}
                    onChange={(e) => setSchoolIban(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload School Bank Details (Optional)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="bg-transparent"
                      onClick={() => ibanFileInputRef.current?.click()}
                      type="button"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      From Gallery
                    </Button>
                    <Button 
                      variant="outline" 
                      className="bg-transparent"
                      onClick={() => ibanFileInputRef.current?.click()}
                      type="button"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                  <input 
                    ref={ibanFileInputRef}
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleIbanUpload}
                  />
                  {uploadedIbanImage && (
                    <div className="relative mt-2">
                      <img src={uploadedIbanImage || "/placeholder.svg"} alt="School IBAN" className="w-full h-32 object-cover rounded-lg" />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => {
                          setUploadedIbanImage(null)
                          setSchoolIban("")
                        }}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Select Provider</Label>
                  <Select value={billProvider} onValueChange={setBillProvider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {(billProvidersByCountry[billCountry]?.[selectedBillType?.label.toLowerCase().replace(" ", "")] || 
                        billProvidersByCountry["Nigeria"]?.[selectedBillType?.label.toLowerCase().replace(" ", "")] || 
                        selectedBillType?.providers || []).map((provider: string, idx: number) => (
                        <SelectItem key={idx} value={provider}>
                          {provider}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>
                    {selectedBillType?.label === "Electricity" ? "Meter Number" : 
                     selectedBillType?.label === "Water" ? "Account Number" :
                     selectedBillType?.label === "Airtime" ? "Phone Number" :
                     selectedBillType?.label === "Internet" ? "Account Number" :
                     selectedBillType?.label === "Cable TV" ? "Smart Card Number" :
                     "Account Number"}
                  </Label>
                  <Input 
                    placeholder={
                      selectedBillType?.label === "Electricity" ? "0123456789" : 
                      selectedBillType?.label === "Airtime" ? "+XXX XXX XXX XXXX" :
                      "Enter number"
                    }
                    value={billAccountNumber}
                    onChange={(e) => setBillAccountNumber(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Recipient Payment Information */}
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-4 space-y-3">
                <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100">
                  Informations de Paiement du Bénéficiaire
                </h4>
                
                {paymentMethod === "pi" && (
                  <div className="space-y-2">
                    <Label>Adresse Pi Wallet du Bénéficiaire *</Label>
                    <Input 
                      placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                      value={recipientPiAddress || ""}
                      onChange={(e) => setRecipientPiAddress(e.target.value)}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      L'adresse Pi du bénéficiaire où les fonds seront envoyés
                    </p>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <>
                    <div className="space-y-2">
                      <Label>Nom de la Banque du Bénéficiaire *</Label>
                      <Input 
                        placeholder="Ex: Ecobank, UBA, Standard Bank..."
                        value={recipientBankName || ""}
                        onChange={(e) => setRecipientBankName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Numéro de Compte Bancaire / IBAN *</Label>
                      <Input 
                        placeholder="Numéro de compte ou IBAN"
                        value={recipientAccountNumber || ""}
                        onChange={(e) => setRecipientAccountNumber(e.target.value)}
                        className="font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Nom du Titulaire du Compte *</Label>
                      <Input 
                        placeholder="Nom complet sur le compte"
                        value={recipientAccountName || ""}
                        onChange={(e) => setRecipientAccountName(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Les fonds seront transférés sur ce compte bancaire
                    </p>
                  </>
                )}

                {paymentMethod === "mobile" && (
                  <>
                    <div className="space-y-2">
                      <Label>Numéro Mobile Money du Bénéficiaire *</Label>
                      <Input 
                        placeholder="+XXX XXX XXX XXXX"
                        value={recipientMobileNumber || ""}
                        onChange={(e) => setRecipientMobileNumber(e.target.value)}
                        type="tel"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Nom du Titulaire Mobile Money *</Label>
                      <Input 
                        placeholder="Nom enregistré sur le compte"
                        value={recipientMobileName || ""}
                        onChange={(e) => setRecipientMobileName(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Les fonds seront envoyés sur ce numéro Mobile Money
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">
                  {paymentMethod === "pi" ? "Amount to Pay" : "Bill Amount"}
                </Label>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {paymentMethod === "pi" && <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">π Pi</span>}
                  {paymentMethod === "bank" && <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 font-medium">🏦 Bank</span>}
                  {paymentMethod === "mobile" && <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-600 font-medium">📱 Mobile</span>}
                </div>
              </div>

              {paymentMethod === "pi" ? (
                <>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl font-bold text-primary">π</span>
                    <Input 
                      type="number"
                      placeholder="0.0000"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      step="0.0001"
                      className="pl-10 text-lg font-semibold h-12 border-2 border-primary/30 focus:border-primary"
                    />
                  </div>
                  {billAmount && calculateConversions() && (
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-violet-500/5 animate-pulse" />
                      <div className="relative p-4 bg-gradient-to-br from-emerald-50/50 to-blue-50/50 dark:from-emerald-950/20 dark:to-blue-950/20 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
                            <span className="text-white text-sm">↔</span>
                          </div>
                          <p className="text-sm font-bold text-foreground">Instant Conversion</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="p-3 bg-white/60 dark:bg-black/20 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
                            <p className="text-[10px] text-muted-foreground mb-1">Local Currency</p>
                            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                              {calculateConversions()?.localSymbol}{calculateConversions()?.local.toLocaleString()}
                            </p>
                            <p className="text-[10px] text-muted-foreground">{calculateConversions()?.localCurrency}</p>
                          </div>
                          <div className="p-3 bg-white/60 dark:bg-black/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                            <p className="text-[10px] text-muted-foreground mb-1">USD Value</p>
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              ${calculateConversions()?.usd.toFixed(2)}
                            </p>
                            <p className="text-[10px] text-muted-foreground">US Dollar</p>
                          </div>
                        </div>

                        <div className="p-2 bg-gradient-to-r from-emerald-100/50 to-blue-100/50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-lg">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-muted-foreground">Exchange Rate:</span>
                            <span className="font-mono font-semibold text-foreground">
                              1π = {calculateConversions()?.localSymbol}{(calculateConversions()?.local / calculateConversions()?.pi).toLocaleString()} {calculateConversions()?.localCurrency}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-foreground">
                      {africanCountries.find(c => c.name === billCountry)?.symbol}
                    </span>
                    <Input 
                      type="number"
                      placeholder="0.00"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      step="0.01"
                      className="pl-10 text-lg font-semibold h-12 border-2 border-blue-500/30 focus:border-blue-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                      {africanCountries.find(c => c.name === billCountry)?.currency}
                    </span>
                  </div>
                  {billAmount && calculateConversions() && (
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
                      <div className="relative p-4 bg-gradient-to-br from-violet-50/50 to-purple-50/50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-xl border-2 border-violet-200 dark:border-violet-800">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-sm">π</span>
                          </div>
                          <p className="text-sm font-bold text-foreground">Pi Network Equivalent</p>
                        </div>
                        
                        <div className="p-4 bg-white/60 dark:bg-black/20 rounded-lg border border-violet-200/50 dark:border-violet-800/50 mb-3">
                          <p className="text-xs text-muted-foreground mb-2">You will be charged via {paymentMethod === "bank" ? "Bank Transfer" : "Mobile Money"}:</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                              π {calculateConversions()?.pi.toFixed(4)}
                            </span>
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-1">≈ ${calculateConversions()?.usd.toFixed(2)} USD</p>
                        </div>

                        <div className="p-2 bg-gradient-to-r from-violet-100/50 to-purple-100/50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-muted-foreground">Conversion Rate:</span>
                            <span className="font-mono font-semibold text-foreground">
                              1π = {calculateConversions()?.localSymbol}{(calculateConversions()?.local / calculateConversions()?.pi).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile Money PIN for authorization */}
            {paymentMethod === "mobile" && billAmount && (
              <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center">
                      <span className="text-white text-sm">🔒</span>
                    </div>
                    <h4 className="font-semibold text-sm text-orange-900 dark:text-orange-100">
                      Autorisation Mobile Money
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <Label>Entrez votre Code PIN Mobile Money *</Label>
                    <Input 
                      type="password"
                      placeholder="••••"
                      maxLength={4}
                      value={mobileMoneyPin || ""}
                      onChange={(e) => setMobileMoneyPin(e.target.value.replace(/\D/g, ''))}
                      className="text-center text-2xl tracking-widest font-bold"
                    />
                    <p className="text-xs text-orange-700 dark:text-orange-300">
                      Code à 4 chiffres pour autoriser le paiement depuis votre compte Mobile Money
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {((selectedBillType?.label !== "Education" && billProvider) || (selectedBillType?.label === "Education" && schoolName)) && billAmount && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Payment Summary</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>{selectedBillType?.label === "Education" ? "School:" : "Provider:"}</span>
                    <span className="font-medium text-foreground">
                      {selectedBillType?.label === "Education" ? schoolName : billProvider}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Country:</span>
                    <span className="font-medium text-foreground">{billCountry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee:</span>
                    <span className="font-medium text-foreground">
                      {billCurrency === "pi" ? "0.001 π" : "Included"}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-1 mt-1">
                    <span>Total:</span>
                    <span className="font-bold text-foreground">
                      {billCurrency === "pi" 
                        ? `${parseFloat(billAmount).toFixed(4)} π`
                        : billCurrency === "local"
                        ? `${africanCountries.find(c => c.name === billCountry)?.symbol}${parseFloat(billAmount).toLocaleString()}`
                        : `${currencies.find(c => c.code === billCurrency)?.symbol}${parseFloat(billAmount).toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button 
              className="w-full" 
              onClick={handlePayBill}
              disabled={
                !billAmount ||
                (paymentMethod === "pi" && !recipientPiAddress) ||
                (paymentMethod === "bank" && (!recipientBankName || !recipientAccountNumber || !recipientAccountName)) ||
                (paymentMethod === "mobile" && (!recipientMobileNumber || !recipientMobileName || !mobileMoneyPin || mobileMoneyPin.length !== 4)) ||
                (selectedBillType?.label === "Education" 
                  ? !schoolName || !studentName || !schoolIban
                  : !billProvider || !billAmount || !billAccountNumber) ||
                (paymentMethod === "bank" && !selectedBankForPayment) ||
                (paymentMethod === "mobile" && (!mobileMoneyProvider || !mobileMoneyNumber))
              }
            >
              <Zap className="h-4 w-4 mr-2" />
              {paymentMethod === "pi" 
                ? "Pay with Pi Network" 
                : paymentMethod === "bank" 
                ? "Pay via Bank Transfer" 
                : "Pay via Mobile Money"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
