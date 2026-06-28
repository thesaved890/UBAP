"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, Download, Trash2, FileText } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { useState } from "react"

export default function PrivacyPage() {
  const [hideBalances, setHideBalances] = useState(false)
  const [hideTransactions, setHideTransactions] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="max-w-lg mx-auto">
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="text-primary-foreground mb-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Privacy Controls</h1>
          <p className="text-sm opacity-90 mt-1">Manage your data and privacy</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Display Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {hideBalances ? (
                    <EyeOff className="h-5 w-5 text-primary" />
                  ) : (
                    <Eye className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <Label htmlFor="hide-balances" className="text-base font-semibold cursor-pointer">
                    Hide Balances
                  </Label>
                  <p className="text-xs text-muted-foreground">Show asterisks instead of amounts</p>
                </div>
              </div>
              <Switch id="hide-balances" checked={hideBalances} onCheckedChange={setHideBalances} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label htmlFor="hide-transactions" className="text-base font-semibold cursor-pointer">
                    Hide Transaction Details
                  </Label>
                  <p className="text-xs text-muted-foreground">Blur amounts on history screen</p>
                </div>
              </div>
              <Switch id="hide-transactions" checked={hideTransactions} onCheckedChange={setHideTransactions} />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download My Data
            </Button>
            <p className="text-xs text-muted-foreground px-1">
              Export all your account data including transactions, balances, and activity history
            </p>

            <Button variant="outline" className="w-full justify-start bg-transparent">
              <FileText className="h-4 w-4 mr-2" />
              Export Transaction History
            </Button>
            <p className="text-xs text-muted-foreground px-1">
              Download detailed CSV or PDF reports of your transactions
            </p>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Analytics & Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between py-2">
              <div>
                <Label htmlFor="analytics" className="text-base font-semibold cursor-pointer">
                  Usage Analytics
                </Label>
                <p className="text-xs text-muted-foreground">Help us improve UBAP</p>
              </div>
              <Switch id="analytics" checked={analyticsEnabled} onCheckedChange={setAnalyticsEnabled} />
            </div>
          </CardContent>
        </Card>

        {/* Account Deletion */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive" className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              Request Account Deletion
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Withdrawal of all funds required before deletion
            </p>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card className="bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-4">
              We are committed to protecting your privacy and securing your data. Your information is encrypted with
              AES-256 and never shared with third parties.
            </p>
            <Link href="/privacy-policy">
              <Button variant="outline" className="w-full bg-transparent">
                Read Full Privacy Policy
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}
