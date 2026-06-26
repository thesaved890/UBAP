"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Users,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Download,
  Eye,
  Lock,
  Unlock,
  DollarSign,
  Calendar,
  Clock,
  Ban,
  BarChart3,
} from "lucide-react"

export default function AdminTontinePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  // Simulated admin data
  const adminStats = {
    totalGroups: 47,
    activeGroups: 42,
    suspendedGroups: 5,
    totalMembers: 1834,
    totalFundsLocked: 125.4567, // Pi
    pendingDistributions: 15,
    completedThisMonth: 38,
    flaggedTransactions: 3,
  }

  const tontineGroups = [
    {
      id: "TG001",
      name: "Pioneers du Congo",
      members: 50,
      contribution: 0.0005,
      frequency: "Monthly",
      nextCollection: "2024-02-12",
      nextDistribution: "2024-02-15",
      nextRecipient: "Jean Kabila",
      fundsLocked: 5.4321,
      status: "active",
      completedCycles: 3,
      country: "DRC",
      currency: "CDF",
      createdDate: "2023-11-15",
      lastActivity: "2024-01-12",
    },
    {
      id: "TG002",
      name: "Femmes Entrepreneures",
      members: 30,
      contribution: 0.001,
      frequency: "Monthly",
      nextCollection: "2024-02-12",
      nextDistribution: "2024-02-15",
      nextRecipient: "Marie Ngoie",
      fundsLocked: 8.2156,
      status: "active",
      completedCycles: 5,
      country: "Cameroon",
      currency: "XAF",
      createdDate: "2023-09-20",
      lastActivity: "2024-01-12",
    },
    {
      id: "TG003",
      name: "Tontine Lagos",
      members: 20,
      contribution: 0.0008,
      frequency: "Monthly",
      nextCollection: "2024-02-12",
      nextDistribution: "2024-02-15",
      nextRecipient: "Ade Johnson",
      fundsLocked: 3.1234,
      status: "flagged",
      completedCycles: 2,
      country: "Nigeria",
      currency: "NGN",
      createdDate: "2023-12-01",
      lastActivity: "2024-01-05",
      flagReason: "Member reported non-payment",
    },
    {
      id: "TG004",
      name: "Solidarité Abidjan",
      members: 15,
      contribution: 0.0003,
      frequency: "Bi-weekly",
      nextCollection: "2024-02-12",
      nextDistribution: "2024-02-15",
      nextRecipient: "Kofi Mensah",
      fundsLocked: 1.8901,
      status: "suspended",
      completedCycles: 1,
      country: "Ivory Coast",
      currency: "XOF",
      createdDate: "2023-12-15",
      lastActivity: "2024-01-20",
      suspendReason: "Multiple payment failures",
    },
  ]

  const recentTransactions = [
    {
      id: "TX001",
      groupId: "TG001",
      groupName: "Pioneers du Congo",
      type: "collection",
      amount: 0.025,
      member: "Jean Kabila",
      status: "completed",
      date: "2024-01-12",
      time: "09:15 AM",
    },
    {
      id: "TX002",
      groupId: "TG002",
      groupName: "Femmes Entrepreneures",
      type: "distribution",
      amount: 0.03,
      recipient: "Marie Ngoie",
      status: "completed",
      date: "2024-01-15",
      time: "10:30 AM",
      localAmount: "9,453,770 XAF",
    },
    {
      id: "TX003",
      groupId: "TG003",
      groupName: "Tontine Lagos",
      type: "collection",
      amount: 0.016,
      member: "Ade Johnson",
      status: "failed",
      date: "2024-01-12",
      time: "09:20 AM",
      reason: "Insufficient balance",
    },
  ]

  const filteredGroups = tontineGroups.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         group.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || group.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-100"
      case "flagged": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-100"
      case "suspended": return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-100"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 bg-transparent">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Tontine Management</h1>
              <p className="text-sm opacity-90">Monitor and control all tontine groups</p>
            </div>
          </div>

          {/* Admin Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4" />
                  <p className="text-xs opacity-90">Total Groups</p>
                </div>
                <p className="text-2xl font-bold">{adminStats.totalGroups}</p>
                <p className="text-xs opacity-75">{adminStats.activeGroups} active</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4" />
                  <p className="text-xs opacity-90">Total Members</p>
                </div>
                <p className="text-2xl font-bold">{adminStats.totalMembers.toLocaleString()}</p>
                <p className="text-xs opacity-75">Across all groups</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="h-4 w-4" />
                  <p className="text-xs opacity-90">Funds Locked</p>
                </div>
                <p className="text-2xl font-bold">π {adminStats.totalFundsLocked.toFixed(4)}</p>
                <p className="text-xs opacity-75">≈ ${(adminStats.totalFundsLocked * 314159).toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4" />
                  <p className="text-xs opacity-90">Pending Issues</p>
                </div>
                <p className="text-2xl font-bold">{adminStats.flaggedTransactions}</p>
                <p className="text-xs opacity-75">Require attention</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by group name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tontine Groups List */}
        <div className="grid gap-4">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{group.name}</h3>
                      <Badge className={getStatusColor(group.status)}>
                        {group.status}
                      </Badge>
                      {group.status === "flagged" && (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">ID: {group.id} • {group.country}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Members</p>
                    <p className="font-semibold">{group.members}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Contribution</p>
                    <p className="font-semibold">π {group.contribution}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Funds Locked</p>
                    <p className="font-semibold text-green-600">π {group.fundsLocked.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Completed Cycles</p>
                    <p className="font-semibold">{group.completedCycles}</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">Next Collection</p>
                        <p className="text-sm font-semibold">{group.nextCollection}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">Next Distribution</p>
                        <p className="text-sm font-semibold">{group.nextDistribution}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">Next Recipient</p>
                        <p className="text-sm font-semibold">{group.nextRecipient}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {group.status === "flagged" && group.flagReason && (
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">Flag Reason</p>
                        <p className="text-xs text-yellow-700 dark:text-yellow-300">{group.flagReason}</p>
                      </div>
                    </div>
                  </div>
                )}

                {group.status === "suspended" && group.suspendReason && (
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-3">
                    <div className="flex items-start gap-2">
                      <Ban className="h-4 w-4 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-900 dark:text-red-100">Suspension Reason</p>
                        <p className="text-xs text-red-700 dark:text-red-300">{group.suspendReason}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {group.status === "active" && (
                    <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                      <Ban className="h-4 w-4 mr-2" />
                      Suspend Group
                    </Button>
                  )}
                  {group.status === "suspended" && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Unlock className="h-4 w-4 mr-2" />
                      Reactivate Group
                    </Button>
                  )}
                  {group.status === "flagged" && (
                    <>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Investigate
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Clear Flag
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {tx.type === "collection" ? "Collection" : "Distribution"}
                      </Badge>
                      <p className="font-semibold text-sm">{tx.groupName}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {tx.type === "collection" ? `From: ${tx.member}` : `To: ${tx.recipient}`}
                    </p>
                    {tx.localAmount && (
                      <p className="text-xs text-green-600 font-medium">{tx.localAmount}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold">π {tx.amount.toFixed(4)}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                    <Badge className={tx.status === "completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fund Security Info */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Fund Security System</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  All tontine funds are held in secure UBAP escrow accounts. Automated smart contracts handle collections on the 12th and distributions on the 15th of each month. Funds are converted to recipient's local currency at GCV rate ($314,159/Pi) before distribution.
                </p>
                <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                  <li>✓ Multi-signature wallet security</li>
                  <li>✓ Real-time blockchain verification</li>
                  <li>✓ Automatic fraud detection</li>
                  <li>✓ Complete transaction audit trail</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
