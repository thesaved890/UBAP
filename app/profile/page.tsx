"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Camera, Save, User, Mail, Phone, MapPin, Calendar, Flag, Award as IdCard, Building2, AlertCircle, Upload, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { useState } from "react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [userStatus, setUserStatus] = useState("student")
  const [uploadedProof, setUploadedProof] = useState<string | null>(null)
  const [proofFileRef] = useState<any>(null)

  // Profile data state
  const [formData, setFormData] = useState({
    firstName: "Adebayo",
    lastName: "Oluwaseun",
    email: "adebayo.o@ubapi.africa",
    phone: "+234 801 234 5678",
    dateOfBirth: "1990-05-15",
    country: "Nigeria",
    city: "Lagos",
    address: "123 Victoria Island",
    postalCode: "101241",
    occupation: "Software Engineer",
    idType: "National ID",
    idNumber: "NG123456789",
  })

  const piUsdRate = 314159 // 1 Pi = $314,159
  
  const statusLimits: any = {
    student: { limit: 5000, label: "Student", icon: "🎓", color: "blue" },
    employee: { limit: 10000, label: "Employee/Salaried", icon: "💼", color: "green" },
    entrepreneur: { limit: 20000, label: "Entrepreneur", icon: "🚀", color: "purple" },
    executive: { limit: 40000, label: "Executive/CEO", icon: "👔", color: "amber" },
  }

  // Calculate Pi equivalents
  const getPiEquivalent = (usdAmount: number) => {
    return (usdAmount / piUsdRate).toFixed(4)
  }

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedProof(reader.result as string)
        alert(`Document uploaded successfully!\n\nYour ${statusLimits[userStatus].label} status will be verified within 24 hours.\n\nOnce approved, your monthly transaction limit will be $${statusLimits[userStatus].limit.toLocaleString()}.`)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/settings">
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            {!isEditing ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0"
              >
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="text-primary-foreground"
                >
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-sm opacity-90 mt-1">Manage your personal information</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Picture */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {formData.firstName[0]}
                    {formData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon"
                    className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                    aria-label="Change photo"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {formData.firstName} {formData.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">{formData.email}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-100">
                    Pi KYC Verified
                  </Badge>
                  <Badge variant="secondary" className={`bg-${statusLimits[userStatus].color}-100 dark:bg-${statusLimits[userStatus].color}-950 text-${statusLimits[userStatus].color}-800 dark:text-${statusLimits[userStatus].color}-100`}>
                    {statusLimits[userStatus].icon} {statusLimits[userStatus].label}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dob"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange("occupation", e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Address</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleInputChange("country", value)}
                disabled={!isEditing}
              >
                <SelectTrigger id="country">
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-muted-foreground" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {/* West Africa */}
                  <SelectItem value="Nigeria">🇳🇬 Nigeria</SelectItem>
                  <SelectItem value="Ghana">🇬🇭 Ghana</SelectItem>
                  <SelectItem value="Senegal">🇸🇳 Senegal</SelectItem>
                  <SelectItem value="Côte d'Ivoire">🇨🇮 Côte d'Ivoire</SelectItem>
                  <SelectItem value="Mali">🇲🇱 Mali</SelectItem>
                  <SelectItem value="Burkina Faso">🇧🇫 Burkina Faso</SelectItem>
                  <SelectItem value="Guinea">🇬🇳 Guinea</SelectItem>
                  <SelectItem value="Benin">🇧🇯 Benin</SelectItem>
                  <SelectItem value="Togo">🇹🇬 Togo</SelectItem>
                  <SelectItem value="Niger">🇳🇪 Niger</SelectItem>
                  <SelectItem value="Mauritania">🇲🇷 Mauritania</SelectItem>
                  <SelectItem value="Sierra Leone">🇸🇱 Sierra Leone</SelectItem>
                  <SelectItem value="Liberia">🇱🇷 Liberia</SelectItem>
                  <SelectItem value="Gambia">🇬🇲 Gambia</SelectItem>
                  <SelectItem value="Guinea-Bissau">🇬🇼 Guinea-Bissau</SelectItem>
                  <SelectItem value="Cape Verde">🇨🇻 Cape Verde</SelectItem>
                  {/* East Africa */}
                  <SelectItem value="Kenya">🇰🇪 Kenya</SelectItem>
                  <SelectItem value="Tanzania">🇹🇿 Tanzania</SelectItem>
                  <SelectItem value="Uganda">🇺🇬 Uganda</SelectItem>
                  <SelectItem value="Rwanda">🇷🇼 Rwanda</SelectItem>
                  <SelectItem value="Ethiopia">🇪🇹 Ethiopia</SelectItem>
                  {/* Southern Africa */}
                  <SelectItem value="South Africa">🇿🇦 South Africa</SelectItem>
                  <SelectItem value="Namibia">🇳🇦 Namibia</SelectItem>
                  <SelectItem value="Botswana">🇧🇼 Botswana</SelectItem>
                  <SelectItem value="Zimbabwe">🇿🇼 Zimbabwe</SelectItem>
                  <SelectItem value="Zambia">🇿🇲 Zambia</SelectItem>
                  {/* North Africa */}
                  <SelectItem value="Egypt">🇪🇬 Egypt</SelectItem>
                  <SelectItem value="Morocco">🇲🇦 Morocco</SelectItem>
                  <SelectItem value="Tunisia">🇹🇳 Tunisia</SelectItem>
                  <SelectItem value="Algeria">🇩🇿 Algeria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                disabled={!isEditing}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Link href="/language">
          <Card className="cursor-pointer hover:shadow-md hover:border-primary/50 transition-all">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl">🌍</span>
                  </div>
                  <div>
                    <p className="font-semibold text-base">Language / Langue</p>
                    <p className="text-sm text-muted-foreground">English (Current)</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="bg-transparent">
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* User Status & Transaction Limits */}
        <Card className="border-2 border-primary/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <IdCard className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Account Status & Limits</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Pi Network KYC verified. Select your status for transaction limits.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Your Status</Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(statusLimits).map(([key, data]: [string, any]) => (
                  <Button
                    key={key}
                    type="button"
                    variant={userStatus === key ? "default" : "outline"}
                    className={`h-auto py-4 flex-col gap-2 ${userStatus !== key ? "bg-transparent" : ""}`}
                    onClick={() => setUserStatus(key)}
                  >
                    <span className="text-2xl">{data.icon}</span>
                    <div className="text-center">
                      <p className="text-xs font-semibold">{data.label}</p>
                      <p className="text-[10px] font-medium">${data.limit.toLocaleString()}/month</p>
                      <p className="text-[9px] text-muted-foreground">π {getPiEquivalent(data.limit)}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{statusLimits[userStatus].icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-base mb-1">Current Status: {statusLimits[userStatus].label}</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Monthly Limit:</span>
                      <div className="text-right">
                        <span className="font-bold text-primary block">${statusLimits[userStatus].limit.toLocaleString()}</span>
                        <span className="text-[10px] text-muted-foreground">≈ π {getPiEquivalent(statusLimits[userStatus].limit)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Daily Limit:</span>
                      <div className="text-right">
                        <span className="font-semibold block">${(statusLimits[userStatus].limit / 30).toFixed(0)}</span>
                        <span className="text-[10px] text-muted-foreground">≈ π {getPiEquivalent(statusLimits[userStatus].limit / 30)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="secondary" className="h-5 bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-100">
                        {uploadedProof ? "Verified" : "Pending Verification"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Upload Proof Document</Label>
              <p className="text-xs text-muted-foreground">
                {userStatus === "student" && "Student ID, Enrollment letter, or Transcript"}
                {userStatus === "employee" && "Employment contract, Payslip, or Work ID"}
                {userStatus === "entrepreneur" && "Business registration, Tax ID, or Company documents"}
                {userStatus === "executive" && "Company registration, Board resolution, or CEO appointment letter"}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => document.getElementById("proof-upload")?.click()}
                  type="button"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  From Gallery
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => document.getElementById("proof-upload")?.click()}
                  type="button"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>
              <input
                id="proof-upload"
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={handleProofUpload}
              />
              {uploadedProof && (
                <div className="relative mt-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                        Document Uploaded
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        Under review - Approval within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  Why do we need this?
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  To comply with financial regulations and prevent fraud, we verify user status. Your Pi Network KYC is already complete - this just determines your transaction limits.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {isEditing && (
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground">
          Your personal information is encrypted and stored securely
        </p>
        
        {/* Hidden Admin Access - Click 5 times on version text */}
        <Link href="/admin-secret">
          <p className="text-center text-[10px] text-muted-foreground/20 hover:text-primary transition-colors mt-2 cursor-pointer">
            v1.0.0
          </p>
        </Link>
      </main>

      <BottomNav />
    </div>
  )
}
