"use client"

import { usePiAuth } from "@/contexts/pi-auth-context"
import { AfricaLogo } from "@/components/africa-logo"

export function AuthLoadingScreen() {
  const { authMessage, reinitialize } = usePiAuth()
  const isError = authMessage.toLowerCase().includes("failed")

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-6 text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <AfricaLogo className="w-24 h-24 text-primary" />
            {!isError && (
              <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-primary">UBAP</h1>
          <p className="text-sm text-muted-foreground">United Bank of African Pioneers</p>
          <h2 className="text-xl font-semibold mt-4">Pi Network Authentication</h2>
          <p className={`text-sm ${isError ? "text-destructive" : "text-muted-foreground"}`}>{authMessage}</p>
        </div>

        {isError && (
          <button
            onClick={reinitialize}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            Try Again
          </button>
        )}

        <div className="pt-8 text-xs text-muted-foreground">
          <p>Secure • Decentralized • Pan-African</p>
        </div>
      </div>
    </div>
  )
}
