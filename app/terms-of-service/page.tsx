"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Scale, Users, Award, ShieldAlert } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"

export default function TermsOfServicePage() {
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
          <h1 className="font-bold text-base">Terms of Service</h1>
          <p className="text-xs text-muted-foreground">Last updated: June 2026</p>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-md mx-auto">
        <Card className="border-green-200 dark:border-green-900 bg-green-50/10 dark:bg-green-950/5">
          <CardContent className="pt-5 space-y-3">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <Scale className="h-5 w-5" />
              <span className="font-bold text-sm">Agreement of Terms</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              By accessing and using the UBAP application, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before performing any transactions.
            </p>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-3">
          {[
            {
              icon: Scale,
              title: "1. Acceptance of Terms",
              content: "UBAP provides financial integration tools inside the Pi Browser environment. By logging into the app using your Pi Wallet, you confirm that you accept these terms and that you represent yourself truthfully under your Pi Network profile."
            },
            {
              icon: Users,
              title: "2. User Obligations",
              content: "You are solely responsible for securing your own Pi Wallet passphrase and ensuring that your access to the Pi Browser remains private. You agree not to use the platform for any illegal activities, money laundering, or unauthorized financial transactions."
            },
            {
              icon: Award,
              title: "3. Service Limitations",
              content: "UBAP facilitates deposits, virtual card issuance, tontines, and escrow services. All blockchain transactions are subject to Pi Network network fees and confirmation times, which are out of our direct control. We reserve the right to apply standard platform convenience fees (e.g. 0.1% deposit fee) as displayed in the UI."
            },
            {
              icon: ShieldAlert,
              title: "4. Liability & Disclaimers",
              content: "The services are provided 'as is' without warranties of any kind. UBAP shall not be liable for any loss of funds resulting from user error, misplaced private keys, network downtime, or changes to the underlying Pi Network blockchain protocol."
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
              We reserve the right to modify these terms at any time. Continued use of the application constitutes acceptance of any updated terms.
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
