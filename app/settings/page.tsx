"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Shield,
  Fingerprint,
  Smartphone,
  Lock,
  Bell,
  Eye,
  Moon,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  AlertTriangle,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { useState } from "react"
import { usePiAuth } from "@/contexts/pi-auth-context"

export default function SettingsPage() {
  const { logout } = usePiAuth()
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [faceIdEnabled, setFaceIdEnabled] = useState(true)
  const [transactionNotifs, setTransactionNotifs] = useState(true)
  const [marketNotifs, setMarketNotifs] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="max-w-lg mx-auto">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-primary-foreground mb-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm opacity-90 mt-1">Manage your account and security</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile */}
        <Link href="/profile">
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">AO</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Adebayo Oluwaseun</h3>
                  <p className="text-sm text-muted-foreground">adebayo.o@ubap.africa</p>
                  <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-100">
                    Pi Network Verified
                  </Badge>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/profile">
          <Card className="border-primary/30 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Increase Your Limits</p>
                  <p className="text-xs text-muted-foreground">
                    Update your account status for higher transaction limits
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Fingerprint className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label htmlFor="biometric" className="text-base font-semibold cursor-pointer">
                    Biometric Authentication
                  </Label>
                  <p className="text-xs text-muted-foreground">Use fingerprint to unlock</p>
                </div>
              </div>
              <Switch id="biometric" checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label htmlFor="faceid" className="text-base font-semibold cursor-pointer">
                    Face ID
                  </Label>
                  <p className="text-xs text-muted-foreground">Enable facial recognition</p>
                </div>
              </div>
              <Switch id="faceid" checked={faceIdEnabled} onCheckedChange={setFaceIdEnabled} />
            </div>

            <Button variant="outline" className="w-full justify-between bg-transparent">
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Change Transaction PIN
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button variant="outline" className="w-full justify-between bg-transparent">
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Change Password
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Link href="/security">
              <Button variant="outline" className="w-full justify-between bg-transparent">
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Advanced Security
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <Label htmlFor="transaction-notifs" className="text-base font-semibold cursor-pointer">
                  Transaction Alerts
                </Label>
                <p className="text-xs text-muted-foreground">Get notified for all transactions</p>
              </div>
              <Switch id="transaction-notifs" checked={transactionNotifs} onCheckedChange={setTransactionNotifs} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <Label htmlFor="market-notifs" className="text-base font-semibold cursor-pointer">
                  Market Updates
                </Label>
                <p className="text-xs text-muted-foreground">Price changes and trends</p>
              </div>
              <Switch id="market-notifs" checked={marketNotifs} onCheckedChange={setMarketNotifs} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <Label htmlFor="security-alerts" className="text-base font-semibold cursor-pointer">
                  Security Alerts
                </Label>
                <p className="text-xs text-muted-foreground">Suspicious activity warnings</p>
              </div>
              <Switch id="security-alerts" checked={securityAlerts} onCheckedChange={setSecurityAlerts} />
            </div>
          </CardContent>
        </Card>

        <Link href="/privacy">
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-base">Privacy Controls</p>
                    <p className="text-xs text-muted-foreground">Manage your data and privacy settings</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-between bg-transparent">
              <span className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                Appearance
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">System</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </Button>

            <Button variant="outline" className="w-full justify-between bg-transparent">
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Language
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">English</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-between bg-transparent">
              <span className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Help Center
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button variant="outline" className="w-full justify-between bg-transparent">
              <span>Terms of Service</span>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button variant="outline" className="w-full justify-between bg-transparent">
              <span>Privacy Policy</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Security Status */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
              <div>
                <p className="font-semibold text-sm mb-1">Security Status: Strong</p>
                <p className="text-xs text-muted-foreground">
                  Protected with AES-256 encryption, TLS 1.3 transmission security, and $250,000 insurance coverage. 95%
                  of crypto assets stored in cold storage.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="destructive" className="w-full" size="lg" onClick={logout}>
          <LogOut className="h-5 w-5 mr-2" />
          Log Out
        </Button>

        <p className="text-center text-xs text-muted-foreground">Version 1.0.0 - UBAP 2024</p>
        
        {/* Hidden Admin Access - Discrete link */}
        <Link href="/admin-secret">
          <p className="text-center text-[10px] text-muted-foreground/30 hover:text-primary transition-colors mt-2">
            Admin
          </p>
        </Link>
      </main>

      <BottomNav />
    </div>
  )
}
