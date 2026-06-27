'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Zap,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Wallet,
  Lock,
  List,
} from 'lucide-react'
import Link from 'next/link'
import { BottomNav } from '@/components/bottom-nav'

export default function PiWalletConnectionPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3 flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-bold text-lg">Pi Wallet Integration</h1>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-2xl mx-auto">
        {/* Status */}
        <Card className="border-2 border-green-400 bg-green-50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <CheckCircle2 className="h-5 w-5" />
              Pi Wallet Fully Connected
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-green-800 dark:text-green-200">
              UBAP est completement integree avec Pi Network. Les pionniers peuvent maintenant deposer de vrais Pi directement depuis leur Pi Wallet.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Pi SDK v2.0 charge automatiquement</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Authentification avec scopes "payments"</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Mode production Mainnet active</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Balance et historique enregistres</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Deposit */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-amber-600" />
              Comment deposer Pi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-amber-300 bg-amber-50 dark:bg-amber-950/20">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-sm">
                Les paiements Pi ne fonctionnent QUE dans <strong>Pi Browser</strong> sur mobile. Sur desktop, c'est en mode demo.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              {[
                {
                  n: '1',
                  icon: <Smartphone className="h-4 w-4" />,
                  title: 'Ouvrir UBAP dans Pi Browser',
                  desc: 'Sur votre telephone, lancez Pi Browser et ouvrez https://ubap.app',
                },
                {
                  n: '2',
                  icon: <Wallet className="h-4 w-4" />,
                  title: 'Taper le bouton "Deposit"',
                  desc: 'Sur la home page, vous verrez un grand bouton "Deposit Add Pi"',
                },
                {
                  n: '3',
                  icon: <Zap className="h-4 w-4" />,
                  title: 'Entrer le montant',
                  desc: 'Rentrez combien de Pi vous voulez deposer (minimum 1 Pi)',
                },
                {
                  n: '4',
                  icon: <Lock className="h-4 w-4" />,
                  title: 'Confirmer dans Pi Wallet',
                  desc: 'Votre propre Pi Wallet s\'ouvrira. Verifiez le montant et confirmez',
                },
                {
                  n: '5',
                  icon: <List className="h-4 w-4" />,
                  title: 'Transaction enregistree',
                  desc: 'Une fois confirmee, Pi Blockchain enregistre la transaction',
                },
                {
                  n: '6',
                  icon: <CheckCircle2 className="h-4 w-4" />,
                  title: 'Solde UBAP credit',
                  desc: 'Le montant net (apres frais) apparait dans votre compte UBAP',
                },
              ].map((s, i) => (
                <div key={i} className="flex gap-3 p-3 rounded border border-border hover:bg-muted/50 transition">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 text-blue-700 dark:text-blue-300">
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technical Stack */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Technical Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <span>Client SDK</span>
                <Badge>pi-network-sdk.ts</Badge>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <span>Auth Context</span>
                <Badge>pi-auth-context.tsx</Badge>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <span>API Routes</span>
                <Badge>/api/pi/*</Badge>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <span>Balance Store</span>
                <Badge>pi-balance-store.ts</Badge>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <span>Deposit Page</span>
                <Badge>/deposit-pi</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              Configuration Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
              <p className="font-semibold text-sm text-green-700 dark:text-green-300">App Wallet Setup</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                ✓ Pi Developer Portal configured
              </p>
            </div>
            <div className="p-3 rounded border border-border">
              <p className="font-semibold text-sm">PI_API_KEY Status</p>
              <p className="text-xs text-muted-foreground mt-1">
                Check Vercel Settings → Vars to confirm PI_API_KEY is set
              </p>
            </div>
            <div className="p-3 rounded border border-border">
              <p className="font-semibold text-sm">Mode</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">Sandbox</span>
                <Badge variant="outline">Development</Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">Mainnet</span>
                <Badge className="bg-green-600">Production Ready</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Link href="/deposit-pi" className="w-full">
            <Button className="w-full bg-green-600 hover:bg-green-700 gap-2">
              Tester Deposit Pi
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/pi-integration-guide" className="w-full">
            <Button variant="outline" className="w-full gap-2">
              Guide complet
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Troubleshooting */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-sm">Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-semibold">Page blanche en cliquant "Deposit"?</p>
              <p className="text-xs text-muted-foreground mt-1">
                Rafraichissez la page. Le Pi SDK met quelques secondes a charger.
              </p>
            </div>
            <div>
              <p className="font-semibold">Pi Wallet ne s'ouvre pas?</p>
              <p className="text-xs text-muted-foreground mt-1">
                Assurez-vous d'utiliser Pi Browser sur mobile. Sur desktop, c'est du demo mode.
              </p>
            </div>
            <div>
              <p className="font-semibold">Erreur "wallet not setup"?</p>
              <p className="text-xs text-muted-foreground mt-1">
                Allez dans /pi-setup-guide pour les instructions completes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
