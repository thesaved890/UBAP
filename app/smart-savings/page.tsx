"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  PiggyBank,
  Target,
  Lock,
  TrendingUp,
  Users,
  Plus,
  Calendar,
  CheckCircle2,
  Info,
  Sparkles,
  X,
  Coins,
} from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

type SavingsGoal = {
  id: string
  name: string
  target: number
  current: number
  currency: string
  deadline: string
  color: string
}

export default function SmartSavingsPage() {
  // ── States ──────────────────────────────────────────────────────────────────
  const [showCreateGoal, setShowCreateGoal] = useState(false)
  const [goalName, setGoalName] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [currency, setCurrency] = useState("Pi")
  const [deadline, setDeadline] = useState("")

  // Modal: Ajouter fonds
  const [showAddFunds, setShowAddFunds] = useState<string | null>(null)
  const [addFundsAmount, setAddFundsAmount] = useState("")

  // Modal: Voir détails
  const [showDetails, setShowDetails] = useState<string | null>(null)

  // Modal: Coffre-Fort
  const [showVault, setShowVault] = useState(false)
  const [vaultAmount, setVaultAmount] = useState("")
  const [vaultDate, setVaultDate] = useState("")
  const [vaultCreated, setVaultCreated] = useState(false)

  // Épargne automatique
  const [autoSavingEnabled, setAutoSavingEnabled] = useState(false)
  const [showAutoSaving, setShowAutoSaving] = useState(false)
  const [autoRate, setAutoRate] = useState("10")

  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
    {
      id: "1",
      name: "Mariage",
      target: 5.0,
      current: 1.25,
      currency: "Pi",
      deadline: "2026-12-31",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "2",
      name: "Nouvelle Voiture",
      target: 3.0,
      current: 0.8,
      currency: "Pi",
      deadline: "2026-06-30",
      color: "from-blue-500 to-cyan-500",
    },
  ])

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const totalSavings = savingsGoals.reduce((sum, g) => sum + g.current, 0)
  const selectedGoal = savingsGoals.find((g) => g.id === (showAddFunds || showDetails))

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleCreateGoal = () => {
    if (!goalName || !targetAmount || !deadline) return
    const newGoal: SavingsGoal = {
      id: Date.now().toString(),
      name: goalName,
      target: parseFloat(targetAmount),
      current: 0,
      currency,
      deadline,
      color: "from-green-500 to-emerald-500",
    }
    setSavingsGoals((prev) => [...prev, newGoal])
    setShowCreateGoal(false)
    setGoalName("")
    setTargetAmount("")
    setDeadline("")
  }

  const handleAddFunds = () => {
    const amount = parseFloat(addFundsAmount)
    if (!amount || amount <= 0) return
    setSavingsGoals((prev) =>
      prev.map((g) =>
        g.id === showAddFunds ? { ...g, current: Math.min(g.current + amount, g.target) } : g
      )
    )
    setShowAddFunds(null)
    setAddFundsAmount("")
  }

  const handleCreateVault = () => {
    if (!vaultAmount || !vaultDate) return
    setVaultCreated(true)
    setShowVault(false)
    setVaultAmount("")
    setVaultDate("")
  }

  const handleEnableAutoSaving = () => {
    setAutoSavingEnabled(true)
    setShowAutoSaving(false)
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 bg-transparent">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Smart Savings</h1>
            <p className="text-sm opacity-90">Épargnez intelligemment pour vos objectifs</p>
          </div>
          <Badge className="bg-white/20 text-white border-0">
            <Sparkles className="h-3 w-3 mr-1" />
            AI
          </Badge>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* Total Savings */}
        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
          <CardContent className="pt-6 pb-6 text-center">
            <p className="text-sm opacity-90 mb-1">Total Épargné</p>
            <p className="text-4xl font-bold mb-1">π {totalSavings.toFixed(3)}</p>
            <p className="text-sm opacity-80">en Pi Network</p>
            {autoSavingEnabled && (
              <Badge className="mt-2 bg-white/20 text-white border-0 text-xs">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Épargne auto {autoRate}% active
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Coffre-Fort actif */}
        {vaultCreated && (
          <Alert className="bg-purple-50 dark:bg-purple-950/20 border-purple-300">
            <Lock className="h-4 w-4 text-purple-600" />
            <AlertDescription className="text-sm text-purple-800 dark:text-purple-200">
              <span className="font-semibold">Coffre-Fort actif</span> — Fonds verrouillés jusqu'au{" "}
              <span className="font-semibold">{new Date(vaultDate || "").toLocaleDateString()}</span>
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            className="bg-gradient-to-r from-purple-600 to-indigo-600"
            onClick={() => setShowCreateGoal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouvel Objectif
          </Button>
          <Link href="/group-savings" className="w-full">
            <Button variant="outline" className="w-full bg-transparent border-green-600 text-green-700">
              <Users className="h-4 w-4 mr-2" />
              Épargne Groupe
            </Button>
          </Link>
        </div>

        {/* ── Create Goal Modal ── */}
        {showCreateGoal && (
          <Card className="border-2 border-primary">
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Créer un Objectif</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowCreateGoal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                <Label>Nom de l'objectif</Label>
                <Input
                  placeholder="Ex: Mariage, Voiture, Maison..."
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Montant cible</Label>
                <Input
                  type="number"
                  placeholder="Entrez le montant"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Devise</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pi">Pi Network (Recommandé)</SelectItem>
                    <SelectItem value="XAF">Franc CFA (XAF)</SelectItem>
                    <SelectItem value="CDF">Franc Congolais (CDF)</SelectItem>
                    <SelectItem value="NGN">Naira (NGN)</SelectItem>
                    <SelectItem value="KES">Shilling Kenyan (KES)</SelectItem>
                    <SelectItem value="ZAR">Rand (ZAR)</SelectItem>
                    <SelectItem value="GHS">Cedi (GHS)</SelectItem>
                    <SelectItem value="MAD">Dirham (MAD)</SelectItem>
                    <SelectItem value="EGP">Livre Egyptienne (EGP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Date limite</Label>
                <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
              </div>
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                disabled={!goalName || !targetAmount || !deadline}
                onClick={handleCreateGoal}
              >
                <Target className="h-4 w-4 mr-2" />
                Créer l'Objectif
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ── Goals List ── */}
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">Mes Objectifs d'Épargne</h2>
          {savingsGoals.length === 0 && (
            <Card>
              <CardContent className="pt-8 pb-8 text-center">
                <PiggyBank className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground text-sm">Aucun objectif créé</p>
                <Button className="mt-3" onClick={() => setShowCreateGoal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Créer mon premier objectif
                </Button>
              </CardContent>
            </Card>
          )}
          {savingsGoals.map((goal) => {
            const progress = Math.min((goal.current / goal.target) * 100, 100)
            const remaining = goal.target - goal.current
            const daysLeft = Math.ceil(
              (new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            )
            return (
              <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`h-12 w-12 rounded-full bg-gradient-to-r ${goal.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <PiggyBank className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{goal.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.currency}
                      </p>
                    </div>
                    <Badge variant={progress >= 100 ? "default" : "secondary"}>
                      {progress.toFixed(0)}%
                    </Badge>
                  </div>
                  <Progress value={progress} className="h-2 mb-3" />
                  <div className="flex justify-between text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {daysLeft > 0 ? `${daysLeft} jours restants` : "Délai dépassé"}
                    </span>
                    <span>Reste: {remaining.toLocaleString()} {goal.currency}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => { setShowAddFunds(goal.id); setAddFundsAmount("") }}
                    >
                      <Coins className="h-4 w-4 mr-1" />
                      Ajouter Fonds
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-green-600 to-emerald-600"
                      onClick={() => setShowDetails(goal.id)}
                    >
                      <Info className="h-4 w-4 mr-1" />
                      Voir Détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* ── Fonctionnalités Intelligentes ── */}
        <Card className="bg-muted/50">
          <CardContent className="pt-4 pb-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Fonctionnalités Intelligentes
            </h3>
            <div className="space-y-3">
              {/* Épargne automatique */}
              <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Épargne Automatique</p>
                  <p className="text-xs text-muted-foreground">
                    {autoSavingEnabled
                      ? `Active — ${autoRate}% de chaque transaction`
                      : "Épargnez automatiquement à chaque transaction"}
                  </p>
                </div>
                {autoSavingEnabled ? (
                  <Badge variant="default" className="bg-green-600 text-xs">Active</Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => setShowAutoSaving(true)}
                  >
                    Activer
                  </Button>
                )}
              </div>

              {/* Coffre-Fort */}
              <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
                <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center flex-shrink-0">
                  <Lock className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Coffre-Fort Verrouillé</p>
                  <p className="text-xs text-muted-foreground">
                    {vaultCreated ? "Coffre actif — fonds verrouillés" : "Bloquez vos fonds jusqu'à une date précise"}
                  </p>
                </div>
                {vaultCreated ? (
                  <Badge variant="secondary" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    Verrouillé
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => setShowVault(true)}
                  >
                    Créer
                  </Button>
                )}
              </div>

              {/* Épargne Collective */}
              <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Épargne Collective</p>
                  <p className="text-xs text-muted-foreground">Épargnez avec vos amis et famille</p>
                </div>
                <Link href="/group-savings">
                  <Button size="sm" variant="outline" className="bg-transparent">
                    Rejoindre
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-semibold">Conseil Smart Savings</span>
            <br />
            Basé sur vos habitudes, nous recommandons d'épargner 10% de chaque transaction Pi pour atteindre vos objectifs plus rapidement.
          </AlertDescription>
        </Alert>
      </main>

      {/* ═══════════════════════════════════════════════════════════
          MODALS
      ═══════════════════════════════════════════════════════════ */}

      {/* Modal: Ajouter Fonds */}
      {showAddFunds && selectedGoal && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Ajouter des fonds</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowAddFunds(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">{selectedGoal.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedGoal.current.toLocaleString()} / {selectedGoal.target.toLocaleString()} {selectedGoal.currency}
                </p>
                <Progress value={(selectedGoal.current / selectedGoal.target) * 100} className="h-1 mt-2" />
              </div>
              <div className="space-y-1">
                <Label>Montant à ajouter ({selectedGoal.currency})</Label>
                <Input
                  type="number"
                  placeholder="Ex: 0.5"
                  value={addFundsAmount}
                  onChange={(e) => setAddFundsAmount(e.target.value)}
                  autoFocus
                />
              </div>
              {addFundsAmount && parseFloat(addFundsAmount) > 0 && (
                <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200">
                  <AlertDescription className="text-sm">
                    Nouveau solde: <span className="font-bold">
                      {Math.min(selectedGoal.current + parseFloat(addFundsAmount), selectedGoal.target).toLocaleString()} {selectedGoal.currency}
                    </span>
                  </AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-transparent" onClick={() => setShowAddFunds(null)}>
                  Annuler
                </Button>
                <Button
                  className="bg-gradient-to-r from-green-600 to-emerald-600"
                  disabled={!addFundsAmount || parseFloat(addFundsAmount) <= 0}
                  onClick={handleAddFunds}
                >
                  <Coins className="h-4 w-4 mr-2" />
                  Confirmer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal: Voir Détails */}
      {showDetails && selectedGoal && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">{selectedGoal.name}</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowDetails(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedGoal.color} text-white text-center`}>
                <p className="text-3xl font-bold">{selectedGoal.current.toLocaleString()} {selectedGoal.currency}</p>
                <p className="text-sm opacity-90">épargné sur {selectedGoal.target.toLocaleString()} {selectedGoal.currency}</p>
              </div>
              <Progress value={(selectedGoal.current / selectedGoal.target) * 100} className="h-3" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Objectif cible</span>
                  <span className="font-semibold">{selectedGoal.target.toLocaleString()} {selectedGoal.currency}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Total épargné</span>
                  <span className="font-semibold text-green-600">{selectedGoal.current.toLocaleString()} {selectedGoal.currency}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Restant</span>
                  <span className="font-semibold text-amber-600">
                    {(selectedGoal.target - selectedGoal.current).toLocaleString()} {selectedGoal.currency}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="font-semibold">
                    {((selectedGoal.current / selectedGoal.target) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Date limite</span>
                  <span className="font-semibold">
                    {new Date(selectedGoal.deadline).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-transparent" onClick={() => setShowDetails(null)}>
                  Fermer
                </Button>
                <Button
                  className="bg-gradient-to-r from-green-600 to-emerald-600"
                  onClick={() => { setShowDetails(null); setShowAddFunds(selectedGoal.id) }}
                >
                  <Coins className="h-4 w-4 mr-2" />
                  Ajouter Fonds
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal: Coffre-Fort */}
      {showVault && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Créer un Coffre-Fort</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowVault(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Alert className="bg-purple-50 dark:bg-purple-950/20 border-purple-200">
                <Lock className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Les fonds verrouillés ne peuvent pas être retirés avant la date choisie. Cette action est irréversible.
                </AlertDescription>
              </Alert>
              <div className="space-y-1">
                <Label>Montant à verrouiller (Pi)</Label>
                <Input
                  type="number"
                  placeholder="Ex: 1.5"
                  value={vaultAmount}
                  onChange={(e) => setVaultAmount(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Date de déblocage</Label>
                <Input
                  type="date"
                  value={vaultDate}
                  onChange={(e) => setVaultDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-transparent" onClick={() => setShowVault(false)}>
                  Annuler
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-indigo-600"
                  disabled={!vaultAmount || !vaultDate}
                  onClick={handleCreateVault}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Verrouiller
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <BottomNav />

      {/* Modal: Épargne Automatique */}
      {showAutoSaving && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Épargne Automatique</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowAutoSaving(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                <TrendingUp className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Un pourcentage de chaque transaction Pi reçue sera automatiquement transféré vers votre épargne.
                </AlertDescription>
              </Alert>
              <div className="space-y-1">
                <Label>Taux d'épargne automatique</Label>
                <Select value={autoRate} onValueChange={setAutoRate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5% de chaque transaction</SelectItem>
                    <SelectItem value="10">10% de chaque transaction</SelectItem>
                    <SelectItem value="15">15% de chaque transaction</SelectItem>
                    <SelectItem value="20">20% de chaque transaction</SelectItem>
                    <SelectItem value="25">25% de chaque transaction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-transparent" onClick={() => setShowAutoSaving(false)}>
                  Annuler
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-indigo-600"
                  onClick={handleEnableAutoSaving}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Activer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
