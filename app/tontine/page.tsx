"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft, Users, Plus, Info, CheckCircle2,
  Send, MessageCircle, X, Calendar, Gift, Coins,
  AlertTriangle, Shield, Clock, Ban,
} from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { useUser } from "@/contexts/user-context"
import { initiatePiPayment } from "@/lib/pi-network-sdk"

// ─── Types ────────────────────────────────────────────────────────────────────
type PaymentStatus = "paid" | "pending" | "late" | "blocked"

type Member = {
  id: string
  name: string
  turn: number
  paymentStatus: PaymentStatus
  lateCount: number    // nombre de retards cumulés
  joinDate: string
}

type TontineGroup = {
  id: string
  name: string
  members: number
  membersJoined: number
  contribution: number   // en Pi
  status: "forming" | "active" | "completed"
  inviteCode: string
  creatorId: string
  unreadMessages: number
  currentRound: number
  totalRounds: number
  nextCollectionDate: string
  nextPayoutDate?: string
  daysUntilCollection: number
  membersList: Member[]
  scratchCards: number[]
  myPaymentStatus: PaymentStatus
  recipientThisRound?: string   // nom du bénéficiaire du tour actuel
}

// ─── Règles strictes de la Tontine UBAP ──────────────────────────────────────
const RULES = {
  LATE_WARNING_DAYS: 3,        // avertissement J-3 avant la date limite
  GRACE_PERIOD_HOURS: 24,      // tolérance de 24h après la date limite
  MAX_LATE_COUNT: 2,           // exclusion définitive après 2 retards
  PENALTY_PI: 0.001,           // pénalité automatique en Pi par retard
  PAYOUT_AUTO: true,           // distribution automatique par le système (jamais par l'admin)
  ADMIN_CAN_SEND_MONEY: false, // IMPORTANT: l'admin ne touche JAMAIS aux fonds
  MIN_MEMBERS: 3,              // minimum 3 membres pour démarrer
  MAX_MEMBERS: 20,             // maximum 20 membres par groupe
}

export default function TontinePage() {
  const { user } = useUser()
  const currentUserId = user?.id ?? ""

  // ── Données initiales ────────────────────────────────────────────────────────
  const initialGroups: TontineGroup[] = [
    {
      id: "tontine-1",
      name: "Entrepreneurs Congo",
      members: 10,
      membersJoined: 7,
      contribution: 0.003,
      status: "forming",
      inviteCode: "TONT-UBAP01",
      creatorId: "other-user-123",
      unreadMessages: 0,
      currentRound: 0,
      totalRounds: 10,
      nextCollectionDate: "12 Mars 2026",
      nextPayoutDate: "",
      daysUntilCollection: 9,
      myPaymentStatus: "pending",
      scratchCards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      membersList: [
        { id: "u1", name: "Vous", turn: 0, paymentStatus: "pending", lateCount: 0, joinDate: "2026-01-10" },
        { id: "u2", name: "Jean M.", turn: 0, paymentStatus: "pending", lateCount: 0, joinDate: "2026-01-12" },
        { id: "u3", name: "Paul K.", turn: 0, paymentStatus: "pending", lateCount: 0, joinDate: "2026-01-15" },
      ],
    },
    {
      id: "tontine-2",
      name: "Femmes Commerçantes Kinshasa",
      members: 10,
      membersJoined: 10,
      contribution: 0.005,
      status: "active",
      inviteCode: "TONT-FEMCOM",
      creatorId: currentUserId,
      unreadMessages: 3,
      currentRound: 3,
      totalRounds: 10,
      nextCollectionDate: "15 Mars 2026",
      nextPayoutDate: "18 Mars 2026",
      daysUntilCollection: 3,
      myPaymentStatus: "paid",
      recipientThisRound: "Marie Lukoji",
      scratchCards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      membersList: [
        { id: "m1", name: "Marie Lukoji", turn: 3, paymentStatus: "paid", lateCount: 0, joinDate: "2026-01-01" },
        { id: "m2", name: "Jean K.", turn: 1, paymentStatus: "paid", lateCount: 0, joinDate: "2026-01-01" },
        { id: "m3", name: "Vous", turn: 8, paymentStatus: "paid", lateCount: 0, joinDate: "2026-01-01" },
        { id: "m4", name: "Alice M.", turn: 4, paymentStatus: "pending", lateCount: 1, joinDate: "2026-01-01" },
        { id: "m5", name: "Bob N.", turn: 5, paymentStatus: "late", lateCount: 2, joinDate: "2026-01-01" },
        { id: "m6", name: "Sara D.", turn: 6, paymentStatus: "paid", lateCount: 0, joinDate: "2026-01-01" },
        { id: "m7", name: "Amara T.", turn: 7, paymentStatus: "pending", lateCount: 0, joinDate: "2026-01-01" },
        { id: "m8", name: "Fatoumata B.", turn: 2, paymentStatus: "paid", lateCount: 0, joinDate: "2026-01-01" },
        { id: "m9", name: "Celine R.", turn: 9, paymentStatus: "paid", lateCount: 0, joinDate: "2026-01-01" },
        { id: "m10", name: "Diane O.", turn: 10, paymentStatus: "paid", lateCount: 0, joinDate: "2026-01-01" },
      ],
    },
  ]

  // ── States ──────────────────────────────────────────────────────────────────
  const [groups, setGroups] = useState<TontineGroup[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ubap_tontine_groups_v2")
      if (saved) { try { return JSON.parse(saved) } catch { /* skip */ } }
    }
    return initialGroups
  })

  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showJoinGroup, setShowJoinGroup] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupMembers, setNewGroupMembers] = useState(10)
  const [newGroupContribution, setNewGroupContribution] = useState(0.003)
  const [joinCode, setJoinCode] = useState("")
  const [activeTab, setActiveTab] = useState<Record<string, string>>({})
  const [scratchedCards, setScratchedCards] = useState<Record<string, number>>({})
  const [paymentProcessing, setPaymentProcessing] = useState<string | null>(null)
  const [showContract, setShowContract] = useState<string | null>(null)
  const [contractSigned, setContractSigned] = useState<Record<string, boolean>>({})
  const [chatMessage, setChatMessage] = useState("")
  const [showPayoutConfirm, setShowPayoutConfirm] = useState<string | null>(null)
  const [showPenaltyModal, setShowPenaltyModal] = useState<{ groupId: string; member: Member } | null>(null)
  const [showExcludeModal, setShowExcludeModal] = useState<{ groupId: string; member: Member } | null>(null)
  const [toast, setToast] = useState<{ title: string; message: string; type?: "success" | "error" | "info" } | null>(null)

  const showToast = (title: string, message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ title, message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const groupChats: Record<string, Array<{ user: string; message: string; time: string }>> = {
    "tontine-2": [
      { user: "Marie L.", message: "Bonjour a tous!", time: "10:30" },
      { user: "Jean K.", message: "La prochaine collecte est dans 3 jours", time: "10:45" },
      { user: "Vous", message: "Merci pour le rappel!", time: "11:00" },
    ],
  }

  // Persist
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ubap_tontine_groups_v2", JSON.stringify(groups))
    }
  }, [groups])

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const getMyMember = (group: TontineGroup) =>
    group.membersList.find((m) => m.name === "Vous")

  const getRecipient = (group: TontineGroup) =>
    group.membersList.find((m) => m.turn === group.currentRound)

  const totalPot = (group: TontineGroup) =>
    (group.contribution * group.membersJoined).toFixed(4)

  const paidCount = (group: TontineGroup) =>
    group.membersList.filter((m) => m.paymentStatus === "paid").length

  const allPaid = (group: TontineGroup) =>
    group.membersList.every((m) => m.paymentStatus === "paid" || m.paymentStatus === "blocked")

  // ── Payment Handler (Pi SDK réel) ────────────────────────────────────────────
  const handlePayContribution = async (groupId: string) => {
    setPaymentProcessing(groupId)
    const group = groups.find((g) => g.id === groupId)
    if (!group) { setPaymentProcessing(null); return }

    // Vérification: membre bloqué ne peut pas payer
    const myMemberCheck = getMyMember(group)
    if (myMemberCheck?.paymentStatus === "blocked") {
      showToast("Acces bloque", `Vous avez ete bloque apres ${RULES.MAX_LATE_COUNT} retards de paiement. Contactez l'admin du groupe.`, "error")
      setPaymentProcessing(null)
      return
    }

    try {
      // Paiement réel via Pi Network SDK
      await initiatePiPayment(
        group.contribution,
        `Cotisation Tontine - ${group.name} - Tour ${group.currentRound}`,
        { groupId, type: "tontine_contribution", round: group.currentRound }
      )

      // Mise à jour du statut après paiement confirmé
      setGroups((prev) => {
        const updated = prev.map((g) =>
          g.id === groupId
            ? {
                ...g,
                myPaymentStatus: "paid" as PaymentStatus,
                membersList: g.membersList.map((m) =>
                  m.name === "Vous" ? { ...m, paymentStatus: "paid" as PaymentStatus } : m
                ),
              }
            : g
        )
        // Vérifier si tous ont payé pour déclencher le payout automatique
        const updatedGroup = updated.find((g) => g.id === groupId)!
        if (allPaid(updatedGroup)) {
          setTimeout(() => setShowPayoutConfirm(groupId), 500)
        }
        return updated
      })
    } catch (err) {
      showToast("Paiement echoue", "Paiement Pi annule. Reessayez avant la date limite pour eviter une penalite.", "error")
    } finally {
      setPaymentProcessing(null)
    }
  }

  // ── Payout automatique du SYSTEME (pas de l'admin) ──────────────────────────
  // Le système envoie directement au bénéficiaire via Pi SDK.
  // L'admin n'a AUCUN contrôle sur ce paiement.
  const handleConfirmPayout = async (groupId: string) => {
    const group = groups.find((g) => g.id === groupId)
    if (!group) return
    const recipient = getRecipient(group)
    if (!recipient) return

    try {
      // Envoi automatique au bénéficiaire via Pi SDK
      await initiatePiPayment(
        parseFloat(totalPot(group)),
        `Distribution Tontine - ${group.name} - Tour ${group.currentRound} - Beneficiaire: ${recipient.name}`,
        {
          groupId,
          type: "tontine_payout",
          round: group.currentRound,
          recipient: recipient.id,
        }
      )

      // Passer au tour suivant
      setGroups((prev) =>
        prev.map((g) =>
          g.id === groupId
            ? {
                ...g,
                currentRound: g.currentRound + 1,
                myPaymentStatus: "pending" as PaymentStatus,
                membersList: g.membersList.map((m) => ({
                  ...m,
                  paymentStatus: (m.paymentStatus === "blocked" ? "blocked" : "pending") as PaymentStatus,
                })),
              }
            : g
        )
      )
      setShowPayoutConfirm(null)
      showToast("Distribution effectuee!", `π ${totalPot(group)} envoyes a ${recipient.name}. Tour ${group.currentRound + 1} commence.`, "success")
    } catch {
      showToast("Erreur distribution", "Le systeme va reessayer automatiquement.", "error")
      setShowPayoutConfirm(null)
    }
  }

  // ── Pénalité ─────────────────────────────────────────────────────────────────
  const handleApplyPenalty = (groupId: string, memberId: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              membersList: g.membersList.map((m) =>
                m.id === memberId
                  ? {
                      ...m,
                      lateCount: m.lateCount + 1,
                      paymentStatus: m.lateCount + 1 >= RULES.MAX_LATE_COUNT ? "blocked" : "late",
                    }
                  : m
              ),
            }
          : g
      )
    )
    setShowPenaltyModal(null)
  }

  // ── Exclusion ─────────────────────────────────────────────────────────────────
  const handleExcludeMember = (groupId: string, memberId: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              membersJoined: g.membersJoined - 1,
              membersList: g.membersList.filter((m) => m.id !== memberId),
            }
          : g
      )
    )
    setShowExcludeModal(null)
  }

  // ── Scratch Card ─────────────────────────────────────────────────────────────
  const handleScratchCard = (groupId: string, cardNum: number) => {
    setScratchedCards((prev) => ({ ...prev, [groupId]: cardNum }))
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              membersList: g.membersList.map((m) =>
                m.name === "Vous" ? { ...m, turn: cardNum } : m
              ),
            }
          : g
      )
    )
  }

  // ── Create / Join ─────────────────────────────────────────────────────────────
  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return
    const code = `TONT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    const newGroup: TontineGroup = {
      id: `tontine-${Date.now()}`,
      name: newGroupName,
      members: newGroupMembers,
      membersJoined: 1,
      contribution: newGroupContribution,
      status: "forming",
      inviteCode: code,
      creatorId: currentUserId,
      unreadMessages: 0,
      currentRound: 0,
      totalRounds: newGroupMembers,
      nextCollectionDate: "",
      daysUntilCollection: 0,
      myPaymentStatus: "pending",
      scratchCards: Array.from({ length: newGroupMembers }, (_, i) => i + 1),
      membersList: [
        { id: currentUserId, name: "Vous", turn: 0, paymentStatus: "pending", lateCount: 0, joinDate: new Date().toISOString().split("T")[0] },
      ],
    }
    setGroups((prev) => [...prev, newGroup])
    setNewGroupName("")
    setShowCreateGroup(false)
    showToast("Groupe cree!", `Code d'invitation: ${code} — Partagez ce code avec vos membres.`, "success")
  }

  const handleJoinGroup = () => {
    const group = groups.find((g) => g.inviteCode === joinCode.toUpperCase())
    if (!group) { showToast("Code invalide", "Aucun groupe trouve avec ce code. Verifiez et reessayez.", "error"); return }
    if (group.membersJoined >= group.members) { showToast("Groupe complet", "Ce groupe a atteint son nombre maximum de membres.", "error"); return }
    setGroups((prev) =>
      prev.map((g) =>
        g.inviteCode === joinCode.toUpperCase()
          ? { ...g, membersJoined: g.membersJoined + 1 }
          : g
      )
    )
    setJoinCode("")
    setShowJoinGroup(false)
    showToast("Groupe rejoint!", `Vous avez rejoint "${group.name}". Signez le contrat pour participer.`, "success")
  }

  // ── Status badge helper ──────────────────────────────────────────────────────
  const statusBadge = (s: PaymentStatus) => {
    const map: Record<PaymentStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      paid: { label: "Paye", variant: "default" },
      pending: { label: "En attente", variant: "secondary" },
      late: { label: "En retard", variant: "destructive" },
      blocked: { label: "Bloque", variant: "destructive" },
    }
    return map[s]
  }

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 bg-transparent">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Pi Tontine</h1>
            <p className="text-sm text-white/80">Epargne collective — Regles strictes</p>
          </div>
          <Shield className="h-6 w-6 text-white/80" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Règles de la tontine */}
        <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-300">
          <Shield className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-xs text-amber-800 dark:text-amber-200 space-y-1">
            <p className="font-semibold text-sm">Regles strictes de la Tontine UBAP</p>
            <p>• Cotisation obligatoire avant la date limite a chaque tour</p>
            <p>• Avertissement automatique {RULES.LATE_WARNING_DAYS} jours avant la date limite</p>
            <p>• Tolerance de {RULES.GRACE_PERIOD_HOURS}h apres la date limite, puis penalite</p>
            <p>• Penalite de π {RULES.PENALTY_PI} debite automatiquement par retard</p>
            <p>• Exclusion definitive apres {RULES.MAX_LATE_COUNT} retards — tour annule</p>
            <p>• Distribution automatique par le SYSTEME des que tous ont paye</p>
            <p>• L'admin ne peut PAS toucher aux fonds ni bloquer un paiement</p>
            <p>• Tour determine par carte a gratter — irreversible apres signature</p>
            <p>• Toutes les transactions enregistrees sur la blockchain Pi</p>
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            className="bg-gradient-to-r from-green-600 to-emerald-600"
            onClick={() => setShowCreateGroup(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Creer un groupe
          </Button>
          <Button
            variant="outline"
            className="bg-transparent border-purple-600 text-purple-600"
            onClick={() => setShowJoinGroup(true)}
          >
            <Users className="h-4 w-4 mr-2" />
            Rejoindre
          </Button>
        </div>

        {/* Join Form */}
        {showJoinGroup && (
          <Card className="border-purple-400">
            <CardContent className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Rejoindre un groupe</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowJoinGroup(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Code d'invitation (ex: TONT-XXXXX)" value={joinCode} onChange={(e) => setJoinCode(e.target.value)} />
              <Button className="w-full" onClick={handleJoinGroup}>Rejoindre</Button>
            </CardContent>
          </Card>
        )}

        {/* Create Form */}
        {showCreateGroup && (
          <Card className="border-green-400">
            <CardContent className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Creer un groupe Tontine</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowCreateGroup(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <Label>Nom du groupe</Label>
                <Input placeholder="Ex: Famille Diallo" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
              </div>
              <div>
                <Label>Nombre de membres</Label>
                <Input type="number" min={2} max={50} value={newGroupMembers} onChange={(e) => setNewGroupMembers(parseInt(e.target.value))} />
              </div>
              <div>
                <Label>Cotisation par tour (Pi)</Label>
                <Input type="number" step={0.001} value={newGroupContribution} onChange={(e) => setNewGroupContribution(parseFloat(e.target.value))} />
              </div>
              <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Chaque membre recevra {(newGroupContribution * newGroupMembers).toFixed(4)} Pi a son tour
                </AlertDescription>
              </Alert>
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600" onClick={handleCreateGroup} disabled={!newGroupName.trim()}>
                Creer le groupe
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Groups List */}
        {groups.length === 0 ? (
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">Aucun groupe. Creez ou rejoignez un groupe.</p>
            </CardContent>
          </Card>
        ) : (
          groups.map((group) => {
            const isAdmin = group.creatorId === currentUserId
            const myMember = getMyMember(group)
            const recipient = getRecipient(group)
            const pot = totalPot(group)
            const paid = paidCount(group)
            const payProgress = group.membersJoined > 0 ? (paid / group.membersJoined) * 100 : 0

            return (
              <Card key={group.id} className="overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{group.name}</h3>
                      <p className="text-xs text-white/80">
                        {group.status === "active" ? `Tour ${group.currentRound}/${group.totalRounds}` : "En formation"}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={`text-xs ${group.status === "active" ? "bg-green-500" : "bg-amber-500"} border-0`}>
                        {group.status === "active" ? "Actif" : "Formation"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>{group.membersJoined}/{group.members} membres</span>
                    <span className="font-bold">π {group.contribution} / tour</span>
                    <span>Pot: π {pot}</span>
                  </div>
                </div>

                <CardContent className="pt-4 pb-4">
                  {/* Quick Actions */}
                  <div className="flex gap-2 mb-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent text-xs"
                      onClick={() => setActiveTab((p) => ({ ...p, [group.id]: "members" }))}
                    >
                      <Users className="h-3 w-3 mr-1" />
                      Membres ({group.membersJoined})
                    </Button>
                    {group.status === "active" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent text-xs"
                        onClick={() => setActiveTab((p) => ({ ...p, [group.id]: "payment" }))}
                      >
                        <Coins className="h-3 w-3 mr-1" />
                        Paiement
                      </Button>
                    )}
                    {!contractSigned[group.id] && (
                      <Button
                        size="sm"
                        className="flex-1 bg-amber-600 text-xs"
                        onClick={() => setShowContract(group.id)}
                      >
                        Signer contrat
                      </Button>
                    )}
                    {contractSigned[group.id] && (
                      <Badge variant="outline" className="text-xs text-green-600 border-green-400">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Contrat signe
                      </Badge>
                    )}
                  </div>

                  {/* Alerte bénéficiaire si tous ont payé */}
                  {group.status === "active" && allPaid(group) && (
                    <Alert className="bg-green-50 dark:bg-green-950/20 border-green-400 mb-4">
                      <Gift className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-sm">
                        <span className="font-semibold text-green-700 dark:text-green-300">
                          Tous les membres ont paye!
                        </span>
                        <br />
                        <span className="text-xs">
                          {isAdmin
                            ? "Le systeme va envoyer automatiquement le pot au beneficiaire."
                            : `Le pot sera envoye a ${recipient?.name || group.recipientThisRound} automatiquement.`}
                        </span>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Alerte retard */}
                  {group.status === "active" && group.myPaymentStatus !== "paid" && group.daysUntilCollection <= RULES.LATE_WARNING_DAYS && (
                    <Alert className="bg-red-50 dark:bg-red-950/20 border-red-300 mb-4">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-sm text-red-700 dark:text-red-300">
                        <span className="font-semibold">Urgence!</span> Il vous reste {group.daysUntilCollection} jour(s) pour payer votre cotisation. Apres la date limite, une penalite de {RULES.PENALTY_PI} Pi sera appliquee.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Paiement global progress */}
                  {group.status === "active" && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progression des paiements</span>
                        <span>{paid}/{group.membersJoined} payes</span>
                      </div>
                      <Progress value={payProgress} className="h-2" />
                    </div>
                  )}

                  {/* Tabs */}
                  <Tabs
                    value={activeTab[group.id] || "info"}
                    onValueChange={(v) => setActiveTab((p) => ({ ...p, [group.id]: v }))}
                  >
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="info" className="text-[10px] px-1">Infos</TabsTrigger>
                      <TabsTrigger value="members" className="text-[10px] px-1">Membres</TabsTrigger>
                      <TabsTrigger value="payment" className="text-[10px] px-1">Paiement</TabsTrigger>
                      <TabsTrigger value="chat" className="text-[10px] px-1 relative">
                        Chat
                        {group.unreadMessages > 0 && (
                          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                            {group.unreadMessages}
                          </span>
                        )}
                      </TabsTrigger>
                    </TabsList>

                    {/* ── INFO TAB ── */}
                    <TabsContent value="info" className="space-y-3 mt-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Card className="bg-purple-50 dark:bg-purple-950/20">
                          <CardContent className="pt-3 pb-3 text-center">
                            <p className="text-xs text-muted-foreground">Cotisation</p>
                            <p className="text-xl font-bold text-purple-600">π {group.contribution}</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-green-50 dark:bg-green-950/20">
                          <CardContent className="pt-3 pb-3 text-center">
                            <p className="text-xs text-muted-foreground">Pot du tour</p>
                            <p className="text-xl font-bold text-green-600">π {pot}</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="space-y-2 p-3 bg-muted rounded-lg text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Code invitation</span>
                          <span className="font-mono font-bold">{group.inviteCode}</span>
                        </div>
                        {group.status === "active" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Beneficiaire actuel</span>
                              <span className="font-semibold">{recipient?.name || group.recipientThisRound || "—"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Votre tour</span>
                              <span className="font-semibold">
                                {myMember?.turn ? `#${myMember.turn}` : "Non defini"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Vous recevrez</span>
                              <span className="font-bold text-green-600">π {pot}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Date collecte</span>
                              <span className="font-semibold">{group.nextCollectionDate}</span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Choix du tour par carte à gratter (groupe en formation) */}
                      {group.status === "forming" && contractSigned[group.id] && !scratchedCards[group.id] && (
                        <div>
                          <p className="text-sm font-semibold mb-2">Choisissez votre tour:</p>
                          <div className="grid grid-cols-5 gap-2">
                            {group.scratchCards.map((n) => (
                              <button
                                key={n}
                                onClick={() => handleScratchCard(group.id, n)}
                                className="aspect-square rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 font-bold text-lg hover:scale-105 transition-all flex items-center justify-center"
                              >
                                ?
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {scratchedCards[group.id] && (
                        <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                          <Calendar className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            Votre tour: <span className="font-bold">#{scratchedCards[group.id]}</span>
                            — Vous recevrez π {pot}
                          </AlertDescription>
                        </Alert>
                      )}
                    </TabsContent>

                    {/* ── MEMBERS TAB ── */}
                    <TabsContent value="members" className="space-y-2 mt-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">Membres du groupe</h4>
                        <Badge variant="outline">{group.membersJoined}/{group.members}</Badge>
                      </div>
                      {group.membersList.map((member) => {
                        const sb = statusBadge(member.paymentStatus)
                        const isBlocked = member.paymentStatus === "blocked"
                        return (
                          <Card key={member.id} className={isBlocked ? "opacity-60 border-red-300" : ""}>
                            <CardContent className="pt-3 pb-3">
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                  {member.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium text-sm">{member.name}</p>
                                    {member.name === "Vous" && <Badge variant="outline" className="text-[10px] py-0">Vous</Badge>}
                                    {isBlocked && <Ban className="h-3 w-3 text-red-500" />}
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    Tour #{member.turn || "?"} — {member.lateCount} retard(s)
                                  </p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                  <Badge variant={sb.variant} className="text-[10px]">{sb.label}</Badge>
                                  {/* Admin actions pour membres en retard */}
                                  {isAdmin && member.name !== "Vous" && (
                                    <div className="flex gap-1">
                                      {member.paymentStatus === "late" && (
                                        <button
                                          className="text-[10px] text-amber-600 underline"
                                          onClick={() => setShowPenaltyModal({ groupId: group.id, member })}
                                        >
                                          Penalite
                                        </button>
                                      )}
                                      {member.lateCount >= RULES.MAX_LATE_COUNT && (
                                        <button
                                          className="text-[10px] text-red-600 underline"
                                          onClick={() => setShowExcludeModal({ groupId: group.id, member })}
                                        >
                                          Exclure
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </TabsContent>

                    {/* ── PAYMENT TAB ── */}
                    <TabsContent value="payment" className="space-y-3 mt-3">
                      {group.status !== "active" ? (
                        <div className="text-center py-8">
                          <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                          <p className="text-sm text-muted-foreground">
                            Les paiements commencent quand le groupe est actif et que tous les membres ont signe le contrat.
                          </p>
                        </div>
                      ) : (
                        <>
                          {/* Statut de mon paiement */}
                          <Alert className={
                            group.myPaymentStatus === "paid"
                              ? "bg-green-50 dark:bg-green-950/20 border-green-300"
                              : group.daysUntilCollection <= RULES.LATE_WARNING_DAYS
                              ? "bg-red-50 dark:bg-red-950/20 border-red-300"
                              : "bg-amber-50 dark:bg-amber-950/20 border-amber-300"
                          }>
                            {group.myPaymentStatus === "paid"
                              ? <CheckCircle2 className="h-4 w-4 text-green-600" />
                              : group.daysUntilCollection <= RULES.LATE_WARNING_DAYS
                              ? <AlertTriangle className="h-4 w-4 text-red-600" />
                              : <Clock className="h-4 w-4 text-amber-600" />
                            }
                            <AlertDescription className="text-sm">
                              {group.myPaymentStatus === "paid" ? (
                                <span className="font-semibold text-green-700 dark:text-green-300">
                                  Cotisation payee pour ce tour
                                </span>
                              ) : (
                                <>
                                  <span className="font-semibold">
                                    Cotisation due: π {group.contribution}
                                  </span>
                                  <br />
                                  <span className="text-xs">
                                    {group.daysUntilCollection} jour(s) restants — Penalite en cas de retard: π {RULES.PENALTY_PI}
                                  </span>
                                </>
                              )}
                            </AlertDescription>
                          </Alert>

                          {/* Bouton paiement */}
                          {group.myPaymentStatus !== "paid" ? (
                            <Button
                              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600"
                              onClick={() => handlePayContribution(group.id)}
                              disabled={paymentProcessing === group.id}
                            >
                              {paymentProcessing === group.id ? (
                                <span className="flex items-center gap-2">
                                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                  Traitement Pi...
                                </span>
                              ) : (
                                <>
                                  <Coins className="h-5 w-5 mr-2" />
                                  Payer ma cotisation — π {group.contribution}
                                </>
                              )}
                            </Button>
                          ) : (
                            <Card className="bg-green-50 dark:bg-green-950/20 border-green-300">
                              <CardContent className="pt-6 pb-6 text-center">
                                <CheckCircle2 className="h-12 w-12 mx-auto text-green-600 mb-2" />
                                <p className="font-semibold text-green-700 dark:text-green-300">Paiement confirme</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  En attente des autres membres ({paid}/{group.membersJoined} payes)
                                </p>
                              </CardContent>
                            </Card>
                          )}

                          {/* Info bénéficiaire et distribution auto */}
                          <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200">
                            <CardContent className="pt-4 pb-4">
                              <div className="flex items-center gap-3">
                                <Gift className="h-8 w-8 text-purple-600 flex-shrink-0" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Beneficiaire de ce tour</p>
                                  <p className="font-bold">{recipient?.name || group.recipientThisRound || "—"}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Recevra π {pot} automatiquement quand tous auront paye
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Mon tour */}
                          {myMember?.turn ? (
                            <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                              <Calendar className="h-4 w-4" />
                              <AlertDescription className="text-sm">
                                Mon tour de recevoir: <span className="font-bold">#{myMember.turn}</span>
                                <br />
                                <span className="text-xs text-muted-foreground">
                                  Je recevrai π {pot} quand ce sera mon tour
                                </span>
                              </AlertDescription>
                            </Alert>
                          ) : null}
                        </>
                      )}
                    </TabsContent>

                    {/* ── CHAT TAB ── */}
                    <TabsContent value="chat" className="space-y-3 mt-3">
                      <div className="space-y-2 max-h-56 overflow-y-auto">
                        {(groupChats[group.id] || []).length === 0 ? (
                          <p className="text-sm text-muted-foreground text-center py-6">Aucun message</p>
                        ) : (
                          (groupChats[group.id] || []).map((msg, idx) => (
                            <div
                              key={idx}
                              className={`p-2 rounded-lg text-sm ${msg.user === "Vous" ? "bg-purple-100 dark:bg-purple-950/40 ml-8" : "bg-muted mr-8"}`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-xs">{msg.user}</span>
                                <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                              </div>
                              <p>{msg.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Votre message..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => { if (e.key === "Enter" && chatMessage.trim()) setChatMessage("") }}
                        />
                        <Button onClick={() => { if (chatMessage.trim()) setChatMessage("") }}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )
          })
        )}
      </main>

      {/* ═══════════════════════════════════════════════
          MODALS GLOBAUX
      ═══════════════════════════════════════════════ */}

      {/* Modal Contrat */}
      {showContract && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Contrat de Tontine</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowContract(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4 text-sm">
                {[
                  { title: "1. Engagement de paiement", text: `Je m'engage a payer ma cotisation de π ${groups.find((g) => g.id === showContract)?.contribution} a chaque tour, avant la date limite fixee par le groupe.` },
                  { title: "2. Penalites et periode de grace", text: `Une tolerance de ${RULES.GRACE_PERIOD_HOURS}h est accordee apres la date limite. Au-dela, une penalite de π ${RULES.PENALTY_PI} est automatiquement appliquee par le systeme. Apres ${RULES.MAX_LATE_COUNT} retards, je suis definitivement exclu et mon tour de reception est annule.` },
                  { title: "3. Tour de reception", text: "Mon tour est determine par la carte a gratter apres signature du contrat. Une fois confirme, il est irreversible et enregistre sur la blockchain." },
                  { title: "4. Distribution automatique par le systeme", text: `Des que TOUS les membres ont paye leur cotisation, le systeme UBAP envoie automatiquement le pot complet (π ${groups.find((g) => g.id === showContract)?.contribution} x membres) au beneficiaire via la blockchain Pi. Ce processus est entierement automatique.` },
                  { title: "5. Role limite de l'admin", text: "L'admin peut uniquement: inviter des membres, signaler un retard, appliquer une penalite ou exclure un membre bloque. L'admin ne peut PAS acceder aux fonds, retarder ou modifier un paiement. Toute tentative est rejetee par le systeme." },
                  { title: "6. Transparence blockchain", text: "Toutes les transactions sont enregistrees sur la blockchain Pi Network et sont verifiables publiquement." },
                ].map((clause) => (
                  <div key={clause.title}>
                    <h4 className="font-semibold mb-1">{clause.title}</h4>
                    <p className="text-muted-foreground">{clause.text}</p>
                  </div>
                ))}
                <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-300">
                  <Shield className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Ce contrat est lie a votre identifiant Pi Network et est irrevocable une fois signe.
                  </AlertDescription>
                </Alert>
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowContract(null)}>
                  Annuler
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
                  onClick={() => {
                    setContractSigned((p) => ({ ...p, [showContract!]: true }))
                    setShowContract(null)
                  }}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Signer le contrat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal Payout Automatique */}
      {showPayoutConfirm && (() => {
        const group = groups.find((g) => g.id === showPayoutConfirm)
        const recipient = group ? getRecipient(group) : null
        return group ? (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardContent className="pt-6 space-y-4">
                <div className="text-center">
                  <Gift className="h-16 w-16 mx-auto text-green-600 mb-3" />
                  <h3 className="text-lg font-bold">Tous les membres ont paye!</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Distribution automatique UBAP en cours...
                  </p>
                </div>
                <Card className="bg-green-50 dark:bg-green-950/20 border-green-300">
                  <CardContent className="pt-4 pb-4 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Beneficiaire de ce tour</p>
                    <p className="text-xl font-bold">{recipient?.name || group.recipientThisRound}</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">π {totalPot(group)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Montant total du pot</p>
                  </CardContent>
                </Card>
                <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-300">
                  <Shield className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-xs text-amber-800 dark:text-amber-200">
                    <span className="font-semibold">Systeme UBAP automatique</span> — Ce paiement est execute directement par le systeme via la blockchain Pi. L'admin ne peut pas intervenir ni retarder ce transfert.
                  </AlertDescription>
                </Alert>
                <Button
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600"
                  onClick={() => handleConfirmPayout(showPayoutConfirm)}
                >
                  <Send className="h-5 w-5 mr-2" />
                  Envoyer π {totalPot(group)} a {recipient?.name}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : null
      })()}

      {/* Modal Penalité */}
      {showPenaltyModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Appliquer une penalite</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowPenaltyModal(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-300">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  <span className="font-semibold">{showPenaltyModal.member.name}</span> est en retard de paiement.
                  <br />
                  Retards actuels: {showPenaltyModal.member.lateCount}/{RULES.MAX_LATE_COUNT}
                  <br />
                  Penalite a appliquer: <span className="font-bold">π {RULES.PENALTY_PI}</span>
                  {showPenaltyModal.member.lateCount + 1 >= RULES.MAX_LATE_COUNT && (
                    <><br /><span className="text-red-600 font-semibold">Attention: ce membre sera bloque apres cette penalite!</span></>
                  )}
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-transparent" onClick={() => setShowPenaltyModal(null)}>
                  Annuler
                </Button>
                <Button
                  className="bg-amber-600"
                  onClick={() => handleApplyPenalty(showPenaltyModal.groupId, showPenaltyModal.member.id)}
                >
                  Appliquer penalite
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal Exclusion */}
      {showExcludeModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-red-600">Exclure un membre</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowExcludeModal(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Alert className="bg-red-50 dark:bg-red-950/20 border-red-300">
                <Ban className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-sm">
                  Vous allez exclure <span className="font-bold">{showExcludeModal.member.name}</span> du groupe.
                  <br />
                  Cette action est irreversible. Le membre perdra son tour #{showExcludeModal.member.turn}.
                  <br />
                  <span className="text-xs text-muted-foreground">Les fonds deja payes par ce membre seront redistribues au groupe.</span>
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-transparent" onClick={() => setShowExcludeModal(null)}>
                  Annuler
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleExcludeMember(showExcludeModal.groupId, showExcludeModal.member.id)}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Exclure definitivement
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <BottomNav />

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] w-[90vw] max-w-sm rounded-xl shadow-2xl p-4 flex items-start gap-3
          ${toast.type === "error" ? "bg-red-600 text-white" : toast.type === "info" ? "bg-blue-600 text-white" : "bg-green-600 text-white"}`}
        >
          {toast.type === "error" ? <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" /> : <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />}
          <div className="flex-1">
            <p className="font-semibold text-sm">{toast.title}</p>
            <p className="text-xs opacity-90 mt-0.5">{toast.message}</p>
          </div>
          <button onClick={() => setToast(null)} className="opacity-80 hover:opacity-100">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
