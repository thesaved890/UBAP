"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, Lock, Clock, Info } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const stakingData: Record<
  string,
  { name: string; symbol: string; apy: number; minStake: number; lockPeriod: string; balance: number }
> = {
  eth: {
    name: "Ethereum",
    symbol: "ETH",
    apy: 4.5,
    minStake: 0.01,
    lockPeriod: "Flexible",
    balance: 0.567,
  },
  bnb: {
    name: "Binance Coin",
    symbol: "BNB",
    apy: 7.2,
    minStake: 0.1,
    lockPeriod: "30 days",
    balance: 3.45,
  },
}

export default function StakingPage({ params }: { params: { symbol: string } }) {
  const [stakeAmount, setStakeAmount] = useState("")
  const staking = stakingData[params.symbol.toLowerCase()]

  if (!staking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Staking not available for this cryptocurrency</p>
      </div>
    )
  }

  const estimatedRewards = stakeAmount ? ((Number.parseFloat(stakeAmount) * staking.apy) / 100).toFixed(4) : "0"

  const handleStake = () => {
    if (!stakeAmount || Number.parseFloat(stakeAmount) < staking.minStake) return
    
    const annualRewards = Number.parseFloat(estimatedRewards)
    const monthlyRewards = (annualRewards / 12).toFixed(6)
    const dailyRewards = (annualRewards / 365).toFixed(6)
    
    alert(`✅ Staking Successful!\n\nStaked: ${stakeAmount} ${staking.symbol}\nAPY: ${staking.apy}%\nLock Period: ${staking.lockPeriod}\n\nEstimated Rewards:\n• Daily: ${dailyRewards} ${staking.symbol}\n• Monthly: ${monthlyRewards} ${staking.symbol}\n• Annual: ${estimatedRewards} ${staking.symbol}\n\nTransaction ID: ${Math.random().toString(36).substring(7).toUpperCase()}\n\nYou will start earning rewards immediately!`)
    
    // Reset form
    setStakeAmount("")
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="max-w-lg mx-auto">
          <Link href={`/crypto/${params.symbol}`}>
            <Button variant="ghost" size="icon" className="text-primary-foreground mb-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold mb-2">{staking.name} Staking</h1>
          <p className="text-sm opacity-90">Earn rewards by staking your {staking.symbol}</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* APY Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Annual Percentage Yield</p>
            <p className="text-5xl font-bold text-primary mb-2">{staking.apy}%</p>
            <Badge variant="secondary" className="bg-primary/20">
              <TrendingUp className="h-3 w-3 mr-1" />
              Earn Daily Rewards
            </Badge>
          </CardContent>
        </Card>

        {/* Staking Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stake {staking.symbol}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Amount to Stake</Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder={`Min: ${staking.minStake} ${staking.symbol}`}
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="pr-20"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7"
                  onClick={() => setStakeAmount(staking.balance.toString())}
                >
                  MAX
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Available: {staking.balance} {staking.symbol}
              </p>
            </div>

            {stakeAmount && Number.parseFloat(stakeAmount) >= staking.minStake && (
              <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Annual Rewards</span>
                  <span className="font-semibold text-primary">
                    {estimatedRewards} {staking.symbol}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Monthly Rewards</span>
                  <span className="font-semibold">
                    {(Number.parseFloat(estimatedRewards) / 12).toFixed(6)} {staking.symbol}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Daily Rewards</span>
                  <span className="font-semibold">
                    {(Number.parseFloat(estimatedRewards) / 365).toFixed(6)} {staking.symbol}
                  </span>
                </div>
              </div>
            )}

            <Button
              className="w-full h-12"
              disabled={!stakeAmount || Number.parseFloat(stakeAmount) < staking.minStake}
              onClick={handleStake}
            >
              <Lock className="h-4 w-4 mr-2" />
              Start Staking
            </Button>
          </CardContent>
        </Card>

        {/* Staking Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Staking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Lock Period</span>
              </div>
              <span className="font-semibold">{staking.lockPeriod}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Minimum Stake</span>
              <span className="font-semibold">
                {staking.minStake} {staking.symbol}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Reward Distribution</span>
              <span className="font-semibold">Daily</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Unstaking Period</span>
              <span className="font-semibold">24 hours</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Stakes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Active Stakes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Lock className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No active stakes yet</p>
              <p className="text-xs mt-1">Start staking to earn rewards</p>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>How it works:</strong> Stake your {staking.symbol} to help secure the network and earn
                  rewards. Your staked assets remain in your control.
                </p>
                <p>
                  <strong>Rewards:</strong> Earn {staking.apy}% APY paid daily. Rewards are automatically added to your
                  balance.
                </p>
                <p>
                  <strong>Unstaking:</strong> You can unstake anytime. Unstaked assets will be available after the
                  unstaking period.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
