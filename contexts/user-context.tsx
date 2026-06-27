"use client"

import { createContext, useContext, type ReactNode } from "react"
import { usePiAuth } from "@/contexts/pi-auth-context"

interface User {
  id: string
  username: string
  country?: string
  balance_pi?: number
  balance_fiat?: number
  createdAt?: string
  updatedAt?: string
}

interface UserContextType {
  user: User | null
  loading: boolean
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const { userData, isAuthenticated, reinitialize } = usePiAuth()

  const user = userData
    ? {
        id: userData.id,
        username: userData.username,
        country: userData.country,
        balance_pi: userData.balance_pi,
        balance_fiat: userData.balance_fiat,
        createdAt: userData.created_at,
        updatedAt: userData.updated_at,
      }
    : null

  const loading = !isAuthenticated

  const refreshUser = async () => {
    await reinitialize()
  }

  return (
    <UserContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
