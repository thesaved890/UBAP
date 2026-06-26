"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { BottomNav } from "@/components/bottom-nav"

const languages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    region: "International",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    region: "West & Central Africa",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    region: "Angola, Mozambique",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    region: "North Africa",
  },
  {
    code: "sw",
    name: "Swahili",
    nativeName: "Kiswahili",
    flag: "🇰🇪",
    region: "East Africa",
  },
  {
    code: "am",
    name: "Amharic",
    nativeName: "አማርኛ",
    flag: "🇪🇹",
    region: "Ethiopia",
  },
  {
    code: "ha",
    name: "Hausa",
    nativeName: "Hausa",
    flag: "🇳🇬",
    region: "West Africa",
  },
  {
    code: "zu",
    name: "Zulu",
    nativeName: "isiZulu",
    flag: "🇿🇦",
    region: "South Africa",
  },
  {
    code: "yo",
    name: "Yoruba",
    nativeName: "Yorùbá",
    flag: "🇳🇬",
    region: "Nigeria, Benin",
  },
  {
    code: "ig",
    name: "Igbo",
    nativeName: "Igbo",
    flag: "🇳🇬",
    region: "Nigeria",
  },
]

export default function LanguagePage() {
  const { language, setLanguage } = useLanguage()
  const [selectedLang, setSelectedLang] = useState(language)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setLanguage(selectedLang)
    setTimeout(() => {
      setIsSaving(false)
      alert(`Language changed to ${languages.find((l) => l.code === selectedLang)?.name}`)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Language / Langue</h1>
          </div>
          <Globe className="h-6 w-6" />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1">Choose Your Language</h3>
                <p className="text-sm text-muted-foreground">
                  Select your preferred language for the UBAP application. All menus, labels, and
                  messages will be displayed in your chosen language.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {languages.map((lang) => (
            <Card
              key={lang.code}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedLang === lang.code
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedLang(lang.code)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{lang.flag}</span>
                    <div>
                      <p className="font-semibold text-base">{lang.nativeName}</p>
                      <p className="text-xs text-muted-foreground">{lang.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        <span className="opacity-60">Region:</span> {lang.region}
                      </p>
                    </div>
                  </div>
                  {selectedLang === lang.code && (
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedLang !== language && (
          <Button className="w-full" onClick={handleSave} disabled={isSaving} size="lg">
            {isSaving ? "Saving..." : "Save Language"}
          </Button>
        )}

        <Card className="bg-muted/50">
          <CardContent className="pt-6 space-y-3">
            <h4 className="font-semibold text-sm">More Languages Coming Soon</h4>
            <p className="text-xs text-muted-foreground">
              We're working on adding more African languages including Wolof, Berber, Somali, and
              others. Your language preferences help us prioritize which languages to add next.
            </p>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}
