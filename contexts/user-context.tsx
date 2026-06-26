"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
// Supabase disabled until package is installed
// import { getOrCreateUser, updateUserBalance, getUserById } from "@/lib/user-service"

interface User {
  id: string
  piAddress: string
  fullName: string
  phoneNumber: string
  country: string
  piBalance: number
  fiatBalance: number
  createdAt: string
}

interface UserContextType {
  user: User | null
  loading: boolean
  updateBalance: (piBalance: number, fiatBalance: number) => Promise<void>
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      // Using localStorage for demo mode
      const storedUser = localStorage.getItem("ubap_demo_user")
      
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        // Create demo user
        const demoUser: User = {
          id: "demo-user-001",
          piAddress: "GDEMOPIADDRESS123456789",
          fullName: "Demo User",
          phoneNumber: "+237600000000",
          country: "Cameroon",
          piBalance: 1000,
          fiatBalance: 500000,
          createdAt: new Date().toISOString(),
        }
        localStorage.setItem("ubap_demo_user", JSON.stringify(demoUser))
        setUser(demoUser)
      }
    } catch (error) {
      console.error("[v0] Error loading user:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateBalance = async (piBalance: number, fiatBalance: number) => {
    if (!user) return
    
    try {
      // Update in localStorage
      const updatedUser = { ...user, piBalance, fiatBalance }
      localStorage.setItem("ubap_demo_user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    } catch (error) {
      console.error("[v0] Error updating balance:", error)
    }
  }

  const refreshUser = async () => {
    await loadUser()
  }

  return (
    <UserContext.Provider value={{ user, loading, updateBalance, refreshUser }}>
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
