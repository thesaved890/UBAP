"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle2, Lock, Upload } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { useState } from "react"

export default function KYCPage() {
  const [currentLevel, setCurrentLevel] = useState(1)

  const levels = [
    {
      level: 1,
      title: "Basic Verification",
      limit: "$1,000",
      requirements: ["Email verification", "Phone number"],
      completed: true,
    },
    {
      level: 2,
      title: "Standard Verification",
      limit: "$10,000",
      requirements: ["Government ID", "Selfie photo"],
      completed: false,
    },
    {
      level: 3,
      title: "Advanced Verification",
      limit: "$50,000",
      requirements: ["Proof of address", "Video verification"],
      completed: false,
    },
  ]

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
          <h1 className="text-2xl font-bold">KYC Verification</h1>
          <p className="text-sm opacity-90 mt-1">Increase your transaction limits</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Current Status */}
        <Card className="border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Level {currentLevel} Verified</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Current daily transaction limit: {levels[currentLevel - 1].limit}
              </p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Verified Account
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Verification Levels */}
        {levels.map((level) => (
          <Card key={level.level} className={level.completed ? "border-green-200 bg-green-50/50" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      level.completed ? "bg-green-100" : "bg-primary/10"
                    }`}
                  >
                    {level.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <Lock className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">Level {level.level}</CardTitle>
                    <p className="text-sm text-muted-foreground">{level.title}</p>
                  </div>
                </div>
                <Badge
                  variant={level.completed ? "secondary" : "outline"}
                  className={level.completed ? "bg-green-100 text-green-800" : ""}
                >
                  {level.limit} limit
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="text-sm font-semibold">Requirements:</p>
                {level.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2
                      className={`h-4 w-4 ${level.completed ? "text-green-600" : "text-muted-foreground"}`}
                    />
                    <span className={level.completed ? "text-green-800" : ""}>{req}</span>
                  </div>
                ))}
              </div>
              {!level.completed && currentLevel === level.level - 1 && (
                <Button className="w-full">Start Level {level.level} Verification</Button>
              )}
              {level.completed && (
                <Badge variant="secondary" className="w-full justify-center bg-green-100 text-green-800 py-2">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Completed
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Level 2 Verification Form (if ready) */}
        {currentLevel === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Level 2 Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="id-type">ID Document Type</Label>
                <select id="id-type" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                  <option>National ID Card</option>
                  <option>Driver's License</option>
                  <option>Passport</option>
                  <option>Voter's Card</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="id-number">ID Number</Label>
                <Input id="id-number" placeholder="Enter your ID number" />
              </div>

              <div className="space-y-2">
                <Label>Upload ID Document (Front)</Label>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose file
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Upload ID Document (Back)</Label>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose file
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Selfie with ID</Label>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Take photo
                </Button>
              </div>

              <Button className="w-full" size="lg">
                Submit Level 2 Verification
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Benefits */}
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Why Verify?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Higher Transaction Limits</p>
                <p className="text-xs text-muted-foreground">Trade and withdraw more</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Enhanced Security</p>
                <p className="text-xs text-muted-foreground">Protect your account</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Full Platform Access</p>
                <p className="text-xs text-muted-foreground">Unlock all features</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}
