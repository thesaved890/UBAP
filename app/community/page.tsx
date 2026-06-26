"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Trophy,
  Copy,
  CheckCircle,
  MessageCircle,
  TrendingUp,
  Share2,
  Crown,
  Gift,
  ArrowLeft,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function CommunityPage() {
  const [referralCode] = useState("UBAP-AF2024")
  const [copied, setCopied] = useState(false)

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const topTraders = [
    { rank: 1, name: "AfricanPioneer", country: "🇳🇬", growth: 245.8, followers: 1234 },
    { rank: 2, name: "GoldInvestor", country: "🇿🇦", growth: 198.3, followers: 892 },
    { rank: 3, name: "CryptoKing", country: "🇰🇪", growth: 176.5, followers: 756 },
    { rank: 4, name: "DiamondHands", country: "🇬🇭", growth: 145.2, followers: 634 },
    { rank: 5, name: "PiMaster", country: "🇪🇬", growth: 132.7, followers: 589 },
    { rank: 6, name: "StockPro", country: "🇲🇦", growth: 118.9, followers: 523 },
    { rank: 7, name: "WealthBuilder", country: "🇹🇿", growth: 105.4, followers: 487 },
    { rank: 8, name: "ForexTrader", country: "🇺🇬", growth: 98.6, followers: 445 },
  ]

  const featuredTraders = [
    {
      name: "AfricanPioneer",
      country: "🇳🇬 Nigeria",
      growth: 245.8,
      followers: 1234,
      portfolio: "$125,000",
      strategy: "Diversified crypto & stocks",
      winRate: "78%",
      following: false,
    },
    {
      name: "GoldInvestor",
      country: "🇿🇦 South Africa",
      growth: 198.3,
      followers: 892,
      portfolio: "$98,500",
      strategy: "Precious metals focus",
      winRate: "72%",
      following: true,
    },
    {
      name: "CryptoKing",
      country: "🇰🇪 Kenya",
      growth: 176.5,
      followers: 756,
      portfolio: "$87,200",
      strategy: "DeFi staking specialist",
      winRate: "69%",
      following: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Community</h1>
              <p className="text-xs opacity-90">Connect, Learn, and Grow Together</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <Tabs defaultValue="referral" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="referral">
              <Gift className="h-4 w-4 mr-2" />
              Referrals
            </TabsTrigger>
            <TabsTrigger value="leaderboard">
              <Trophy className="h-4 w-4 mr-2" />
              Leaders
            </TabsTrigger>
            <TabsTrigger value="social">
              <Users className="h-4 w-4 mr-2" />
              Trading
            </TabsTrigger>
          </TabsList>

          <TabsContent value="referral" className="space-y-4 mt-6">
            <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border-emerald-200 dark:border-emerald-800">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <Gift className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">Earn $10 in Pi</h2>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                      For each verified friend you invite
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Referral Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input value={referralCode} readOnly className="font-mono text-center text-lg" />
                  <Button onClick={copyReferralCode} className="shrink-0">
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Invite Link
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Referral Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">12</p>
                    <p className="text-xs text-muted-foreground">Invited</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">8</p>
                    <p className="text-xs text-muted-foreground">Verified</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">$80</p>
                    <p className="text-xs text-muted-foreground">Earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Referrals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "John D.", status: "Verified", reward: "$10", date: "2 days ago" },
                  { name: "Sarah M.", status: "Pending", reward: "-", date: "5 days ago" },
                  { name: "Ahmed K.", status: "Verified", reward: "$10", date: "1 week ago" },
                ].map((referral, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{referral.name}</p>
                      <p className="text-xs text-muted-foreground">{referral.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={referral.status === "Verified" ? "default" : "secondary"}>
                        {referral.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{referral.reward}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4 mt-6">
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-200 dark:border-amber-800">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-amber-900 dark:text-amber-100">Top African Investors</h2>
                  <p className="text-sm text-amber-700 dark:text-amber-300">Ranked by portfolio growth this month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Leaderboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {topTraders.map((trader) => (
                  <div
                    key={trader.rank}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      trader.rank <= 3
                        ? "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800"
                        : "bg-muted/50 hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-center w-8">
                      {trader.rank === 1 ? (
                        <Crown className="h-6 w-6 text-amber-500" />
                      ) : trader.rank === 2 ? (
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                      ) : trader.rank === 3 ? (
                        <div className="w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center text-xs font-bold text-white">
                          3
                        </div>
                      ) : (
                        <span className="text-sm font-semibold text-muted-foreground">{trader.rank}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{trader.name}</p>
                        <span className="text-sm">{trader.country}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{trader.followers} followers</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600">+{trader.growth}%</p>
                      <p className="text-xs text-muted-foreground">Growth</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4 mt-6">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">Social Trading</h2>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Follow successful traders and copy their portfolios
                  </p>
                </div>
              </CardContent>
            </Card>

            {featuredTraders.map((trader, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold">{trader.name}</h3>
                        {index === 0 && <Badge variant="secondary">Top Trader</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{trader.country}</p>
                    </div>
                    <Button variant={trader.following ? "outline" : "default"} size="sm">
                      {trader.following ? "Following" : "Follow"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="text-lg font-bold text-emerald-600">+{trader.growth}%</p>
                      <p className="text-xs text-muted-foreground">Growth</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="text-lg font-bold">{trader.portfolio}</p>
                      <p className="text-xs text-muted-foreground">Portfolio</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="text-lg font-bold">{trader.winRate}</p>
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-sm">
                      <span className="font-medium">Strategy:</span> {trader.strategy}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-transparent" variant="outline">
                      View Portfolio
                    </Button>
                    <Button className="flex-1" disabled={trader.following}>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {trader.following ? "Auto-Copying" : "Copy Trades"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    {trader.followers} people are following this trader
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              24/7 Customer Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Get help in your preferred language</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start bg-transparent">
                English
              </Button>
              <Button variant="outline" className="justify-start bg-transparent">
                Français
              </Button>
              <Button variant="outline" className="justify-start bg-transparent">
                Português
              </Button>
              <Button variant="outline" className="justify-start bg-transparent">
                العربية
              </Button>
            </div>
            <Button className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Live Chat
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
