"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MoreVertical, Handshake, Wallet, TrendingUp, ShieldCheck } from "lucide-react"

const onboardingSteps = [
  {
    icon: Handshake,
    title: "Welcome to UBAP",
    description:
      "The first Pan-African digital bank designed for Pi Network pioneers. Manage crypto, stocks, and fiat seamlessly.",
    iconBg: "bg-emerald-700",
    iconColor: "text-white",
  },
  {
    icon: Wallet,
    title: "Multi-Currency Wallet",
    description:
      "Manage Pi, Bitcoin, XRP, Stellar, precious metals, and 20+ African fiat currencies in one secure place.",
    iconBg: "bg-gray-100",
    iconColor: "text-emerald-700",
  },
  {
    icon: TrendingUp,
    title: "Trade & Invest Globally",
    description:
      "Buy stocks (Tesla, Apple, Netflix), trade cryptocurrencies, and invest in precious materials (gold, silver, diamond) with instant conversions.",
    iconBg: "bg-emerald-700",
    iconColor: "text-white",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Level Security",
    description:
      "Biometric authentication, 2FA protection, encrypted transactions, and cold storage for your crypto assets. Your funds are insured up to $250,000.",
    iconBg: "bg-emerald-700",
    iconColor: "text-white",
  },
]

interface OnboardingProps {
  onComplete: () => void
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const isLastStep = currentStep === onboardingSteps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const step = onboardingSteps[currentStep]
  const Icon = step.icon

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back"
          disabled={currentStep === 0}
        >
          <ArrowLeft className={`h-5 w-5 ${currentStep === 0 ? "text-gray-300" : "text-gray-900"}`} />
        </button>
        <h1 className="text-lg font-bold text-black">UBAP</h1>
        <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Menu">
          <MoreVertical className="h-5 w-5 text-gray-900" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Icon Circle */}
        <div className={`w-32 h-32 rounded-full ${step.iconBg} flex items-center justify-center mb-8`}>
          <Icon className={`h-16 w-16 ${step.iconColor}`} strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="text-[26px] font-bold text-black text-center mb-4 leading-tight">{step.title}</h2>

        {/* Description */}
        <p className="text-[15px] text-gray-600 text-center leading-relaxed max-w-[320px]">{step.description}</p>
      </div>

      {/* Bottom Navigation */}
      <div className="px-6 pb-10 space-y-6">
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep ? "bg-emerald-600 w-2 h-2" : "border-2 border-gray-300 bg-transparent"
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <Button
          onClick={handleNext}
          size="lg"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-base font-semibold rounded-xl"
          aria-label={isLastStep ? "Get Started" : "Next"}
        >
          {isLastStep ? "Get Started" : "Next"}
        </Button>

        {/* Demo mode notice for last step */}
        {isLastStep && (
          <p className="text-center text-sm text-gray-500">Starting with $10,000 demo balance to explore features</p>
        )}
      </div>
    </div>
  )
}
