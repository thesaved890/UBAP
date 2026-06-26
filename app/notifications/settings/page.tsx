"use client"

import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Bell,
  TrendingUp,
  Send,
  Shield,
  Gift,
  Megaphone,
  Mail,
  MessageSquare,
  Smartphone,
  Volume2,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function NotificationSettingsPage() {
  const [priceAlerts, setPriceAlerts] = useState(true)
  const [transactionConfirm, setTransactionConfirm] = useState(true)
  const [marketNews, setMarketNews] = useState(true)
  const [dividendPayments, setDividendPayments] = useState(true)
  const [stakingRewards, setStakingRewards] = useState(true)
  const [withdrawalApprovals, setWithdrawalApprovals] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [regulatoryUpdates, setRegulatoryUpdates] = useState(true)
  const [aiInsights, setAiInsights] = useState(true)

  const [pushNotif, setPushNotif] = useState(true)
  const [emailNotif, setEmailNotif] = useState(true)
  const [smsNotif, setSmsNotif] = useState(false)

  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="text-primary-foreground mb-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Notification Settings</h1>
          <p className="text-sm opacity-90 mt-1">Customize your alerts and preferences</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Notification Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="price-alerts" className="text-base font-semibold cursor-pointer">
                    Price Alerts
                  </Label>
                  <p className="text-xs text-muted-foreground">Custom threshold notifications</p>
                </div>
              </div>
              <Switch id="price-alerts" checked={priceAlerts} onCheckedChange={setPriceAlerts} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Send className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="transaction" className="text-base font-semibold cursor-pointer">
                    Transaction Confirmations
                  </Label>
                  <p className="text-xs text-muted-foreground">Instant push for sends/receives</p>
                </div>
              </div>
              <Switch id="transaction" checked={transactionConfirm} onCheckedChange={setTransactionConfirm} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Megaphone className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="market-news" className="text-base font-semibold cursor-pointer">
                    Market News
                  </Label>
                  <p className="text-xs text-muted-foreground">Breaking financial news</p>
                </div>
              </div>
              <Switch id="market-news" checked={marketNews} onCheckedChange={setMarketNews} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Gift className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="dividends" className="text-base font-semibold cursor-pointer">
                    Dividend Payments
                  </Label>
                  <p className="text-xs text-muted-foreground">Stock dividend notifications</p>
                </div>
              </div>
              <Switch id="dividends" checked={dividendPayments} onCheckedChange={setDividendPayments} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Gift className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="staking" className="text-base font-semibold cursor-pointer">
                    Staking Rewards
                  </Label>
                  <p className="text-xs text-muted-foreground">Crypto staking earnings</p>
                </div>
              </div>
              <Switch id="staking" checked={stakingRewards} onCheckedChange={setStakingRewards} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="withdrawals" className="text-base font-semibold cursor-pointer">
                    Withdrawal Approvals
                  </Label>
                  <p className="text-xs text-muted-foreground">Confirm withdrawal requests</p>
                </div>
              </div>
              <Switch id="withdrawals" checked={withdrawalApprovals} onCheckedChange={setWithdrawalApprovals} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-red-600" />
                <div>
                  <Label htmlFor="security" className="text-base font-semibold cursor-pointer">
                    Security Alerts
                    <Badge variant="destructive" className="ml-2 text-xs">
                      Critical
                    </Badge>
                  </Label>
                  <p className="text-xs text-muted-foreground">New device login, password changes</p>
                </div>
              </div>
              <Switch id="security" checked={securityAlerts} onCheckedChange={setSecurityAlerts} disabled />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Megaphone className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="regulatory" className="text-base font-semibold cursor-pointer">
                    Regulatory Updates
                  </Label>
                  <p className="text-xs text-muted-foreground">African crypto regulations</p>
                </div>
              </div>
              <Switch id="regulatory" checked={regulatoryUpdates} onCheckedChange={setRegulatoryUpdates} />
            </div>

            <div className="flex items-center justify-between py-2 border-t pt-4">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 text-amber-500">✨</div>
                <div>
                  <Label htmlFor="ai-insights" className="text-base font-semibold cursor-pointer">
                    AI-Powered Insights
                    <Badge variant="secondary" className="ml-2 text-xs bg-amber-500/20 text-amber-700">
                      New
                    </Badge>
                  </Label>
                  <p className="text-xs text-muted-foreground">Smart recommendations & analysis</p>
                </div>
              </div>
              <Switch id="ai-insights" checked={aiInsights} onCheckedChange={setAiInsights} />
            </div>
          </CardContent>
        </Card>

        {/* Notification Channels */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notification Channels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="push" className="text-base font-semibold cursor-pointer">
                    Push Notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">Real-time mobile alerts</p>
                </div>
              </div>
              <Switch id="push" checked={pushNotif} onCheckedChange={setPushNotif} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="email" className="text-base font-semibold cursor-pointer">
                    Email Summaries
                  </Label>
                  <p className="text-xs text-muted-foreground">Daily/weekly digest</p>
                </div>
              </div>
              <Switch id="email" checked={emailNotif} onCheckedChange={setEmailNotif} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="sms" className="text-base font-semibold cursor-pointer">
                    SMS Alerts
                  </Label>
                  <p className="text-xs text-muted-foreground">Critical alerts only</p>
                </div>
              </div>
              <Switch id="sms" checked={smsNotif} onCheckedChange={setSmsNotif} />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="quiet-hours" className="text-base font-semibold cursor-pointer">
                    Quiet Hours
                  </Label>
                  <p className="text-xs text-muted-foreground">Silence notifications at night</p>
                </div>
              </div>
              <Switch id="quiet-hours" checked={quietHoursEnabled} onCheckedChange={setQuietHoursEnabled} />
            </div>

            {quietHoursEnabled && (
              <div className="ml-11 space-y-3 pb-2">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label htmlFor="start-time" className="text-sm">
                      Start Time
                    </Label>
                    <Input type="time" id="start-time" defaultValue="22:00" className="mt-1" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="end-time" className="text-sm">
                      End Time
                    </Label>
                    <Input type="time" id="end-time" defaultValue="07:00" className="mt-1" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="sound" className="text-base font-semibold cursor-pointer">
                    Notification Sound
                  </Label>
                  <p className="text-xs text-muted-foreground">Play sound for alerts</p>
                </div>
              </div>
              <Switch id="sound" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
              <div>
                <p className="font-semibold text-sm mb-1">Smart Notifications</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Our AI analyzes your portfolio and market trends to send you personalized insights and actionable
                  recommendations. Security alerts cannot be disabled for your protection.
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
