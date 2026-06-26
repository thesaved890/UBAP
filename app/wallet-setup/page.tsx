'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Wallet,
  Key,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Smartphone,
  Server,
  Lock,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { BottomNav } from '@/components/bottom-nav'

export default function WalletSetupPage() {
  const [copied, setCopied] = useState(false)
  const walletAddress = process.env.NEXT_PUBLIC_UBAP_WALLET_ADDRESS || 'NOT_CONFIGURED'
  const isConfigured = walletAddress !== 'NOT_CONFIGURED'

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3 flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-bold text-base">Configuration Wallet UBAP</h1>
          <p className="text-xs text-muted-foreground">Depot Pi en production</p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-2xl mx-auto">
        {/* Status */}
        <Card
          className={`border-2 ${
            isConfigured
              ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20'
              : 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20'
          }`}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              {isConfigured ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Wallet Configure
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Wallet Non Configure
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isConfigured ? (
              <div className="space-y-3">
                <p className="text-sm text-green-800 dark:text-green-200">
                  Le wallet UBAP est configure et pret a recevoir des depots Pi des pionniers.
                </p>
                <div className="bg-white dark:bg-slate-950 p-3 rounded-lg flex items-center justify-between gap-2 border">
                  <code className="text-xs font-mono break-all text-slate-600 dark:text-slate-300">
                    {walletAddress}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={copyAddress}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                {copied && (
                  <p className="text-xs text-green-600 dark:text-green-400">Adresse copiee!</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-red-800 dark:text-red-200">
                Veuillez configurer NEXT_PUBLIC_UBAP_WALLET_ADDRESS pour activer les depots Pi.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Steps pour configurer */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Etapes de configuration</CardTitle>
            <CardDescription>Suivez ces etapes pour configurer le wallet UBAP</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                n: '1',
                title: 'Ouvrir Pi Developer Portal',
                desc: 'Allez sur https://develop.pi dans Pi Browser',
              },
              {
                n: '2',
                title: 'Selectionner UBAP',
                desc: 'Cliquez sur votre application UBAP',
              },
              {
                n: '3',
                title: 'Aller dans App Wallet',
                desc: 'Menu gauche → App Wallet → Setup Wallet',
              },
              {
                n: '4',
                title: 'Generer le Wallet',
                desc: 'Cliquez Setup Wallet et sauvegardez la cle privee de maniere securisee',
              },
              {
                n: '5',
                title: 'Copier l\'adresse du Wallet',
                desc: 'Copiez l\'adresse du wallet affichee dans l\'interface',
              },
              {
                n: '6',
                title: 'Ajouter dans Vercel',
                desc: 'Settings → Vars → Ajouter NEXT_PUBLIC_UBAP_WALLET_ADDRESS',
              },
              {
                n: '7',
                title: 'Ajouter aussi PI_API_KEY',
                desc: 'API Keys → Copier la cle de production → Ajouter PI_API_KEY dans Vars',
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 text-sm font-bold text-blue-700 dark:text-blue-200">
                  {s.n}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Comment ca fonctionne */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Flux de depot Pi</CardTitle>
            <CardDescription>Comment les pionniers deposent du Pi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <Smartphone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Pioneer ouvre UBAP dans Pi Browser</p>
                <p className="text-sm text-muted-foreground">
                  L'app se charge et authentifie avec Pi Network
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Wallet className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Tape "Deposer Pi"</p>
                <p className="text-sm text-muted-foreground">
                  Entre un montant et confirme
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Lock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Son Pi Wallet s\'ouvre</p>
                <p className="text-sm text-muted-foreground">
                  Il confirme le paiement avec ses credentials Pi
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Server className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Transaction enregistree</p>
                <p className="text-sm text-muted-foreground">
                  Pi envoye au wallet UBAP, solde UBAP credite automatiquement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important info */}
        <Alert className="border-amber-300 bg-amber-50 dark:bg-amber-950/20">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Important:</strong> Gardez votre cle privee UBAP Wallet en securite absolue. Ne la partagez JAMAIS. 
            Cette cle signe tous les paiements sortants depuis le wallet UBAP.
          </AlertDescription>
        </Alert>

        {/* Link to deposit */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/pi-setup-guide" className="w-full">
            <Button variant="outline" className="w-full bg-transparent">
              Guide Pi Network
            </Button>
          </Link>
          <Link href="/deposit-pi" className="w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Deposer Pi
            </Button>
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
