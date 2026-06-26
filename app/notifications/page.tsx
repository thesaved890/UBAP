import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Shield,
  Gift,
  Megaphone,
  Settings,
  Trash2,
  CheckCheck,
  Clock,
  DollarSign,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "ai-insight",
      icon: <Sparkles className="h-5 w-5 text-amber-500" />,
      title: "AI Insight",
      message: "Your Tesla stock is up 5.2% today. Consider taking profits if it reaches your target.",
      time: "2 min ago",
      read: false,
      category: "insights",
    },
    {
      id: 2,
      type: "price-alert",
      icon: <TrendingDown className="h-5 w-5 text-red-600" />,
      title: "Price Alert Triggered",
      message: "Bitcoin dropped below your target price of $42,000. Current: $41,850",
      time: "15 min ago",
      read: false,
      category: "alerts",
    },
    {
      id: 3,
      type: "transaction",
      icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
      title: "Transaction Confirmed",
      message: "You successfully sent 100 Pi to @pioneer_254. Transaction ID: TXN-8765432",
      time: "1 hour ago",
      read: false,
      category: "transactions",
    },
    {
      id: 4,
      type: "staking",
      icon: <Gift className="h-5 w-5 text-primary" />,
      title: "Staking Reward Earned",
      message: "You earned 0.045 ETH from staking. New balance: 2.545 ETH",
      time: "3 hours ago",
      read: true,
      category: "rewards",
    },
    {
      id: 5,
      type: "ai-insight",
      icon: <Sparkles className="h-5 w-5 text-amber-500" />,
      title: "Diversification Recommended",
      message: "Based on market volatility, consider diversifying 15% into gold to reduce risk.",
      time: "5 hours ago",
      read: true,
      category: "insights",
    },
    {
      id: 6,
      type: "security",
      icon: <Shield className="h-5 w-5 text-red-600" />,
      title: "New Device Login Detected",
      message: "Login from iPhone 14 in Lagos, Nigeria. If this wasn't you, secure your account immediately.",
      time: "Yesterday",
      read: true,
      category: "security",
    },
    {
      id: 7,
      type: "market",
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      title: "Market Update",
      message: "Your portfolio gained $243.50 today. Best performer: NVIDIA (+7.3%)",
      time: "Yesterday",
      read: true,
      category: "market",
    },
    {
      id: 8,
      type: "dividend",
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      title: "Dividend Payment Received",
      message: "You received $12.45 dividend from Coca-Cola (KO). Automatically reinvested.",
      time: "2 days ago",
      read: true,
      category: "rewards",
    },
    {
      id: 9,
      type: "regulatory",
      icon: <Megaphone className="h-5 w-5 text-orange-600" />,
      title: "Regulatory Update",
      message: "Nigeria SEC announces new crypto trading guidelines. Review your compliance status.",
      time: "3 days ago",
      read: true,
      category: "regulatory",
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/notifications/settings">
                <Button variant="ghost" size="icon" className="text-primary-foreground">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Notifications</h1>
              <p className="text-sm opacity-90 mt-1">{unreadCount} unread messages</p>
            </div>
            <Button variant="secondary" size="sm" className="gap-2">
              <CheckCheck className="h-4 w-4" />
              Mark All Read
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="all" className="text-xs">
              All
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs rounded-full bg-red-600 text-white">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-xs">
              AI
            </TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs">
              Alerts
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-xs">
              Txns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {notifications.map((notif) => (
              <Card
                key={notif.id}
                className={`${!notif.read ? "border-primary/50 bg-primary/5" : ""} cursor-pointer hover:bg-accent/50 transition-colors`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${!notif.read ? "bg-primary/20" : "bg-muted"}`}
                      >
                        {notif.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-semibold text-sm">{notif.title}</p>
                        {!notif.read && <Badge className="h-2 w-2 p-0 rounded-full bg-primary" />}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{notif.message}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {notif.time}
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="insights" className="space-y-3">
            {notifications
              .filter((n) => n.category === "insights")
              .map((notif) => (
                <Card
                  key={notif.id}
                  className={`${!notif.read ? "border-primary/50 bg-primary/5" : ""} cursor-pointer hover:bg-accent/50 transition-colors`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                          {notif.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-semibold text-sm">{notif.title}</p>
                          {!notif.read && <Badge className="h-2 w-2 p-0 rounded-full bg-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{notif.message}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {notif.time}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="alerts" className="space-y-3">
            {notifications
              .filter((n) => n.category === "alerts")
              .map((notif) => (
                <Card
                  key={notif.id}
                  className={`${!notif.read ? "border-primary/50 bg-primary/5" : ""} cursor-pointer hover:bg-accent/50 transition-colors`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
                          {notif.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-semibold text-sm">{notif.title}</p>
                          {!notif.read && <Badge className="h-2 w-2 p-0 rounded-full bg-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{notif.message}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {notif.time}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="transactions" className="space-y-3">
            {notifications
              .filter((n) => n.category === "transactions")
              .map((notif) => (
                <Card
                  key={notif.id}
                  className={`${!notif.read ? "border-primary/50 bg-primary/5" : ""} cursor-pointer hover:bg-accent/50 transition-colors`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                          {notif.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-semibold text-sm">{notif.title}</p>
                          {!notif.read && <Badge className="h-2 w-2 p-0 rounded-full bg-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{notif.message}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {notif.time}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>

        {/* Empty State for filtered views */}
        {/* <div className="text-center py-12">
          <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg mb-2">No Notifications</h3>
          <p className="text-sm text-muted-foreground">You're all caught up!</p>
        </div> */}
      </main>

      <BottomNav />
    </div>
  )
}
