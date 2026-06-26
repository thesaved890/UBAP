"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Apple, Smartphone, CheckCircle2, Radio, CreditCard, Nfc } from "lucide-react"

export default function AddToWalletPage() {
  const searchParams = useSearchParams()
  const walletType = searchParams.get("type") || "apple"
  const cardLast4 = searchParams.get("card") || "****"
  const [addingToWallet, setAddingToWallet] = useState(false)
  const [walletAdded, setWalletAdded] = useState(false)

  const handleAddToWallet = () => {
    setAddingToWallet(true)
    setTimeout(() => {
      setAddingToWallet(false)
      setWalletAdded(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pb-20">
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/cards">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 bg-transparent">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Ajouter au Wallet Mobile</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {!walletAdded ? (
          <>
            {/* Wallet Type Card */}
            <Card className={walletType === "apple" ? "bg-gradient-to-br from-slate-900 to-slate-700 text-white" : "bg-gradient-to-br from-blue-600 to-blue-400 text-white"}>
              <CardContent className="pt-6 pb-6 text-center">
                <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  {walletType === "apple" ? (
                    <Apple className="h-12 w-12" />
                  ) : (
                    <Smartphone className="h-12 w-12" />
                  )}
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {walletType === "apple" ? "Apple Wallet" : "Google Wallet"}
                </h2>
                <p className="text-sm opacity-90">
                  Carte UBAP se terminant par {cardLast4}
                </p>
              </CardContent>
            </Card>

            {/* Payment Methods Support */}
            <Card>
              <CardContent className="pt-4 space-y-4">
                <h3 className="font-semibold text-lg mb-3">Méthodes de Paiement Supportées</h3>
                
                <div className="space-y-3">
                  {/* Contactless Payment */}
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                      <Nfc className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Paiement Sans Contact (NFC)</p>
                      <p className="text-xs text-muted-foreground">Approchez simplement votre téléphone du terminal de paiement</p>
                      <Badge className="mt-1 bg-green-600 text-white text-xs">Recommandé</Badge>
                    </div>
                  </div>

                  {/* Magnetic Stripe */}
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Bande Magnétique</p>
                      <p className="text-xs text-muted-foreground">Compatible avec les anciens terminaux de paiement</p>
                    </div>
                  </div>

                  {/* Chip */}
                  <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                      <Radio className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Puce EMV (Chip)</p>
                      <p className="text-xs text-muted-foreground">Paiement sécurisé avec authentification par puce</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardContent className="pt-4 space-y-3">
                <h3 className="font-semibold mb-3">Comment ça fonctionne?</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      1
                    </div>
                    <p>Ajoutez votre carte UBAP au {walletType === "apple" ? "Apple Wallet" : "Google Wallet"}</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      2
                    </div>
                    <p>Approchez votre téléphone d'un terminal de paiement sans contact</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      3
                    </div>
                    <p>Authentifiez avec Face ID, Touch ID ou votre code PIN</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      4
                    </div>
                    <p>Le paiement est effectué instantanément et de manière sécurisée</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compatible Devices */}
            <Card className="bg-muted/50">
              <CardContent className="pt-4 pb-4">
                <h3 className="font-semibold text-sm mb-2">Appareils compatibles</h3>
                <p className="text-xs text-muted-foreground">
                  {walletType === "apple" 
                    ? "iPhone 6 ou plus récent, Apple Watch Series 1 ou plus récent, iPad Pro, iPad Air 2, iPad mini 3 ou plus récent"
                    : "Appareils Android avec NFC (Android 5.0 ou plus récent), Montres connectées Wear OS"}
                </p>
              </CardContent>
            </Card>

            {/* Add Button */}
            <Button
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12"
              onClick={handleAddToWallet}
              disabled={addingToWallet}
            >
              {addingToWallet ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Ajout en cours...
                </>
              ) : (
                <>
                  {walletType === "apple" ? <Apple className="h-5 w-5 mr-2" /> : <Smartphone className="h-5 w-5 mr-2" />}
                  Ajouter à {walletType === "apple" ? "Apple Wallet" : "Google Wallet"}
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            {/* Success State */}
            <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <CardContent className="pt-6 pb-6 text-center">
                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Carte Ajoutée avec Succès!</h2>
                <p className="text-sm opacity-90">
                  Votre carte UBAP est maintenant disponible dans {walletType === "apple" ? "Apple Wallet" : "Google Wallet"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 space-y-3">
                <h3 className="font-semibold mb-3">Prochaines étapes</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Carte activée</p>
                      <p className="text-xs text-muted-foreground">Votre carte est prête à être utilisée</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <Nfc className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Payez sans contact</p>
                      <p className="text-xs text-muted-foreground">Utilisez votre téléphone pour payer dans les magasins</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    {walletType === "apple" ? <Apple className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" /> : <Smartphone className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />}
                    <div>
                      <p className="font-semibold">Accès rapide</p>
                      <p className="text-xs text-muted-foreground">
                        {walletType === "apple" 
                          ? "Double-cliquez sur le bouton latéral pour accéder à vos cartes"
                          : "Maintenez le bouton d'alimentation pour accéder à Google Wallet"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/cards">
                <Button variant="outline" className="w-full bg-transparent">
                  Retour aux Cartes
                </Button>
              </Link>
              <Link href="/">
                <Button className="w-full">
                  Page d'Accueil
                </Button>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
