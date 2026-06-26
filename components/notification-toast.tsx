"use client"

import { useEffect, useState } from "react"
import { X, CheckCircle2, AlertCircle, TrendingUp, TrendingDown, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export type NotificationType =
  | "success"
  | "error"
  | "market-up"
  | "market-down"
  | "transaction"
  | "ai-insight"
  | "security"
  | "dividend"
  | "staking"
  | "regulatory"

interface NotificationToastProps {
  type: NotificationType
  title: string
  message: string
  duration?: number
  onClose?: () => void
}

export function NotificationToast({ type, title, message, duration = 5000, onClose }: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
    error: <AlertCircle className="h-5 w-5 text-red-600" />,
    "market-up": <TrendingUp className="h-5 w-5 text-emerald-600" />,
    "market-down": <TrendingDown className="h-5 w-5 text-red-600" />,
    transaction: <CheckCircle2 className="h-5 w-5 text-primary" />,
    "ai-insight": <Sparkles className="h-5 w-5 text-amber-500" />,
    security: <AlertCircle className="h-5 w-5 text-red-600" />,
    dividend: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
    staking: <CheckCircle2 className="h-5 w-5 text-primary" />,
    regulatory: <AlertCircle className="h-5 w-5 text-orange-600" />,
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-[100] max-w-sm animate-slide-in-right">
      <Card className="shadow-xl border-2">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">{icons[type]}</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm mb-1">{title}</p>
              <p className="text-xs text-muted-foreground">{message}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 flex-shrink-0"
              onClick={() => {
                setIsVisible(false)
                onClose?.()
              }}
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
