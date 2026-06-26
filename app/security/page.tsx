"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, Smartphone, AlertTriangle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function SecurityPage() {
  const { t } = useLanguage()
  const [devices] = useState([
    { id: 1, name: "iPhone 14 Pro", location: "Lagos, Nigeria", lastActive: "Active now", current: true },
    { id: 2, name: "iPad Air", location: "Accra, Ghana", lastActive: "2 hours ago", current: false },
    { id: 3, name: "Chrome - Windows", location: "Nairobi, Kenya", lastActive: "1 day ago", current: false },
  ])

  const [activities] = useState([
    { id: 1, type: "login", message: "New login from Lagos, Nigeria", time: "2 minutes ago", severity: "info" },
    {
      id: 2,
      type: "suspicious",
      message: "Unusual transaction pattern detected",
      time: "1 hour ago",
      severity: "warning",
    },
    { id: 3, type: "success", message: "Security settings updated", time: "3 hours ago", severity: "success" },
  ])

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="max-w-lg mx-auto">
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="text-primary-foreground mb-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Security Center</h1>
          <p className="text-sm opacity-90 mt-1">Advanced security management</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Security Status */}
        <Card className="border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Security Score: 95/100</h3>
                <p className="text-sm text-muted-foreground mb-3">Excellent protection level</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Biometric Active
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Pi Network Verified
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Cold Storage
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Encryption & Insurance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Protection Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-semibold text-sm">Data Encryption</p>
                <p className="text-xs text-muted-foreground">AES-256 at rest</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-semibold text-sm">Transmission Security</p>
                <p className="text-xs text-muted-foreground">TLS 1.3 protocol</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-semibold text-sm">Cold Storage</p>
                <p className="text-xs text-muted-foreground">95% of crypto assets</p>
              </div>
              <Badge variant="secondary">Protected</Badge>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-semibold text-sm">Insurance Coverage</p>
                <p className="text-xs text-muted-foreground">Per user protection</p>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                $250,000
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Session Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Active Sessions</CardTitle>
              <Badge variant="outline">{devices.length} devices</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {devices.map((device) => (
              <div key={device.id} className="flex items-start justify-between py-3 border-b last:border-b-0">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{device.name}</p>
                    <p className="text-xs text-muted-foreground">{device.location}</p>
                    <p className="text-xs text-muted-foreground mt-1">{device.lastActive}</p>
                  </div>
                </div>
                <div className="text-right">
                  {device.current ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Current
                    </Badge>
                  ) : (
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      Revoke
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2 bg-transparent">
              Logout All Other Devices
            </Button>
          </CardContent>
        </Card>

        {/* Session Timeout */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Session Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-sm">Auto-Lock Timeout</p>
                <p className="text-xs text-muted-foreground">After inactivity period</p>
              </div>
              <Badge variant="outline">15 minutes</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Suspicious Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Security Alerts</CardTitle>
              <Badge variant="outline">{activities.length} recent</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 py-2 border-b last:border-b-0">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    activity.severity === "warning"
                      ? "bg-yellow-100"
                      : activity.severity === "success"
                        ? "bg-green-100"
                        : "bg-blue-100"
                  }`}
                >
                  {activity.severity === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  ) : activity.severity === "success" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <Shield className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Withdrawal Whitelist */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Withdrawal Whitelist</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Only whitelisted addresses can receive withdrawals for enhanced security
            </p>
            <Button variant="outline" className="w-full bg-transparent">
              Manage Whitelist
            </Button>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}
