"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  ArrowRightLeft,
  Settings,
  BarChart3,
  FileText,
  AlertTriangle,
  LogOut,
  Search,
  Ban,
  Check,
  Trash2,
  Eye,
  DollarSign,
  TrendingUp,
  Activity,
  Clock,
  X,
  CheckCircle,
} from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [sessionTime, setSessionTime] = useState(15 * 60)
  const [exchangeRate, setExchangeRate] = useState("314159")
  const [withdrawalLimit, setWithdrawalLimit] = useState("10000")
  const [transferFee, setTransferFee] = useState("2.5")

  useEffect(() => {
    const isAdminLoggedIn = sessionStorage.getItem("ubap_admin_session")
    if (isAdminLoggedIn !== "true") {
      router.push("/admin-secret")
      return
    }

    const timer = setInterval(() => {
      setSessionTime((prev) => {
        if (prev <= 1) {
          handleLogout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const resetTimer = () => {
      setSessionTime(15 * 60)
    }

    window.addEventListener("mousemove", resetTimer)
    window.addEventListener("keypress", resetTimer)
    window.addEventListener("click", resetTimer)

    return () => {
      clearInterval(timer)
      window.removeEventListener("mousemove", resetTimer)
      window.removeEventListener("keypress", resetTimer)
      window.removeEventListener("click", resetTimer)
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("ubap_admin_session")
    sessionStorage.removeItem("ubap_admin_login_time")
    router.push("/admin-secret")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleBlockUser = (userId: number, userName: string) => {
    alert(`Utilisateur ${userName} (ID: ${userId}) a été bloqué`)
  }

  const handleUnblockUser = (userId: number, userName: string) => {
    alert(`Utilisateur ${userName} (ID: ${userId}) a été débloqué`)
  }

  const handleDeleteUser = (userId: number, userName: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${userName}?`)) {
      alert(`Utilisateur ${userName} (ID: ${userId}) a été supprimé`)
    }
  }

  const handleViewUserDetails = (userId: number, userName: string) => {
    alert(`Détails de l'utilisateur ${userName}\nID: ${userId}\nSolde, transactions et historique complet disponibles`)
  }

  const handleApproveTransaction = (txnId: string) => {
    alert(`Transaction ${txnId} approuvée`)
  }

  const handleCancelTransaction = (txnId: string) => {
    alert(`Transaction ${txnId} annulée`)
  }

  const handleSaveSettings = () => {
    alert(`Paramètres sauvegardés:\n- Taux Pi: $${Number(exchangeRate).toLocaleString()}\n- Limite retrait: $${withdrawalLimit}\n- Frais: ${transferFee}%`)
  }

  const users = [
    {
      id: 1,
      name: "Adebayo Oluwaseun",
      email: "adebayo.o@ubap.africa",
      balance: 12453.67,
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Aminata Diallo",
      email: "aminata.d@ubap.africa",
      balance: 8932.45,
      status: "active",
      joinDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Kwame Mensah",
      email: "kwame.m@ubap.africa",
      balance: 450.0,
      status: "blocked",
      joinDate: "2024-03-10",
    },
  ]

  const transactions = [
    {
      id: "TRX001",
      user: "Adebayo Oluwaseun",
      type: "Retrait",
      amount: 500.0,
      status: "pending",
      date: "2024-12-15 14:30",
    },
    {
      id: "TRX002",
      user: "Aminata Diallo",
      type: "Dépôt",
      amount: 1000.0,
      status: "completed",
      date: "2024-12-15 12:15",
    },
    {
      id: "TRX003",
      user: "Kwame Mensah",
      type: "Transfert",
      amount: 2500.0,
      status: "suspicious",
      date: "2024-12-15 09:45",
    },
  ]

  const activityLogs = [
    { time: "15:45", action: "Blocage utilisateur", admin: "Admin", details: "Kwame Mensah bloqué" },
    { time: "14:30", action: "Modification paramètres", admin: "Admin", details: "Taux de change modifié" },
    { time: "12:15", action: "Validation transaction", admin: "Admin", details: "TRX002 approuvée" },
  ]

  const securityAlerts = [
    {
      id: 1,
      type: "Connexion échouée",
      message: "3 tentatives de connexion échouées",
      severity: "high",
      time: "Il y a 2h",
    },
    {
      id: 2,
      type: "Transaction inhabituelle",
      message: "Transaction de $5,000 détectée",
      severity: "medium",
      time: "Il y a 5h",
    },
  ]

  return (
    <div className="min-h-screen bg-emerald-50 pb-6">
      <header className="bg-emerald-700 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Administration UBAP</h1>
            <p className="text-sm text-emerald-100">Panneau de contrôle</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-600 px-4 py-2 rounded-lg">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{formatTime(sessionTime)}</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-white text-emerald-700 hover:bg-emerald-50 border-emerald-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-emerald-200 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Utilisateurs actifs</p>
                  <p className="text-3xl font-bold text-emerald-700">1,247</p>
                </div>
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Transactions/jour</p>
                  <p className="text-3xl font-bold text-emerald-700">3,492</p>
                </div>
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Revenus</p>
                  <p className="text-3xl font-bold text-emerald-700">$42.5K</p>
                </div>
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Alertes</p>
                  <p className="text-3xl font-bold text-red-600">12</p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-emerald-200">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <CardHeader className="border-b border-emerald-100 pb-0">
              <TabsList className="grid w-full grid-cols-6 bg-emerald-50 h-auto">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white py-3"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white py-3"
                >
                  <Users className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Utilisateurs</span>
                </TabsTrigger>
                <TabsTrigger
                  value="transactions"
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white py-3"
                >
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Transactions</span>
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white py-3"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Paramètres</span>
                </TabsTrigger>
                <TabsTrigger
                  value="logs"
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white py-3"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Journal</span>
                </TabsTrigger>
                <TabsTrigger
                  value="alerts"
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white py-3"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Alertes</span>
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="pt-6">
              <TabsContent value="overview" className="space-y-4 mt-0">
                <h3 className="text-xl font-bold text-emerald-900 mb-4">Statistiques en temps réel</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-emerald-100">
                    <CardHeader>
                      <CardTitle className="text-base">Revenus mensuels</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Janvier</span>
                          <span className="font-semibold">$45,231</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Février</span>
                          <span className="font-semibold">$52,847</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Mars</span>
                          <span className="font-semibold text-emerald-700">$68,392</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-emerald-100">
                    <CardHeader>
                      <CardTitle className="text-base">Croissance utilisateurs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        <span className="text-2xl font-bold text-emerald-700">+23.5%</span>
                      </div>
                      <p className="text-sm text-gray-600">Nouveaux utilisateurs ce mois</p>
                      <p className="text-lg font-semibold mt-2">342 nouveaux membres</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="users" className="space-y-4 mt-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-emerald-900">Gestion des Utilisateurs</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64 border-emerald-300"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {users.map((user) => (
                    <Card key={user.id} className="border-emerald-100">
                      <CardContent className="pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-lg font-bold text-emerald-700">{user.name[0]}</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                              <p className="text-xs text-gray-500">Inscrit: {user.joinDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Solde</p>
                              <p className="text-lg font-bold text-emerald-700">${user.balance.toLocaleString()}</p>
                            </div>
                            <Badge
                              variant={user.status === "active" ? "default" : "destructive"}
                              className={user.status === "active" ? "bg-emerald-600" : ""}
                            >
                              {user.status === "active" ? "Actif" : "Bloqué"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-300 text-emerald-700 bg-transparent"
                            onClick={() => handleViewUserDetails(user.id, user.name)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Détails
                          </Button>
                          {user.status === "active" ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-300 text-red-700 bg-transparent"
                              onClick={() => handleBlockUser(user.id, user.name)}
                            >
                              <Ban className="h-4 w-4 mr-1" />
                              Bloquer
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-emerald-300 text-emerald-700 bg-transparent"
                              onClick={() => handleUnblockUser(user.id, user.name)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Débloquer
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-700 bg-transparent"
                            onClick={() => handleDeleteUser(user.id, user.name)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Supprimer
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4 mt-0">
                <h3 className="text-xl font-bold text-emerald-900 mb-4">Gestion des Transactions</h3>

                <div className="space-y-3">
                  {transactions.map((txn) => (
                    <Card key={txn.id} className="border-emerald-100">
                      <CardContent className="pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 flex-wrap">
                              <p className="font-mono font-semibold text-emerald-700">{txn.id}</p>
                              <Badge
                                variant={
                                  txn.status === "completed" ? "default" : txn.status === "pending" ? "secondary" : "destructive"
                                }
                                className={txn.status === "completed" ? "bg-emerald-600" : ""}
                              >
                                {txn.status === "completed"
                                  ? "Complété"
                                  : txn.status === "pending"
                                    ? "En attente"
                                    : "Suspect"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{txn.user}</p>
                            <p className="text-xs text-gray-500">{txn.date}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-600">{txn.type}</p>
                              <p className="text-lg font-bold text-gray-900">${txn.amount.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                        {txn.status === "pending" || txn.status === "suspicious" ? (
                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white"
                              onClick={() => handleApproveTransaction(txn.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Valider
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-300 text-red-700 bg-transparent"
                              onClick={() => handleCancelTransaction(txn.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Annuler
                            </Button>
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4 mt-0">
                <h3 className="text-xl font-bold text-emerald-900 mb-4">Paramètres Système</h3>

                <Card className="border-emerald-100">
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Taux de change Pi Network (USD)
                      </label>
                      <Input
                        type="number"
                        value={exchangeRate}
                        onChange={(e) => setExchangeRate(e.target.value)}
                        className="border-emerald-300"
                        placeholder="314159"
                      />
                      <p className="text-xs text-gray-500 mt-1">Prix actuel: 1 Pi = ${Number(exchangeRate).toLocaleString()}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Limite de retrait quotidien ($)</label>
                      <Input
                        type="number"
                        value={withdrawalLimit}
                        onChange={(e) => setWithdrawalLimit(e.target.value)}
                        className="border-emerald-300"
                        placeholder="10000"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Frais de transfert (%)</label>
                      <Input
                        type="number"
                        value={transferFee}
                        onChange={(e) => setTransferFee(e.target.value)}
                        className="border-emerald-300"
                        placeholder="2.5"
                        step="0.1"
                      />
                    </div>

                    <Button onClick={handleSaveSettings} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                      Sauvegarder les paramètres
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="logs" className="space-y-4 mt-0">
                <h3 className="text-xl font-bold text-emerald-900 mb-4">Journal d{"'"}activité</h3>

                <div className="space-y-2">
                  {activityLogs.map((log, index) => (
                    <Card key={index} className="border-emerald-100">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-gray-900">{log.action}</p>
                              <span className="text-xs text-gray-500">{log.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                            <p className="text-xs text-gray-500 mt-1">Par: {log.admin}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-4 mt-0">
                <h3 className="text-xl font-bold text-emerald-900 mb-4">Alertes de sécurité</h3>

                <div className="space-y-3">
                  {securityAlerts.map((alert) => (
                    <Card
                      key={alert.id}
                      className={`border-2 ${alert.severity === "high" ? "border-red-300 bg-red-50" : "border-orange-300 bg-orange-50"}`}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-4">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${alert.severity === "high" ? "bg-red-100" : "bg-orange-100"}`}
                          >
                            <AlertTriangle
                              className={`h-5 w-5 ${alert.severity === "high" ? "text-red-600" : "text-orange-600"}`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-gray-900">{alert.type}</p>
                              <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                                {alert.severity === "high" ? "Urgent" : "Moyen"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                            <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </main>
    </div>
  )
}
