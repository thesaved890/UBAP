"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Lock, FileText, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3 flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-bold text-base">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground">Last updated: June 2026</p>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-md mx-auto">
        <Card className="border-green-200 dark:border-green-900 bg-green-50/10 dark:bg-green-950/5">
          <CardContent className="pt-5 space-y-3">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <Shield className="h-5 w-5" />
              <span className="font-bold text-sm">Commitment to Security</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              At UBAP (United Bank of African Pioneers), we prioritize the safety and privacy of your transactions and personal details. This policy explains how we collect, store, and secure your data.
            </p>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-3">
          {[
            {
              icon: Lock,
              title: "1. Data Collection & Usage",
              content: "We collect basic user profile information provided by the Pi Network SDK (such as your Pi Username and Pi Uid) to identify you in our system. We also record blockchain transaction IDs (txids), amounts, and payment IDs related to deposits to accurately credit your UBAP account balance."
            },
            {
              icon: FileText,
              title: "2. Data Security & Storage",
              content: "Your transaction history and internal balances are securely stored in our encrypted Supabase database. We apply strict row-level security (RLS) to ensure that only you can access your transaction records and profile settings. Sensitive local variables are protected using AES-256 standard encryption."
            },
            {
              icon: CheckCircle2,
              title: "3. Third-Party Sharing",
              content: "UBAP does not sell, rent, or share your personal data with third-party advertisers or services. All Pi network payments are settled directly between your personal Pi Wallet and the UBAP App Wallet on the official Pi Network blockchain protocol."
            },
            {
              icon: Shield,
              title: "4. Your Rights & Controls",
              content: "You retain full control over your data. In the app settings, you can toggle balance visibility, request a full export of your transaction history in CSV/PDF format, or submit a request for account deletion under our data retention guidelines."
            }
          ].map((sec, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm flex items-center gap-2 font-bold text-foreground">
                  <sec.icon className="h-4 w-4 text-green-600" />
                  {sec.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {sec.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact info */}
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-xs text-muted-foreground">
              For any questions regarding your privacy or data security, please contact our support team inside the official Pi Browser support channel.
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
