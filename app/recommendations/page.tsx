"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Brain,
  TrendingUp,
  AlertTriangle,
  Target,
  PieChart,
  Shield,
  Zap,
  CheckCircle,
  Info,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function RecommendationsPage() {
  const [riskProfile, setRiskProfile] = useState<"conservative" | "moderate" | "aggressive">("moderate")
  const [quizCompleted, setQuizCompleted] = useState(true)

  const currentAllocation = {
    crypto: 45.2,
    stocks: 28.3,
    materials: 18.5,
    cash: 8.0,
  }

  const recommendedAllocation = {
    conservative: { crypto: 20, stocks: 40, materials: 25, cash: 15 },
    moderate: { crypto: 35, stocks: 35, materials: 20, cash: 10 },
    aggressive: { crypto: 50, stocks: 30, materials: 15, cash: 5 },
  }

  const recommendations = [
    {
      type: "diversify",
      title: "Diversify Crypto Holdings",
      description:
        "Your portfolio is heavily weighted toward stablecoins. Consider adding more growth-oriented cryptocurrencies.",
      impact: "Medium",
      action: "Increase BTC/ETH allocation by 10%",
      icon: PieChart,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
    },
    {
      type: "rebalance",
      title: "Rebalancing Alert",
      description:
        "Your crypto allocation has drifted 10% from your target. Consider rebalancing to maintain risk profile.",
      impact: "High",
      action: "Sell $2,000 crypto → Buy stocks",
      icon: Target,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/20",
    },
    {
      type: "opportunity",
      title: "Gold Investment Opportunity",
      description: "Gold prices are near 3-month low. Historical data suggests this is a good entry point.",
      impact: "Medium",
      action: "Invest $500-$1000 in gold",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    },
    {
      type: "risk",
      title: "High Risk Concentration",
      description: "25% of your portfolio is in a single asset (Pi Coin). Consider reducing concentration risk.",
      impact: "High",
      action: "Reduce Pi holdings by 10%",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
  ]

  const aiInsights = [
    {
      title: "Strong Performance This Month",
      description: "Your NVIDIA stock position is up 15.2% this month, outperforming the market by 8%.",
      sentiment: "positive",
    },
    {
      title: "Staking Opportunity",
      description: "Your ETH is idle. Stake it to earn 4.5% APY (estimated $45/month based on current holdings).",
      sentiment: "neutral",
    },
    {
      title: "Dividend Payment Incoming",
      description: "You'll receive $12.50 in dividends from Apple (AAPL) on March 15, 2024.",
      sentiment: "positive",
    },
    {
      title: "Volatility Warning",
      description:
        "Bitcoin volatility is 20% above historical average. Consider hedging with stablecoins or precious metals.",
      sentiment: "warning",
    },
  ]

  const targetAllocation = recommendedAllocation[riskProfile]
  const allocationDrift = Math.abs(currentAllocation.crypto - targetAllocation.crypto)

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">AI Recommendations</h1>
              <p className="text-xs opacity-90">Personalized investment insights</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Risk Profile Card */}
        <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-violet-200 dark:border-violet-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="h-5 w-5 text-violet-600" />
              Your Risk Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              {(["conservative", "moderate", "aggressive"] as const).map((profile) => (
                <Button
                  key={profile}
                  variant={riskProfile === profile ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRiskProfile(profile)}
                  className="flex-1 capitalize"
                >
                  {profile}
                </Button>
              ))}
            </div>
            {quizCompleted ? (
              <div className="p-3 rounded-lg bg-violet-100 dark:bg-violet-950/40 text-sm">
                <p className="font-medium text-violet-900 dark:text-violet-100 mb-1">
                  {riskProfile === "conservative" && "Low Risk, Steady Growth"}
                  {riskProfile === "moderate" && "Balanced Risk & Reward"}
                  {riskProfile === "aggressive" && "High Risk, High Returns"}
                </p>
                <p className="text-xs text-violet-700 dark:text-violet-300">
                  {riskProfile === "conservative" &&
                    "Focus on capital preservation with stable returns. Suitable for risk-averse investors."}
                  {riskProfile === "moderate" &&
                    "Balanced approach with diversified portfolio. Suitable for most investors."}
                  {riskProfile === "aggressive" &&
                    "Maximize returns through growth assets. Suitable for experienced investors."}
                </p>
              </div>
            ) : (
              <Button className="w-full bg-transparent" variant="outline">
                Take Risk Assessment Quiz
              </Button>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommendations">
              <Target className="h-4 w-4 mr-1" />
              Actions
            </TabsTrigger>
            <TabsTrigger value="allocation">
              <PieChart className="h-4 w-4 mr-1" />
              Balance
            </TabsTrigger>
            <TabsTrigger value="insights">
              <Brain className="h-4 w-4 mr-1" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-4 mt-6">
            {recommendations.map((rec, index) => (
              <Card key={index} className={rec.bgColor}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full ${rec.bgColor} flex items-center justify-center`}>
                      <rec.icon className={`h-5 w-5 ${rec.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-sm">{rec.title}</h3>
                        <Badge variant={rec.impact === "High" ? "destructive" : "secondary"} className="text-xs">
                          {rec.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                      <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium">{rec.action}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Apply Now
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="allocation" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Current vs Target</CardTitle>
                  {allocationDrift > 5 && (
                    <Badge variant="destructive" className="text-xs">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Drift: {allocationDrift.toFixed(1)}%
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(targetAllocation).map(([asset, target]) => {
                  const current = currentAllocation[asset as keyof typeof currentAllocation]
                  const difference = current - target
                  const isDrifted = Math.abs(difference) > 5

                  return (
                    <div key={asset} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium capitalize">{asset}</span>
                        <div className="flex items-center gap-2">
                          <span className={isDrifted ? "text-orange-600 font-semibold" : "text-muted-foreground"}>
                            {current.toFixed(1)}%
                          </span>
                          <span className="text-muted-foreground">→</span>
                          <span className="text-primary font-semibold">{target}%</span>
                          {isDrifted && (
                            <Badge variant="outline" className="text-xs ml-1">
                              {difference > 0 ? "+" : ""}
                              {difference.toFixed(1)}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Progress value={current} className="flex-1 h-2" />
                        <Progress value={target} className="flex-1 h-2 opacity-50" />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">Rebalancing Recommendation</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Your portfolio has drifted from optimal allocation. Rebalancing now can reduce risk and improve
                      returns.
                    </p>
                    <Button size="sm" className="w-full">
                      Auto-Rebalance Portfolio
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4 mt-6">
            {aiInsights.map((insight, index) => (
              <Card
                key={index}
                className={
                  insight.sentiment === "positive"
                    ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20"
                    : insight.sentiment === "warning"
                      ? "border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/20"
                      : ""
                }
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        insight.sentiment === "positive"
                          ? "bg-emerald-100 dark:bg-emerald-950"
                          : insight.sentiment === "warning"
                            ? "bg-orange-100 dark:bg-orange-950"
                            : "bg-blue-100 dark:bg-blue-950"
                      }`}
                    >
                      {insight.sentiment === "positive" ? (
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                      ) : insight.sentiment === "warning" ? (
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                      ) : (
                        <Info className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-1">AI-Powered Analysis</h3>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Our AI analyzes 50+ market indicators daily to provide personalized recommendations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
