"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Fingerprint } from "lucide-react"
import { AfricaLogo } from "./africa-logo"

interface BiometricPromptProps {
  onAuthenticate?: () => void
  onCancel?: () => void
}

export function BiometricPrompt({ onAuthenticate, onCancel }: BiometricPromptProps) {
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="flex justify-center">
            <AfricaLogo className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">UBAP Authentication</h2>
            <p className="text-sm text-muted-foreground">Use your fingerprint to continue</p>
          </div>
          <div className="flex justify-center py-8">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <Fingerprint className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full" size="lg" onClick={onAuthenticate}>
              Authenticate Now
            </Button>
            <Button variant="ghost" className="w-full" onClick={onCancel}>
              Use PIN Instead
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
