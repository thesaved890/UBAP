"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, FileText, CheckCircle2, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function TontineContractPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const groupId = searchParams.get("groupId")
  const groupName = searchParams.get("groupName") || "Groupe Tontine"
  const contribution = searchParams.get("contribution") || "0.003"
  
  const [accepted, setAccepted] = useState(false)
  const [readContract, setReadContract] = useState(false)
  const [signature, setSignature] = useState("")
  const [isSigning, setIsSigning] = useState(false)

  const handleSign = () => {
    if (!accepted || !readContract) {
      alert("Vous devez lire et accepter les termes du contrat")
      return
    }

    setIsSigning(true)
    // Simulate signature process
    setTimeout(() => {
      setSignature(`UBAP-TONTINE-${Date.now()}`)
      alert("✅ Contrat signé avec succès! Vous êtes maintenant membre du groupe.")
      router.push("/tontine")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/tontine">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 bg-transparent">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold">Contrat de Tontine</h1>
            <p className="text-sm opacity-90 mt-1">{groupName}</p>
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Contract Document */}
        <Card className="border-2">
          <CardContent className="p-6 space-y-4">
            <div className="text-center pb-4 border-b">
              <h2 className="text-2xl font-bold text-primary">CONTRAT DE TONTINE DIGITALE</h2>
              <p className="text-sm text-muted-foreground mt-2">United Bank for African Pioneers (UBAP)</p>
              <p className="text-xs text-muted-foreground">Plateforme de Gestion de Tontine Pi Network</p>
            </div>

            <div className="space-y-4 text-sm max-h-96 overflow-y-auto pr-2">
              <section>
                <h3 className="font-bold text-base mb-2">ARTICLE 1 - DÉFINITION ET OBJET</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Le présent contrat régit l'adhésion et la participation au groupe de tontine <strong>{groupName}</strong> géré par UBAP. 
                  La tontine est un système d'épargne rotative où chaque membre contribue régulièrement et reçoit à tour de rôle la totalité des cotisations collectées.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">ARTICLE 2 - MONTANT ET FRÉQUENCE DES COTISATIONS</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Chaque membre s'engage à contribuer <strong>{contribution} Pi</strong> par mois. Le prélèvement automatique s'effectue le <strong>12 de chaque mois</strong> depuis le solde UBAP du membre. 
                  La distribution au bénéficiaire désigné a lieu le <strong>15 de chaque mois</strong> après conversion en monnaie locale au taux GCV (1 Pi = $314,159).
                </p>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">ARTICLE 3 - SYSTÈME DE TOUR ET ÉQUITÉ</h3>
                <p className="text-muted-foreground leading-relaxed">
                  L'ordre de distribution est déterminé par tirage au sort via système de cartes à gratter numérique. 
                  Chaque membre choisit UNE carte qui révèle son numéro de tour. Ce système garantit équité et transparence. 
                  Le tour attribué est définitif et ne peut être modifié sauf accord unanime du groupe et validation UBAP.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">ARTICLE 4 - GESTION AUTOMATIQUE PAR UBAP</h3>
                <p className="text-muted-foreground leading-relaxed">
                  UBAP agit comme tiers de confiance et gestionnaire automatique. Les cotisations sont prélevées automatiquement, 
                  stockées dans un compte escrow sécurisé, converties au taux GCV, et transférées automatiquement au bénéficiaire. 
                  UBAP prélève des frais de gestion de <strong>2% sur chaque distribution</strong> pour couvrir les coûts opérationnels, 
                  de sécurité et de conversion.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">ARTICLE 5 - OBLIGATIONS DU MEMBRE</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground leading-relaxed">
                  <li>Maintenir un solde Pi suffisant dans UBAP avant chaque prélèvement du 12</li>
                  <li>Fournir des informations exactes correspondant à son profil Pi Network KYC</li>
                  <li>Respecter les règles de courtoisie et d'entraide dans le chat de groupe</li>
                  <li>Ne pas partager son numéro de tour avant la révélation officielle</li>
                  <li>Compléter son cycle de cotisations même après avoir reçu son tour</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">ARTICLE 6 - PÉNALITÉS ET EXCLUSIONS</h3>
                <p className="text-muted-foreground leading-relaxed">
                  En cas de non-paiement à la date prévue, une pénalité de <strong>10% du montant dû</strong> est appliquée automatiquement. 
                  Le membre dispose de 5 jours pour régulariser. Après <strong>2 défauts de paiement</strong>, le membre est automatiquement exclu du groupe 
                  et perd tout droit aux tours futurs, même s'il n'a pas encore reçu sa distribution. Les cotisations déjà versées ne sont pas remboursées 
                  et servent à compenser les membres actifs.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">ARTICLE 7 - DISTRIBUTION ET RÉCEPTION</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Le bénéficiaire reçoit automatiquement le montant total converti en monnaie locale dans son compte UBAP le 15. 
                  Il peut utiliser ces fonds via: (1) Carte virtuelle UBAP pour achats en magasin, (2) Transfert vers compte bancaire lié, 
                  (3) Retrait Mobile Money. UBAP n'effectue AUCUN transfert direct vers comptes externes sans action du bénéficiaire.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">ARTICLE 8 - TRANSPARENCE ET AUDIT</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tous les membres peuvent consulter en temps réel: solde du groupe, membres actifs, prochains bénéficiaires, 
                  historique des transactions. L'administration UBAP surveille tous les groupes pour détecter fraudes ou anomalies. 
                  Un rapport mensuel est accessible dans l'interface.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">ARTICLE 9 - RÉSILIATION ET SORTIE</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Un membre ne peut quitter le groupe qu'après avoir: (1) reçu son tour de distribution, ET (2) complété toutes ses cotisations 
                  jusqu'à la fin du cycle complet du groupe. Toute sortie anticipée entraîne perte totale des cotisations versées et 
                  interdiction de rejoindre d'autres tontines UBAP pendant 6 mois.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">ARTICLE 10 - RESPONSABILITÉ DE UBAP</h3>
                <p className="text-muted-foreground leading-relaxed">
                  UBAP garantit la sécurité des fonds en escrow et l'exécution automatique des distributions. 
                  En cas d'erreur technique prouvée imputable à UBAP, les membres affectés seront indemnisés intégralement. 
                  UBAP ne peut être tenu responsable des fluctuations du taux de change Pi/USD ou des problèmes individuels de membres.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">ARTICLE 11 - CHAT ET COMMUNICATION</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Le chat de groupe est un espace de communication entre membres. Sont strictement interdits: propos injurieux, 
                  harcèlement, publicité commerciale, partage d'informations fausses. Toute violation entraîne avertissement puis 
                  exclusion du groupe avec application de l'Article 6.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">ARTICLE 12 - LOI APPLICABLE ET JURIDICTION</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ce contrat est régi par les lois du pays de résidence du membre et les réglementations internationales applicables 
                  aux cryptomonnaies. Tout litige sera d'abord soumis à médiation UBAP. En cas d'échec, les tribunaux compétents 
                  du pays de siège social de UBAP seront seuls compétents.
                </p>
              </section>

              <section className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-base mb-2 text-amber-900 dark:text-amber-100">AVERTISSEMENT IMPORTANT</h3>
                    <p className="text-amber-800 dark:text-amber-200 text-xs leading-relaxed">
                      La tontine est un système d'épargne à risque. UBAP ne garantit pas le comportement des autres membres. 
                      Ne participez qu'avec des montants que vous pouvez vous permettre de perdre. Assurez-vous de bien comprendre 
                      tous les termes avant de signer. En cas de doute, consultez un conseiller financier indépendant.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Checkboxes */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-lg mb-4">Confirmations Requises</h3>
            
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <Checkbox 
                id="read" 
                checked={readContract}
                onCheckedChange={(checked) => setReadContract(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="read" className="text-sm cursor-pointer leading-relaxed">
                J'ai lu et compris l'intégralité du contrat de tontine ci-dessus, incluant tous les articles, 
                obligations, pénalités et conditions.
              </label>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <Checkbox 
                id="accept" 
                checked={accepted}
                onCheckedChange={(checked) => setAccepted(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="accept" className="text-sm cursor-pointer leading-relaxed">
                J'accepte sans réserve tous les termes et conditions énoncés dans ce contrat. Je comprends les risques 
                associés et m'engage à respecter toutes mes obligations de paiement mensuel.
              </label>
            </div>

            {signature && (
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="font-bold text-green-900 dark:text-green-100">Contrat Signé</span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Signature numérique: {signature}
                </p>
                <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                  Date: {new Date().toLocaleString('fr-FR')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button 
          className="w-full h-12 text-base font-bold"
          disabled={!accepted || !readContract || isSigning || !!signature}
          onClick={handleSign}
        >
          {isSigning ? "Signature en cours..." : signature ? "✓ Contrat Signé" : "Signer et Rejoindre le Groupe"}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          En signant ce contrat, vous créez un engagement juridiquement contraignant avec UBAP et les autres membres du groupe.
        </p>
      </main>
    </div>
  )
}
