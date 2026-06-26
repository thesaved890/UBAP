'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Key,
  Zap,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Server,
} from 'lucide-react'
import Link from 'next/link'
import { BottomNav } from '@/components/bottom-nav'

export default function PiIntegrationGuidePage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3 flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-bold text-lg">Integration Pi Wallet</h1>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-2xl mx-auto">
        {/* Hero */}
        <Card className="border-2 border-green-400 bg-green-50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <CheckCircle2 className="h-5 w-5" />
              UBAP est pret pour les vrais depots Pi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-green-800 dark:text-green-200">
              Les pionniers peuvent maintenant deposer de vrais Pi directement depuis leur Pi Wallet vers UBAP. Le systeme fonctionne en mode production Mainnet.
            </p>
            <div className="bg-white dark:bg-background rounded p-3 border border-green-200 dark:border-green-800">
              <p className="text-xs font-mono text-green-700 dark:text-green-300">
                SANDBOX: false (Mainnet production)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How it Works */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              Comment ca fonctionne
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                n: '1',
                title: 'Pioneer ouvre UBAP',
                desc: 'Dans Pi Browser sur son telephone',
              },
              {
                n: '2',
                title: 'Tape "Deposer Pi"',
                desc: 'Rentre le montant qu\'il veut deposer',
              },
              {
                n: '3',
                title: 'Confirme dans Pi Wallet',
                desc: 'Son propre Pi Wallet s\'ouvre. Il confirme avec ses credentials',
              },
              {
                n: '4',
                title: 'UBAP approuve',
                desc: 'Backend UBAP approuve aupres de Pi Network API',
              },
              {
                n: '5',
                title: 'Blockchain confirme',
                desc: 'Pi Blockchain enregistre la transaction (immutable)',
              },
              {
                n: '6',
                title: 'Solde UBAP credit',
                desc: 'UBAP credite le montant net (apres frais) au compte du pioneer',
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 font-bold text-sm text-blue-700 dark:text-blue-300">
                  {s.n}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* What\'s Configured */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Ce qui est deja configure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              'Pi SDK v2.0 charge dans pi-auth-context.tsx',
              'Authentification Pi avec scopes "username" et "payments"',
              'Page /deposit-pi complete avec UI de depot',
              'Routes API /api/pi/approve et /api/pi/complete',
              'PiBalanceStore pour enregistrer transactions et historique',
              'Mode production Mainnet active (SANDBOX: false)',
              'Gestion des erreurs explicites pour chaque cas',
              'Toast notifications et modals de confirmation',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* What\'s Still Needed */}
        <Card className="border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <AlertCircle className="h-4 w-4" />
              Prochaines etapes (OBLIGATOIRES)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-amber-300 bg-amber-50 dark:bg-amber-950/20">
              <Key className="h-4 w-4" />
              <AlertDescription className="text-sm">
                UBAP a besoin de votre <strong>PI_API_KEY</strong> pour valider les vrais paiements Pi aupres de Pi Network.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <p className="font-semibold text-sm">1. Obtenir votre PI_API_KEY</p>
              <div className="bg-muted rounded p-3 space-y-2 text-sm">
                <p>a) Ouvrez <strong>https://develop.pi</strong> dans Pi Browser</p>
                <p>b) Connectez-vous avec votre compte Pi</p>
                <p>c) Selectionnez votre app <strong>UBAP</strong></p>
                <p>d) Menu gauche → <strong>API Keys</strong></p>
                <p>e) Copiez la cle de production (pas la clé de developpement)</p>
              </div>

              <p className="font-semibold text-sm pt-2">2. Ajouter PI_API_KEY dans Vercel</p>
              <div className="bg-muted rounded p-3 space-y-2 text-sm">
                <p>a) Cliquez le bouton <strong>Settings</strong> en haut a droite du projet v0</p>
                <p>b) Allez dans l\'onglet <strong>Vars</strong></p>
                <p>c) Cliquez <strong>Add</strong></p>
                <p>d) Nom: <code className="bg-background px-1 rounded">PI_API_KEY</code></p>
                <p>e) Valeur: collez votre clé copiee</p>
                <p>f) Cliquez <strong>Save</strong></p>
              </div>

              <p className="font-semibold text-sm pt-2">3. Verifier la configuration du Wallet</p>
              <div className="bg-muted rounded p-3 space-y-2 text-sm">
                <p>a) Dans https://develop.pi, allez dans <strong>App Wallet</strong></p>
                <p>b) Verifiez que le wallet est <strong>Setup</strong> (pas "Not Setup")</p>
                <p>c) Si "Not Setup", cliquez <strong>Setup Wallet</strong> et sauvegardez la clé privee en securite</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Server className="h-4 w-4 text-blue-600" />
              Details techniques
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="space-y-1">
              <p className="font-semibold">Flux client-side:</p>
              <p className="text-xs text-muted-foreground ml-2">
                initiatePiPayment() → Pi.createPayment() → ouvre Pi Wallet de l\'utilisateur
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">Flux server-side:</p>
              <p className="text-xs text-muted-foreground ml-2">
                /api/pi/approve → PiServerSDK.approvePayment() → Pi Platform API
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">Completion:</p>
              <p className="text-xs text-muted-foreground ml-2">
                /api/pi/complete → PiServerSDK.completePayment() → PiBalanceStore.recordDeposit()
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">Frais:</p>
              <p className="text-xs text-muted-foreground ml-2">
                0.1% de frais UBAP deductes du montant recu
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Test Mode vs Production */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-purple-600" />
              Test vs Production
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="border rounded p-3 space-y-1">
                <p className="font-semibold text-sm text-amber-700 dark:text-amber-300">Sans PI_API_KEY (Sandbox)</p>
                <p className="text-xs text-muted-foreground">
                  Routes API approuvent/completent localement. Pas de vraie transaction Pi Network. Parfait pour des tests.
                </p>
              </div>
              <div className="border rounded p-3 space-y-1 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
                <p className="font-semibold text-sm text-green-700 dark:text-green-300">Avec PI_API_KEY (Production)</p>
                <p className="text-xs text-muted-foreground">
                  Routes API contactent Pi Platform API. Transactions enregistrees sur Pi Blockchain. Vrais Pi debites du wallet de l\'utilisateur.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="flex flex-col gap-2">
          <Link href="/deposit-pi" className="w-full">
            <Button className="w-full bg-green-600 hover:bg-green-700 gap-2">
              Tester le depot Pi
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/pi-setup-guide" className="w-full">
            <Button variant="outline" className="w-full gap-2">
              Guide de configuration
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Support */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Questions? Le guide de configuration detail est disponible a /pi-setup-guide
          </AlertDescription>
        </Alert>
      </div>

      <BottomNav />
    </div>
  )
}
