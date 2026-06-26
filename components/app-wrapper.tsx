"use client"

import type { ReactNode } from "react"
import { useState, useEffect } from "react"
import { PiAuthProvider, usePiAuth } from "@/contexts/pi-auth-context"
import { UserProvider } from "@/contexts/user-context"
import { AuthLoadingScreen } from "./auth-loading-screen"
import { Onboarding } from "./onboarding"
import { BottomNav } from "./bottom-nav"
import { FloatingActionButton } from "./floating-action-button"

function AppContent({ children }: { children: ReactNode }) {
  const { isAuthenticated } = usePiAuth()
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem("ubap_onboarding_completed")
    if (!hasCompletedOnboarding && isAuthenticated) {
      setShowOnboarding(true)
    }
    setIsLoading(false)
  }, [isAuthenticated])

  const handleOnboardingComplete = () => {
    localStorage.setItem("ubap_onboarding_completed", "true")
    // Set demo mode with $10,000 virtual balance
    localStorage.setItem("ubap_demo_mode", "true")
    localStorage.setItem("ubap_demo_balance", "10000")
    setShowOnboarding(false)
  }

  if (!isAuthenticated && !isLoading) {
    return <AuthLoadingScreen />
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  return (
    <>
      <div className="min-h-screen pb-20">{children}</div>
      <FloatingActionButton />
      <BottomNav />
    </>
  )
}

export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <PiAuthProvider>
      <UserProvider>
        <AppContent>{children}</AppContent>
      </UserProvider>
    </PiAuthProvider>
  )
}
