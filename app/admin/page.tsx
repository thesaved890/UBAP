"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Shield,
  TrendingUp,
  AlertTriangle,
  Settings,
  BarChart3,
  CreditCard,
  ArrowLeft,
  Lock,
  DollarSign,
} from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 bg-transparent">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">UBAP Admin Dashboard</h1>
              <p className="text-sm opacity-90">Système de gestion et surveillance</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Admin Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/tontine">
            <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-105 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-full bg-green-600 flex items-center justify-center">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-green-900 dark:text-green-100">Tontine Management</h3>
                    <p className="text-xs text-green-700 dark:text-green-300">Gérer les groupes</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-100 text-green-800">47 Groups</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">3 Alerts</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/wallet-config">
            <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-105 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-full bg-orange-600 flex items-center justify-center">
                    <DollarSign className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-orange-900 dark:text-orange-100">Wallet Config</h3>
                    <p className="text-xs text-orange-700 dark:text-orange-300">App wallet setup</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-orange-100 text-orange-800">Configure</Badge>
                  <Badge className="bg-green-100 text-green-800">Ready</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/wallet">
            <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-105 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-full bg-purple-600 flex items-center justify-center">
                    <CreditCard className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100">Wallet Balance</h3>
                    <p className="text-xs text-purple-700 dark:text-purple-300">View transactions</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-purple-100 text-purple-800">Monitor</Badge>
                  <Badge className="bg-green-100 text-green-800">Live</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-105 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100">Escrow Services</h3>
                  <p className="text-xs text-blue-700 dark:text-blue-300">Transactions sécurisées</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-800">125 Active</Badge>
                <Badge className="bg-green-100 text-green-800">Secure</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Overview */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Aperçu du Système
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Total Users</p>
                <p className="text-2xl font-bold">12,456</p>
                <p className="text-xs text-green-600">+12% ce mois</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Total Pi Volume</p>
                <p className="text-2xl font-bold">π 4,521</p>
                <p className="text-xs text-muted-foreground">$1.42B USD</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Transactions Today</p>
                <p className="text-2xl font-bold">3,847</p>
                <p className="text-xs text-green-600">+8% vs hier</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Pending Issues</p>
                <p className="text-2xl font-bold text-yellow-600">12</p>
                <p className="text-xs text-muted-foreground">À résoudre</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Status */}
        <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-green-900 dark:text-green-100 mb-2">Sécurité du Système</h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Tous les systèmes sont opérationnels. La surveillance automatique détecte et prévient les fraudes en temps réel.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
