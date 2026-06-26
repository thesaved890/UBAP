"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Users,
  Plus,
  TrendingUp,
  Send,
  MessageCircle,
  X,
  Target,
  Coins,
  CheckCircle2,
  Info,
} from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { useUser } from "@/contexts/user-context"
import { initiatePiPayment } from "@/lib/pi-network-sdk"

export default function GroupSavingsPage() {
  const { user } = useUser()
  const currentUserId = user?.id || "demo-user-001"

  // Groupes d'épargne initiaux
  const initialGroups = [
    {
      id: "group-1",
      name: "Construction Mosquée Centrale",
      description: "Projet de construction d'une mosquée pour la communauté",
      category: "Religieux",
      target: 5000,
      currency: "Pi",
      collected: 3250,
      members: 45,
      creatorId: "other-user-456",
      creatorName: "Imam Hassan",
      membersList: [
        { id: "m1", name: "Ahmed K.", joinDate: "2026-01-10" },
        { id: "m2", name: "Fatima M.", joinDate: "2026-01-12" },
        { id: "m3", name: "Vous", joinDate: "2026-02-01" },
      ],
      contributions: [
        { name: "Ahmed K.", amount: 500, date: "2026-02-15", currency: "Pi" },
        { name: "Fatima M.", amount: 300, date: "2026-02-14", currency: "Pi" },
        { name: "Vous", amount: 200, date: "2026-02-10", currency: "Pi" },
      ],
      unreadMessages: 5,
      inviteCode: "GS-MOSQ01",
    },
    {
      id: "group-2",
      name: "Maison Familiale Kabamba",
      description: "Construction de la maison familiale à Kinshasa",
      category: "Familial",
      target: 8000,
      currency: "Pi",
      collected: 4500,
      members: 12,
      creatorId: currentUserId,
      creatorName: "Vous",
      membersList: [
        { id: "f1", name: "Papa Jean", joinDate: "2026-01-05" },
        { id: "f2", name: "Maman Marie", joinDate: "2026-01-05" },
        { id: "f3", name: "Oncle Paul", joinDate: "2026-01-08" },
        { id: "f4", name: "Vous", joinDate: "2026-01-05" },
      ],
      contributions: [
        { name: "Papa Jean", amount: 500, date: "2026-02-18", currency: "Pi" },
        { name: "Maman Marie", amount: 300, date: "2026-02-16", currency: "Pi" },
        { name: "Oncle Paul", amount: 200, date: "2026-02-12", currency: "Pi" },
      ],
      unreadMessages: 2,
      inviteCode: "GS-FAMIL02",
    },
  ]

  const [groups, setGroups] = useState(initialGroups)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showJoinGroup, setShowJoinGroup] = useState(false)
  const [showContribute, setShowContribute] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Record<string, string>>({})
  const [chatMessage, setChatMessage] = useState("")

  // Form states
  const [groupName, setGroupName] = useState("")
  const [groupDescription, setGroupDescription] = useState("")
  const [groupCategory, setGroupCategory] = useState("")
  const [groupTarget, setGroupTarget] = useState("")
  const [groupCurrency, setGroupCurrency] = useState("Pi")
  const [joinCode, setJoinCode] = useState("")
  const [contributionAmount, setContributionAmount] = useState("")
  const [showEditGroup, setShowEditGroup] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editTarget, setEditTarget] = useState("")
  const [showConvertToFiat, setShowConvertToFiat] = useState<string | null>(null)
  const [contributionProcessing, setContributionProcessing] = useState(false)
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState<{ title: string; message: string } | null>(null)
  const [convertCurrency, setConvertCurrency] = useState("CDF")
  const [toast, setToast] = useState<{ title: string; message: string; type?: "success" | "error" } | null>(null)

  const showToast = (title: string, message: string, type: "success" | "error" = "success") => {
    setToast({ title, message, type })
    setTimeout(() => setToast(null), 4000)
  }

  // Messages simulés
  const groupChats: Record<string, Array<{ user: string; message: string; time: string }>> = {
    "group-1": [
      { user: "Ahmed K.", message: "Alhamdulillah, nous progressons bien!", time: "14:30" },
      { user: "Imam Hassan", message: "Merci à tous pour vos contributions", time: "14:45" },
      { user: "Fatima M.", message: "Inch'Allah on atteindra l'objectif bientôt", time: "15:00" },
    ],
    "group-2": [
      { user: "Papa Jean", message: "La maison sera magnifique!", time: "10:20" },
      { user: "Vous", message: "Oui papa, encore quelques efforts!", time: "10:35" },
    ],
  }

  const handleEditGroup = (groupId: string) => {
    setGroups(groups.map(g => 
      g.id === groupId 
        ? { 
            ...g, 
            name: editName, 
            description: editDescription,
            target: parseFloat(editTarget) || g.target
          }
        : g
    ))
    setShowEditGroup(null)
    setShowSuccessModal({ title: "Groupe modifie", message: "Les modifications ont ete enregistrees avec succes." })
  }

  const handleConvertToFiat = (groupId: string) => {
    const group = groups.find(g => g.id === groupId)
    if (!group) return
    setShowSuccessModal({
      title: "Conversion initiee",
      message: `${group.collected} ${group.currency} seront convertis en ${convertCurrency} et envoyes a votre compte local.`
    })
    setShowConvertToFiat(null)
  }

  const handleCreateGroup = () => {
    if (!groupName || !groupTarget || !groupCategory) {
      showToast("Champs manquants", "Veuillez remplir tous les champs obligatoires.", "error")
      return
    }

    const inviteCode = `GS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    
    const newGroup = {
      id: `group-${Date.now()}`,
      name: groupName,
      description: groupDescription,
      category: groupCategory,
      target: parseFloat(groupTarget),
      currency: groupCurrency,
      collected: 0,
      members: 1,
      creatorId: currentUserId,
      creatorName: "Vous",
      membersList: [{ id: currentUserId, name: "Vous", joinDate: new Date().toISOString().split("T")[0] }],
      contributions: [],
      unreadMessages: 0,
      inviteCode,
    }

    setGroups([...groups, newGroup])
    setShowCreateGroup(false)
    setGroupName("")
    setGroupDescription("")
    setGroupCategory("")
    setGroupTarget("")
    setShowSuccessModal({
      title: "Groupe cree!",
      message: `Code d'invitation: ${inviteCode} — Partagez ce code avec vos membres pour qu'ils rejoignent le groupe.`
    })
  }

  const handleContribute = async (groupId: string) => {
    if (!contributionAmount || isNaN(parseFloat(contributionAmount))) {
      showToast("Montant invalide", "Veuillez entrer un montant valide.", "error")
      return
    }

    const amount = parseFloat(contributionAmount)
    const group = groups.find(g => g.id === groupId)
    if (!group) return

    setContributionProcessing(true)
    
    try {
      // If currency is Pi, use Pi payment SDK
      if (group.currency === "Pi") {
        await initiatePiPayment(
          amount,
          `Contribution - ${group.name}`,
          { groupId, type: "group_savings_contribution" }
        )
      }
      
      // Update group after successful payment
      setGroups(groups.map(g => 
        g.id === groupId 
          ? { 
              ...g, 
              collected: g.collected + amount,
              contributions: [
                { name: "Vous", amount, date: new Date().toISOString().split('T')[0], currency: g.currency },
                ...g.contributions
              ]
            }
          : g
      ))

      setShowContribute(null)
      setContributionAmount("")
      showToast("Contribution confirmee!", `${amount} ${group.currency} ajoutes au groupe "${group.name}".`, "success")
    } catch {
      showToast("Paiement echoue", "Paiement annule ou echoue. Veuillez reessayer.", "error")
    } finally {
      setContributionProcessing(false)
    }
  }

  const handleWithdraw = (groupId: string) => {
    const group = groups.find(g => g.id === groupId)
    if (!group) return

    setGroups(groups.map(g =>
      g.id === groupId ? { ...g, collected: 0, contributions: [] } : g
    ))
    setShowWithdrawConfirm(null)
    setShowSuccessModal({
      title: "Retrait effectue!",
      message: `${group.collected.toLocaleString()} ${group.currency} ont ete transferes vers votre portefeuille UBAP.`
    })
  }

  const handleSendMessage = (groupId: string) => {
    if (!chatMessage.trim()) return
    showToast("Message envoye", `Votre message a ete envoye au groupe.`, "success")
    setChatMessage("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/smart-savings">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Épargne Groupe</h1>
                <p className="text-xs text-white/80">Épargnez ensemble pour vos projets</p>
              </div>
            </div>
            <Users className="h-8 w-8" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            className="bg-gradient-to-r from-green-600 to-emerald-600"
            onClick={() => setShowCreateGroup(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Créer Groupe
          </Button>
          <Button 
            variant="outline"
            className="bg-transparent"
            onClick={() => setShowJoinGroup(true)}
          >
            <Send className="h-4 w-4 mr-2" />
            Rejoindre
          </Button>
        </div>

        {/* Create Group Modal */}
        {showCreateGroup && (
          <Card className="border-green-400">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">Créer un groupe d'épargne</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowCreateGroup(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Nom du groupe</Label>
                  <Input 
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Ex: Construction Mosquée, Maison Familiale..."
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Input 
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    placeholder="Décrivez l'objectif du groupe..."
                  />
                </div>

                <div>
                  <Label>Catégorie</Label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={groupCategory}
                    onChange={(e) => setGroupCategory(e.target.value)}
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Religieux">Religieux (Mosquée, Église)</option>
                    <option value="Familial">Familial (Maison, Événement)</option>
                    <option value="Communautaire">Communautaire (École, Hôpital)</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Objectif</Label>
                    <Input 
                      type="number"
                      value={groupTarget}
                      onChange={(e) => setGroupTarget(e.target.value)}
                      placeholder="50000"
                    />
                  </div>
                  <div>
                    <Label>Devise</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={groupCurrency}
                      onChange={(e) => setGroupCurrency(e.target.value)}
                    >
                      <option value="Pi">Pi Network (Recommandé)</option>
                      <optgroup label="Afrique Centrale">
                        <option value="CDF">Franc Congolais (CDF)</option>
                        <option value="XAF">Franc CFA CEMAC (XAF)</option>
                      </optgroup>
                      <optgroup label="Afrique de l'Ouest">
                        <option value="NGN">Naira Nigérian (NGN)</option>
                        <option value="GHS">Cedi Ghanéen (GHS)</option>
                        <option value="XOF">Franc CFA UEMOA (XOF)</option>
                      </optgroup>
                      <optgroup label="Afrique de l'Est">
                        <option value="KES">Shilling Kenyan (KES)</option>
                        <option value="UGX">Shilling Ougandais (UGX)</option>
                        <option value="TZS">Shilling Tanzanien (TZS)</option>
                      </optgroup>
                      <optgroup label="Afrique Australe">
                        <option value="ZAR">Rand Sud-Africain (ZAR)</option>
                        <option value="BWP">Pula Botswanais (BWP)</option>
                      </optgroup>
                      <optgroup label="Afrique du Nord">
                        <option value="EGP">Livre Égyptienne (EGP)</option>
                        <option value="MAD">Dirham Marocain (MAD)</option>
                      </optgroup>
                      <optgroup label="Autres">
                        <option value="USD">Dollar US (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Les contributions sont libres. Chaque membre donne ce qu'il veut, quand il veut.
                  </AlertDescription>
                </Alert>

                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                  onClick={handleCreateGroup}
                >
                  Créer le groupe
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Join Group Modal */}
        {showJoinGroup && (
          <Card className="border-blue-400">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">Rejoindre un groupe</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowJoinGroup(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Code d'invitation</Label>
                  <Input 
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="GS-XXXXX"
                  />
                </div>

                <Button 
                  className="w-full"
                  onClick={() => {
                    if (joinCode.trim()) {
                      showToast("Demande envoyee", `Votre demande pour rejoindre le groupe (code: ${joinCode}) a ete envoyee.`, "success")
                      setShowJoinGroup(false)
                      setJoinCode("")
                    }
                  }}
                >
                  Rejoindre
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Groups List */}
        {groups.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">Aucun groupe pour le moment</p>
            </CardContent>
          </Card>
        ) : (
          groups.map((group) => {
            const isAdmin = group.creatorId === currentUserId
            const progress = (group.collected / group.target) * 100
            
            return (
              <Card key={group.id}>
                <CardContent className="pt-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{group.name}</h3>
                        {isAdmin && (
                          <Badge variant="outline" className="text-xs">Admin</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{group.category}</Badge>
                        <span className="text-xs text-muted-foreground">
                          <Users className="h-3 w-3 inline mr-1" />
                          {group.members} membres
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">
                        {group.collected.toLocaleString()} {group.currency}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Objectif: {group.target.toLocaleString()} {group.currency}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-center">
                      {progress.toFixed(1)}% atteint
                    </p>
                  </div>

                  {/* Admin Controls */}
                  {isAdmin && !showEditGroup && (
                    <div className="flex gap-2 mb-4">
                      <Button 
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => {
                          setShowEditGroup(group.id)
                          setEditName(group.name)
                          setEditDescription(group.description)
                          setEditTarget(group.target.toString())
                        }}
                      >
                        Modifier groupe
                      </Button>
                      {progress >= 100 && (
                        <Button 
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => setShowConvertToFiat(group.id)}
                        >
                          Retirer & Convertir
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Edit Group Form (Admin Only) */}
                  {showEditGroup === group.id && (
                    <Card className="mb-4 border-amber-400">
                      <CardContent className="pt-4 space-y-3">
                        <h4 className="font-semibold">Modifier le groupe</h4>
                        <div>
                          <Label>Nom du groupe</Label>
                          <Input 
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Input 
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Objectif ({group.currency})</Label>
                          <Input 
                            type="number"
                            value={editTarget}
                            onChange={(e) => setEditTarget(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1"
                            onClick={() => handleEditGroup(group.id)}
                          >
                            Enregistrer
                          </Button>
                          <Button 
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => setShowEditGroup(null)}
                          >
                            Annuler
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Convert to Fiat Modal (Admin Only) */}
                  {showConvertToFiat === group.id && (
                    <Card className="mb-4 border-green-400">
                      <CardContent className="pt-4 space-y-3">
                        <h4 className="font-semibold">Retirer et Convertir en Fiat</h4>
                        <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200">
                          <CheckCircle2 className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            <p className="font-semibold">Objectif atteint!</p>
                            <p className="text-xs">Montant disponible: {group.collected} {group.currency}</p>
                          </AlertDescription>
                        </Alert>
                        <div>
                          <Label>Convertir en monnaie locale</Label>
                          <select className="w-full p-2 border rounded-md">
                            <optgroup label="Afrique Centrale">
                              <option value="CDF">Franc Congolais (CDF)</option>
                              <option value="XAF">Franc CFA CEMAC (XAF)</option>
                            </optgroup>
                            <optgroup label="Afrique de l'Ouest">
                              <option value="NGN">Naira Nigérian (NGN)</option>
                              <option value="GHS">Cedi Ghanéen (GHS)</option>
                              <option value="XOF">Franc CFA UEMOA (XOF)</option>
                              <option value="GMD">Dalasi Gambien (GMD)</option>
                              <option value="SLL">Leone Sierra-Léonais (SLL)</option>
                            </optgroup>
                            <optgroup label="Afrique de l'Est">
                              <option value="KES">Shilling Kenyan (KES)</option>
                              <option value="UGX">Shilling Ougandais (UGX)</option>
                              <option value="TZS">Shilling Tanzanien (TZS)</option>
                              <option value="RWF">Franc Rwandais (RWF)</option>
                              <option value="ETB">Birr Éthiopien (ETB)</option>
                            </optgroup>
                            <optgroup label="Afrique Australe">
                              <option value="ZAR">Rand Sud-Africain (ZAR)</option>
                              <option value="BWP">Pula Botswanais (BWP)</option>
                              <option value="ZMW">Kwacha Zambien (ZMW)</option>
                              <option value="MWK">Kwacha Malawite (MWK)</option>
                            </optgroup>
                            <optgroup label="Afrique du Nord">
                              <option value="EGP">Livre Égyptienne (EGP)</option>
                              <option value="MAD">Dirham Marocain (MAD)</option>
                              <option value="TND">Dinar Tunisien (TND)</option>
                              <option value="DZD">Dinar Algérien (DZD)</option>
                            </optgroup>
                            <optgroup label="Autres devises">
                              <option value="USD">Dollar US (USD)</option>
                              <option value="EUR">Euro (EUR)</option>
                            </optgroup>
                          </select>
                        </div>
                        <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                          <Info className="h-4 w-4" />
                          <AlertDescription className="text-xs">
                            Le montant sera converti au taux actuel et transféré vers votre compte UBAP en devise Fiat.
                          </AlertDescription>
                        </Alert>
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
                            onClick={() => handleConvertToFiat(group.id)}
                          >
                            Confirmer le retrait
                          </Button>
                          <Button 
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => setShowConvertToFiat(null)}
                          >
                            Annuler
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mb-4">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
                      onClick={() => setShowContribute(group.id)}
                    >
                      <Coins className="h-4 w-4 mr-2" />
                      Contribuer en {group.currency}
                    </Button>
                  </div>

                  {/* Contribute Modal */}
                  {showContribute === group.id && (
                    <Card className="mb-4 border-green-400">
                      <CardContent className="pt-4 space-y-3">
                        <h4 className="font-semibold">Faire une contribution</h4>
                        <div>
                          <Label>Montant ({group.currency})</Label>
                          <Input 
                            type="number"
                            value={contributionAmount}
                            onChange={(e) => setContributionAmount(e.target.value)}
                            placeholder="Entrez le montant..."
                          />
                        </div>
                        <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
                    onClick={() => handleContribute(group.id)}
                    disabled={contributionProcessing}
                  >
                    {contributionProcessing ? "Traitement..." : "Confirmer"}
                  </Button>
                          <Button 
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => {
                              setShowContribute(null)
                              setContributionAmount("")
                            }}
                          >
                            Annuler
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Tabs */}
                  <Tabs 
                    value={activeTab[group.id] || "contributions"} 
                    onValueChange={(value) => setActiveTab(prev => ({ ...prev, [group.id]: value }))}
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="contributions" className="text-[10px] sm:text-xs">
                        Contributions
                      </TabsTrigger>
                      <TabsTrigger value="members" className="text-[10px] sm:text-xs">
                        Membres
                      </TabsTrigger>
                      <TabsTrigger value="chat" className="text-[10px] sm:text-xs relative">
                        Chat
                        {group.unreadMessages > 0 && (
                          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                            {group.unreadMessages}
                          </span>
                        )}
                      </TabsTrigger>
                    </TabsList>

                    {/* Members Tab */}
                    <TabsContent value="members" className="space-y-2 mt-3">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-sm">Liste des membres</h4>
                        <Badge variant="outline">{group.members} membres</Badge>
                      </div>
                      {group.membersList && group.membersList.length > 0 ? (
                        <div className="space-y-2">
                          {group.membersList.map((member, idx) => (
                            <Card key={idx}>
                              <CardContent className="pt-3 pb-3">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center text-white font-bold">
                                    {member.name.charAt(0)}
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">Rejoint le {member.joinDate}</p>
                                  </div>
                                  {member.name === "Vous" && (
                                    <Badge variant="secondary" className="text-xs">Vous</Badge>
                                  )}
                                  {group.creatorName === member.name && (
                                    <Badge variant="outline" className="text-xs">Admin</Badge>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          Aucun membre pour le moment
                        </p>
                      )}
                      {isAdmin && (
                        <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 mt-3">
                          <Info className="h-4 w-4" />
                          <AlertDescription className="text-xs">
                            Code d'invitation: <span className="font-mono font-bold">{group.inviteCode}</span>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="ml-2 h-6 text-xs"
                              onClick={() => {
                                navigator.clipboard.writeText(group.inviteCode || '')
                                showToast("Code copie!", `Le code ${group.inviteCode} a ete copie.`, "success")
                              }}
                            >
                              Copier
                            </Button>
                          </AlertDescription>
                        </Alert>
                      )}
                    </TabsContent>

                    {/* Contributions Tab */}
                    <TabsContent value="contributions" className="space-y-2 mt-3">
                      {group.contributions.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          Aucune contribution pour le moment
                        </p>
                      ) : (
                        group.contributions.map((contrib, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <p className="font-medium text-sm">{contrib.name}</p>
                              <p className="text-xs text-muted-foreground">{contrib.date}</p>
                            </div>
                            <p className="font-bold text-green-600">
                              +{contrib.amount.toLocaleString()} {group.currency}
                            </p>
                          </div>
                        ))
                      )}
                    </TabsContent>

                    {/* Chat Tab */}
                    <TabsContent value="chat" className="space-y-3 mt-3">
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {(groupChats[group.id] || []).map((msg, idx) => (
                          <div key={idx} className="p-2 bg-muted rounded">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold">{msg.user}</span>
                              <span className="text-xs text-muted-foreground">{msg.time}</span>
                            </div>
                            <p className="text-sm">{msg.message}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Votre message..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(group.id)}
                        />
                        <Button onClick={() => handleSendMessage(group.id)}>
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
      </div>

      <BottomNav />

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg text-white text-sm max-w-sm w-[90%] text-center ${toast.type === "error" ? "bg-red-600" : "bg-green-600"}`}>
          <p className="font-semibold">{toast.title}</p>
          <p className="text-xs opacity-90">{toast.message}</p>
        </div>
      )}

      {/* Modal Succès */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full text-center space-y-4">
            <div className="h-16 w-16 mx-auto rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{showSuccessModal.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">{showSuccessModal.message}</p>
            </div>
            <Button className="w-full" onClick={() => setShowSuccessModal(null)}>
              Fermer
            </Button>
          </div>
        </div>
      )}

      {/* Modal Confirmation Retrait */}
      {showWithdrawConfirm && (() => {
        const grp = groups.find(g => g.id === showWithdrawConfirm)
        return grp ? (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-2xl p-6 max-w-sm w-full space-y-4">
              <h3 className="font-bold text-lg text-center">Confirmer le retrait</h3>
              <p className="text-sm text-muted-foreground text-center">
                Retirer <span className="font-semibold text-foreground">{grp.collected.toLocaleString()} {grp.currency}</span> du projet &quot;{grp.name}&quot;?
                <br /><span className="text-xs">Cette action est irréversible.</span>
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-transparent" onClick={() => setShowWithdrawConfirm(null)}>
                  Annuler
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleWithdraw(grp.id)}>
                  Confirmer
                </Button>
              </div>
            </div>
          </div>
        ) : null
      })()}
    </div>
  )
}
