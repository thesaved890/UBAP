"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import {
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Key,
  Server,
  Zap,
  HelpCircle,
  ExternalLink,
  Info,
} from "lucide-react"

/**
 * Pi Network Setup Guide
 * Step-by-step guide to enable real Pi deposits on UBAP
 */
export default function PiNetworkSetupPage() {
  const [expanded, setExpanded] = useState<number | null>(0)

  const steps = [
    {
      n: 1,
      title: "Verifier que UBAP est enregistree sur Pi Network",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            UBAP doit etre une application enregistree dans votre compte Pi Developer.
          </p>
          <ol className="text-sm space-y-2 ml-4 list-decimal">
            <li>Ouvrez <strong>https://develop.pi</strong> dans Pi Browser sur votre telephone</li>
            <li>Connectez-vous avec votre compte Pi</li>
            <li>Vous devriez voir <strong>"UBAP"</strong> dans votre liste d'applications</li>
            <li>Si UBAP n'apparait pas, cliquez <strong>"Create new app"</strong> et enregistrez UBAP</li>
          </ol>
          <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-300">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-xs text-blue-700 dark:text-blue-300">
              Vous devez etre dans Pi Browser pour creer une app. UBAP doit etre votre URL actuelle (ex: ubapi.vercel.app).
            </AlertDescription>
          </Alert>
        </div>
      ),
    },
    {
      n: 2,
      title: "Configurer le Wallet de l'Application",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Pi Network a besoin d'un wallet pour que l'application puisse recevoir les Pi des utilisateurs.
          </p>
          <ol className="text-sm space-y-2 ml-4 list-decimal">
            <li>Dans <strong>https://develop.pi</strong>, selectionnez votre app <strong>UBAP</strong></li>
            <li>Allez dans le menu gauche → <strong>App Wallet</strong></li>
            <li>Cliquez <strong>Setup Wallet</strong></li>
            <li>Un portefeuille sera cree pour votre app UBAP</li>
            <li>Sauvegardez la cle privee dans un endroit SECURISE (vous ne la reverrez jamais)</li>
          </ol>
          <Alert className="bg-red-50 dark:bg-red-950/20 border-red-300">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-xs text-red-700 dark:text-red-300">
              <strong>NE JAMAIS PARTAGER</strong> votre cle privee du wallet!
            </AlertDescription>
          </Alert>
        </div>
      ),
    },
    {
      n: 3,
      title: "Copier votre API Key",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            L'API Key permet au serveur UBAP de valider les paiements Pi.
          </p>
          <ol className="text-sm space-y-2 ml-4 list-decimal">
            <li>Depuis <strong>https://develop.pi</strong>, selectionnez UBAP</li>
            <li>Menu gauche → <strong>API Keys</strong></li>
            <li>Copiez la <strong>Production Key</strong> (commence par pi_prod_...)</li>
            <li>Gardez cette cle secrete — c'est elle qui va dans Vercel</li>
          </ol>
        </div>
      ),
    },
    {
      n: 4,
      title: "Ajouter PI_API_KEY dans Vercel",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Cette etape active les vrais paiements Pi sur UBAP.
          </p>
          <ol className="text-sm space-y-2 ml-4 list-decimal">
            <li>Cliquez l'icone <strong>Settings</strong> en haut a droite de ce projet v0</li>
            <li>Allez dans l'onglet <strong>Vars</strong></li>
            <li>Cliquez <strong>Add Variable</strong></li>
            <li>Nom: <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-xs">PI_API_KEY</code></li>
            <li>Valeur: collez votre Production Key copiee a l'etape 3</li>
            <li>Cliquez <strong>Save</strong></li>
          </ol>
          <Alert className="bg-green-50 dark:bg-green-950/20 border-green-300">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-xs text-green-700 dark:text-green-300">
              Une fois sauvegardee, l'app se re-deploiera automatiquement avec PI_API_KEY.
            </AlertDescription>
          </Alert>
        </div>
      ),
    },
    {
      n: 5,
      title: "Tester le Depot Pi",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Maintenant les vrais depots doivent fonctionner!
          </p>
          <ol className="text-sm space-y-2 ml-4 list-decimal">
            <li>Ouvrez UBAP dans <strong>Pi Browser</strong> sur votre telephone</li>
            <li>Allez dans <strong>Deposer Pi</strong></li>
            <li>Entrez un montant (minimum 1 Pi)</li>
            <li>Cliquez <strong>Deposer</strong></li>
            <li>Votre Pi Wallet s'ouvre — confirmez le paiement</li>
            <li>La transaction est enviee a la blockchain Pi</li>
            <li>Des qu'elle est confirmee, UBAP credite votre solde</li>
          </ol>
          <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-300">
            <Zap className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-xs text-amber-700 dark:text-amber-300">
              Les depots via blockchain Pi prennent 30 secondes a quelques minutes selon la congestion du reseau.
            </AlertDescription>
          </Alert>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="max-w-2xl mx-auto p-4 space-y-4 pt-6">
        {/* Header */}
        <div className="space-y-2 mb-8">
          <Link href="/" className="flex items-center gap-2 text-sm text-primary hover:underline mb-4">
            <ChevronRight className="h-4 w-4 rotate-180" />
            Retour
          </Link>
          <h1 className="text-3xl font-bold">Configuration des Depots Pi</h1>
          <p className="text-muted-foreground">
            Guide complet pour activer les vrais paiements Pi sur UBAP
          </p>
        </div>

        {/* Status */}
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-300">
          <CardContent className="pt-4 flex items-start gap-3">
            <Smartphone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 dark:text-blue-100">
                UBAP utilise maintenant la vraie intégration Pi
              </p>
              <p className="text-blue-700 dark:text-blue-300 mt-1">
                Pour des dépôts réels, ouvrez UBAP dans Pi Browser et suivez les étapes ci-dessous.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, idx) => (
            <Card
              key={step.n}
              className={`cursor-pointer transition-all ${expanded === idx ? "ring-2 ring-primary" : ""}`}
              onClick={() => setExpanded(expanded === idx ? null : idx)}
            >
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                      {step.n}
                    </div>
                    <h3 className="font-semibold">{step.title}</h3>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      expanded === idx ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </CardHeader>

              {expanded === idx && (
                <CardContent className="p-4 pt-0 border-t">
                  {step.content}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              FAQ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="font-semibold mb-1">Ou trouver mon API Key?</p>
              <p className="text-muted-foreground">
                https://develop.pi → Selectionnez UBAP → API Keys → coplez la cle Production
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Pourquoi le depot echoue?</p>
              <p className="text-muted-foreground">
                Verifiez que: 1) Vous etes dans Pi Browser, 2) PI_API_KEY est ajoutee dans Vercel, 3) L'app wallet est configure sur Pi Developer Portal
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Combien de temps pour que le Pi arrive?</p>
              <p className="text-muted-foreground">
                La blockchain Pi confirme generalement en 30 secondes a 1 minute. Une fois confirmee, UBAP credite immediatement votre solde.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Puis-je faire des depots hors de Pi Browser?</p>
              <p className="text-muted-foreground">
                Les dépôts réels ne fonctionnent que dans Pi Browser. Utilisez une clé PI_API_KEY valide et Pi Browser pour des dépôts live.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <Button className="w-full h-12 text-base" asChild>
            <a href="https://develop.pi" target="_blank" rel="noopener noreferrer">
              Ouvrir Pi Developer Portal
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
          <Button variant="outline" className="w-full h-12 text-base" asChild>
            <Link href="/deposit-pi">
              Retour au Depot Pi
            </Link>
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

function Info(props: any) {
  return <AlertCircle {...props} />
}
