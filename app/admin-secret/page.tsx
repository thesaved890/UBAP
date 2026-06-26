"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, AlertCircle } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if already logged in
    const isAdminLoggedIn = sessionStorage.getItem("ubap_admin_session")
    if (isAdminLoggedIn === "true") {
      router.push("/admin-secret/dashboard")
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate authentication delay
    setTimeout(() => {
      if (password === "ubap2021") {
        sessionStorage.setItem("ubap_admin_session", "true")
        sessionStorage.setItem("ubap_admin_login_time", Date.now().toString())
        router.push("/admin-secret/dashboard")
      } else {
        setError("Mot de passe incorrect")
        setIsLoading(false)
        
        // Log failed attempt
        const failedAttempts = JSON.parse(localStorage.getItem("ubap_admin_failed_attempts") || "[]")
        failedAttempts.push({
          timestamp: new Date().toISOString(),
          ip: "Unknown", // In production, get real IP
        })
        localStorage.setItem("ubap_admin_failed_attempts", JSON.stringify(failedAttempts))
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-emerald-200">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 h-20 w-20 bg-emerald-600 rounded-full flex items-center justify-center">
            <Lock className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-emerald-900">Administration UBAP</CardTitle>
          <p className="text-sm text-gray-600 mt-2">Accès restreint - Authentification requise</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Mot de passe administrateur</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe"
                className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 font-semibold"
              disabled={isLoading || !password}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              Toutes les tentatives de connexion sont enregistrées et surveillées.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
