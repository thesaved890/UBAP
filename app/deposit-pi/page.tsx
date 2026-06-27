"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { usePiAuth } from "@/contexts/pi-auth-context"
import { PiBalanceStore } from "@/lib/pi-balance-store"
import { initiatePiPayment } from "@/lib/pi-network-sdk"
import {
  ArrowLeft,
  Shield,
  Wallet,
  CheckCircle2,
  ArrowDownToLine,
  Clock,
  AlertCircle,
  History,
  X,
  Info,
  Smartphone,
  RefreshCw,
  Zap,
  Copy,
  ChevronRight,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"

// ─── Constants ────────────────────────────────────────────────────────────────
type Step = "input" | "waiting_wallet" | "processing" | "success" | "error"

const QUICK_AMOUNTS = [5, 10, 25, 50, 100, 500]
const FEE_RATE      = 0.001   // 0.1% UBAP processing fee
const MIN_DEPOSIT   = 1       // minimum 1 Pi

const pause = (ms: number) => new Promise(r => setTimeout(r, ms))

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DepositPiPage() {
  const { userData, isSandbox } = usePiAuth()

  const [amount, setAmount]       = useState("")
  const [step, setStep]           = useState<Step>("input")
  const [txid, setTxid]           = useState("")
  const [newBalance, setNewBalance] = useState(0)
  const [errorMsg, setErrorMsg]   = useState("")
  const [toast, setToast]         = useState<{ msg: string; ok: boolean } | null>(null)
  const [inPiBrowser, setInPiBrowser] = useState(false)

  useEffect(() => {
    setInPiBrowser(typeof (window as any).Pi !== "undefined")
  }, [])

  const parsed      = parseFloat(amount) || 0
  const fee         = +(parsed * FEE_RATE).toFixed(6)
  const willReceive = +(parsed - fee).toFixed(6)

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 4500)
  }

  const reset = () => {
    setStep("input")
    setAmount("")
    setTxid("")
    setErrorMsg("")
  }

  // ── DEPOSIT HANDLER ───────────────────────────────────────────────────────
  const handleDeposit = async () => {
    const val = parseFloat(amount)
    if (!amount || isNaN(val) || val < MIN_DEPOSIT) {
      showToast(`Montant minimum: π ${MIN_DEPOSIT}`, false)
      return
    }

    if (!inPiBrowser) {
      showToast(
        "Ouvrez UBAP dans Pi Browser sur votre telephone pour effectuer un vrai depot Pi.",
        false
      )
      return
    }

    // ── REAL PI BROWSER ───────────────────────────────────────────────────
    setStep("waiting_wallet")
    try {
      const result = await initiatePiPayment(
        val,
        `Depot UBAP — ${userData?.username ?? "Pioneer"} — ${new Date().toLocaleDateString("fr-FR")}`,
        {
          type: "deposit",
          userId: userData?.id ?? "unknown",
          username: userData?.username ?? "unknown",
          ubapVersion: "1.0",
          requestedAt: new Date().toISOString(),
        }
      )

      setStep("processing")
      await pause(800)

      const { newBalance: bal } = PiBalanceStore.recordDeposit({
        amount: val,
        fee,
        txid: result.txid,
        memo: `Depot UBAP — ${userData?.username ?? "Pioneer"}`,
        isSandbox,
      })
      setTxid(result.txid)
      setNewBalance(bal)
      setStep("success")

    } catch (err: any) {
      const msg: string = err?.message ?? ""

      if (msg.startsWith("CANCELLED:")) {
        setStep("input")
        showToast("Depot annule.", false)
        return
      }

      if (msg.startsWith("WALLET_NOT_SETUP")) {
        setErrorMsg(
          "Le wallet de l'application UBAP n'est pas encore configure sur Pi Developer Portal.\n\n" +
          "Pour l'activer:\n" +
          "1. Ouvrez https://develop.pi dans Pi Browser\n" +
          "2. Selectionnez votre app UBAP\n" +
          "3. Menu gauche → App Wallet → Setup Wallet\n" +
          "4. Copiez votre API Key et ajoutez-la dans Vercel → Settings → Vars → PI_API_KEY"
        )
      } else if (msg.startsWith("SCOPE_ERROR") || msg.includes("scope")) {
        setErrorMsg(
          "Autorisation de paiement manquante.\n\nFermez et rouvrez UBAP dans Pi Browser pour reautoriser les paiements."
        )
      } else if (msg.startsWith("NO_PI_BROWSER")) {
        setErrorMsg("Ouvrez UBAP dans Pi Browser sur votre telephone pour effectuer un vrai depot Pi.")
      } else {
        setErrorMsg(msg || "Une erreur inattendue s'est produite. Veuillez reessayer.")
      }
      setStep("error")
    }
  }

  // ─── WAITING FOR WALLET CONFIRMATION ────────────────────────────────────
  if (step === "waiting_wallet") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-6">
        <div className="h-24 w-24 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
          <Wallet className="h-12 w-12 text-amber-600 animate-pulse" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold">
            {inPiBrowser ? "Confirmez dans votre Pi Wallet" : "Traitement en cours..."}
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs text-center">
            {inPiBrowser
              ? "Pi Wallet est ouvert. Verifiez le montant et appuyez sur Confirmer."
              : "Ouverture du flux de depot Pi..."}
          </p>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2 pt-2">
            <Clock className="h-3.5 w-3.5" />
            En attente de votre confirmation...
          </p>
        </div>
        <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 px-6 py-4 text-center space-y-1">
          <p className="text-sm text-muted-foreground">Montant a confirmer</p>
          <p className="text-3xl font-bold text-amber-600">π {parsed}</p>
          <p className="text-xs text-muted-foreground">Vous recevrez π {willReceive} apres frais</p>
        </div>
      </div>
    )
  }

  // ─── PROCESSING ──────────────────────────────────────────────────────────
  if (step === "processing") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-6">
        <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
          <RefreshCw className="h-12 w-12 text-green-600 animate-spin" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold">Confirmation blockchain...</h2>
          <p className="text-sm text-muted-foreground max-w-xs text-center">
            La blockchain Pi enregistre votre transaction. Cela prend quelques secondes.
          </p>
        </div>
        <div className="w-full max-w-xs bg-muted rounded-full h-2 overflow-hidden">
          <div className="h-full bg-green-500 animate-[expand_2s_ease-in-out_forwards]" style={{ width: "100%", animation: "pulse 1s infinite" }} />
        </div>
      </div>
    )
  }

  // ─── SUCCESS ─────────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-5 p-6 pb-28">
        {/* Icon */}
        <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-green-600">Depot reussi!</h2>
          <p className="text-4xl font-bold">π {willReceive}</p>
          <p className="text-sm text-muted-foreground">credites sur votre compte UBAP</p>
        </div>

        {/* Summary card */}
        <Card className="w-full max-w-sm">
          <CardContent className="pt-4 pb-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Montant envoye</span>
              <span className="font-medium">π {parsed}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Frais reseau (0.1%)</span>
              <span className="text-red-500 font-medium">-π {fee}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between text-sm font-semibold">
              <span>Credits UBAP</span>
              <span className="text-green-600">+π {willReceive}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Solde UBAP</span>
              <span className="font-bold">π {newBalance.toLocaleString()}</span>
            </div>

            {txid && (
              <div className="pt-1 space-y-1">
                <p className="text-xs text-muted-foreground">Transaction ID (blockchain)</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-xs bg-muted px-2 py-1.5 rounded flex-1 break-all">{txid}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 flex-shrink-0"
                    onClick={() => {
                      navigator.clipboard.writeText(txid)
                      showToast("Transaction ID copie!")
                    }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            )}

            {isSandbox && (
              <Badge variant="outline" className="w-full justify-center text-amber-600 border-amber-300 text-xs">
                Mode Sandbox — Pi Testnet
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          <Button variant="outline" className="bg-transparent" onClick={reset}>
            Nouveau depot
          </Button>
          <Link href="/history" className="w-full">
            <Button className="w-full bg-gradient-to-r from-green-700 to-emerald-600">
              <History className="h-4 w-4 mr-2" />
              Historique
            </Button>
          </Link>
        </div>

        <Link href="/" className="w-full max-w-sm">
          <Button variant="ghost" className="w-full">
            Retour au tableau de bord
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>

        <BottomNav />

        {toast && (
          <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm rounded-xl px-4 py-3 shadow-xl text-white text-sm text-center ${toast.ok ? "bg-green-600" : "bg-red-600"}`}>
            {toast.ok ? <CheckCircle2 className="inline h-4 w-4 mr-1" /> : <X className="inline h-4 w-4 mr-1" />}
            {toast.msg}
          </div>
        )}
      </div>
    )
  }

  // ─── ERROR ────────────────────────────────────────────────────────────────
  if (step === "error") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-5 p-6 pb-28">
        <div className="h-24 w-24 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <div className="text-center space-y-2 max-w-sm">
          <h2 className="text-xl font-bold text-red-600">Depot echoue</h2>
          <p className="text-sm text-muted-foreground whitespace-pre-line text-left bg-muted/50 rounded-xl p-4">
            {errorMsg}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          <Button variant="outline" className="bg-transparent" onClick={reset}>
            Reessayer
          </Button>
          <Link href="/pi-setup-guide" className="w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Guide config</Button>
          </Link>
        </div>
        <BottomNav />
      </div>
    )
  }

  // ─── INPUT (main form) ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background pb-28">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-bold text-base">Deposer Pi</h1>
          <p className="text-xs text-muted-foreground">Votre Pi Wallet → Compte UBAP</p>
        </div>
        <Link href="/pi-setup-guide" title="Guide de configuration Pi">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <HelpCircle className="h-5 w-5 text-blue-600" />
          </Button>
        </Link>
      </div>

      {/* Mode Badge */}
      <div className="px-4 py-2 flex justify-center">
        <Badge
          variant="outline"
          className={`text-xs ${isSandbox ? "text-amber-600 border-amber-400" : "text-green-600 border-green-400"}`}
        >
          {isSandbox ? "Sandbox" : "Mainnet"}
        </Badge>
      </div>

      <div className="p-4 space-y-4 max-w-md mx-auto">

        {/* Not in Pi Browser banner */}
        {!inPiBrowser && (
          <Alert className="border-amber-400 bg-amber-50 dark:bg-amber-950/20">
            <Smartphone className="h-4 w-4 text-amber-600 flex-shrink-0" />
            <AlertDescription className="text-xs text-amber-800 dark:text-amber-200">
              <span className="font-semibold block">Pi Browser requis pour les depôts</span>
              Ouvrez UBAP dans <strong>Pi Browser</strong> sur votre téléphone pour effectuer un dépôt réel.
            </AlertDescription>
          </Alert>
        )}

        {/* In Pi Browser + sandbox */}
        {inPiBrowser && isSandbox && (
          <Alert className="border-blue-300 bg-blue-50 dark:bg-blue-950/20">
            <Info className="h-4 w-4 text-blue-600 flex-shrink-0" />
            <AlertDescription className="text-xs text-blue-800 dark:text-blue-200">
              <span className="font-semibold block">Mode Sandbox (Pi Testnet)</span>
              Votre Pi Wallet va s'ouvrir pour confirmer le depot. Les Pi utilises sont des Pi de test
              sur le Testnet Pi — pas de Pi reel debite.
            </AlertDescription>
          </Alert>
        )}

        {/* In Pi Browser + mainnet */}
        {inPiBrowser && !isSandbox && (
          <Alert className="border-green-300 bg-green-50 dark:bg-green-950/20">
            <Shield className="h-4 w-4 text-green-600 flex-shrink-0" />
            <AlertDescription className="text-xs text-green-800 dark:text-green-200">
              <span className="font-semibold block">Mainnet Pi actif</span>
              Ce depot utilisera de vrais Pi de votre wallet. La transaction sera enregistree
              definitivement sur la blockchain Pi.
            </AlertDescription>
          </Alert>
        )}

        {/* How it works */}
        <Card>
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              Comment fonctionne le depot
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4 space-y-2.5">
            {[
              {
                step: "1",
                label: "Entrez le montant",
                desc: "Choisissez combien de Pi vous voulez deposer"
              },
              {
                step: "2",
                label: inPiBrowser ? "Pi Wallet s'ouvre" : "Pi Wallet s'ouvrira (Pi Browser)",
                desc: inPiBrowser
                  ? "Verifiez le montant et confirmez avec votre wallet"
                  : "L'app doit etre ouverte dans Pi Browser"
              },
              {
                step: "3",
                label: "Blockchain Pi confirme",
                desc: "La transaction est enregistree sur la blockchain Pi"
              },
              {
                step: "4",
                label: "Solde UBAP credite",
                desc: "Vos Pi apparaissent instantanement dans votre compte"
              },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3 text-sm">
                <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center flex-shrink-0 text-xs font-bold text-green-700 dark:text-green-300 mt-0.5">
                  {s.step}
                </div>
                <div>
                  <p className="font-medium text-sm">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Amount card */}
        <Card>
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm">Montant a deposer</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 space-y-4">

            {/* Quick amounts */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Montants rapides</Label>
              <div className="grid grid-cols-3 gap-2">
                {QUICK_AMOUNTS.map((q) => (
                  <Button
                    key={q}
                    variant={amount === String(q) ? "default" : "outline"}
                    size="sm"
                    className={`text-sm h-10 ${amount === String(q) ? "" : "bg-transparent"}`}
                    onClick={() => setAmount(String(q))}
                  >
                    π {q}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom input */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Montant personnalise</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-muted-foreground select-none">π</span>
                <Input
                  type="number"
                  inputMode="decimal"
                  min={MIN_DEPOSIT}
                  step="0.01"
                  placeholder={`Minimum ${MIN_DEPOSIT} Pi`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 h-11 text-base"
                />
              </div>
            </div>

            {/* Fee breakdown */}
            {parsed >= MIN_DEPOSIT && (
              <div className="rounded-xl bg-muted/60 p-3 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Montant envoye</span>
                  <span>π {parsed}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Frais UBAP (0.1%)</span>
                  <span className="text-red-500">-π {fee}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between text-sm font-semibold">
                  <span>Vous recevez</span>
                  <span className="text-green-600 text-base">π {willReceive}</span>
                </div>
              </div>
            )}

            {/* CTA */}
            <Button
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700"
              disabled={!amount || parsed < MIN_DEPOSIT}
              onClick={handleDeposit}
            >
              <ArrowDownToLine className="h-5 w-5 mr-2" />
              {inPiBrowser
                ? `Deposer π ${parsed || ""} via Pi Wallet`
                : `Ouvrez Pi Browser pour deposer`}
            </Button>

          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-green-200 dark:border-green-900 bg-green-50/30 dark:bg-green-950/10">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground text-sm">Securite bancaire UBAP</p>
                <p>Vos Pi sont transferes directement depuis votre Pi Wallet personnel vers
                   le wallet securise de l'application UBAP via le protocole officiel Pi Network.</p>
                <p>Chaque transaction est immutable et verifiable sur la blockchain Pi.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History */}
        <Link href="/history">
          <Button variant="outline" className="w-full bg-transparent">
            <History className="h-4 w-4 mr-2" />
            Voir l'historique des depots
          </Button>
        </Link>

      </div>

      <BottomNav />

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm rounded-xl px-4 py-3 shadow-xl text-white text-sm text-center transition-all ${toast.ok ? "bg-green-600" : "bg-red-600"}`}>
          {toast.ok
            ? <CheckCircle2 className="inline h-4 w-4 mr-1 mb-0.5" />
            : <X className="inline h-4 w-4 mr-1 mb-0.5" />}
          {toast.msg}
        </div>
      )}
    </div>
  )
}
