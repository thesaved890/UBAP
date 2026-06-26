"use client"

import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Bell, Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PriceAlertsPage() {
  const [alerts, setAlerts] = useState([
    { id: 1, asset: "Pi Coin", condition: "above", price: 314159, enabled: true, triggered: true },
    { id: 2, asset: "Bitcoin", condition: "below", price: 42000, enabled: true, triggered: false },
    { id: 3, asset: "Gold", condition: "below", price: 80, enabled: true, triggered: true },
    { id: 4, asset: "TSLA", condition: "above", price: 750, enabled: false, triggered: false },
  ])

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <Link href="/notifications/settings">
            <Button variant="ghost" size="icon" className="text-primary-foreground mb-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Price Alerts</h1>
          <p className="text-sm opacity-90 mt-1">Set custom thresholds for your assets</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Create New Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Create New Alert
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="asset">Asset</Label>
              <Select>
                <SelectTrigger id="asset">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pi">Pi Coin</SelectItem>
                  <SelectItem value="btc">Bitcoin</SelectItem>
                  <SelectItem value="eth">Ethereum</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="tsla">Tesla Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="condition">Condition</Label>
              <Select>
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="above">Price goes above</SelectItem>
                  <SelectItem value="below">Price drops below</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Target Price</Label>
              <Input id="price" type="number" placeholder="0.00" />
            </div>

            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Alerts ({alerts.filter((a) => a.enabled).length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${alert.triggered ? "bg-primary/5 border-primary/30" : "bg-muted/30"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-semibold">{alert.asset}</p>
                      {alert.triggered && (
                        <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                          Triggered
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {alert.condition === "above" ? (
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span>
                        Price {alert.condition} ${alert.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={alert.enabled}
                      onCheckedChange={(checked) => {
                        setAlerts(alerts.map((a) => (a.id === alert.id ? { ...a, enabled: checked } : a)))
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => setAlerts(alerts.filter((a) => a.id !== alert.id))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
              <div>
                <p className="font-semibold text-sm mb-1">How Price Alerts Work</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  You'll receive instant notifications when your target price is reached. Alerts can be set for any
                  crypto, stock, or precious material in your portfolio.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}
