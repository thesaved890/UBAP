"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useState, useEffect } from "react"

interface PinInputProps {
  onComplete?: (pin: string) => void
  onCancel?: () => void
  title?: string
  subtitle?: string
}

export function PinInput({
  onComplete,
  onCancel,
  title = "Enter PIN",
  subtitle = "Enter your 6-digit transaction PIN",
}: PinInputProps) {
  const [pin, setPin] = useState<string[]>(Array(6).fill(""))
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (pin.every((digit) => digit !== "") && onComplete) {
      onComplete(pin.join(""))
    }
  }, [pin, onComplete])

  const handleNumberClick = (num: string) => {
    if (activeIndex < 6) {
      const newPin = [...pin]
      newPin[activeIndex] = num
      setPin(newPin)
      setActiveIndex(Math.min(activeIndex + 1, 5))
    }
  }

  const handleDelete = () => {
    if (activeIndex > 0) {
      const newPin = [...pin]
      newPin[activeIndex - 1] = ""
      setPin(newPin)
      setActiveIndex(Math.max(activeIndex - 1, 0))
    }
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="pt-6 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {/* PIN Display */}
          <div className="flex justify-center gap-3">
            {pin.map((digit, idx) => (
              <div
                key={idx}
                className={`h-12 w-12 rounded-lg border-2 flex items-center justify-center text-2xl font-bold transition-colors ${
                  digit ? "border-primary bg-primary/10" : idx === activeIndex ? "border-primary" : "border-muted"
                }`}
              >
                {digit && "•"}
              </div>
            ))}
          </div>

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                variant="outline"
                size="lg"
                className="h-14 text-xl font-semibold bg-transparent"
                onClick={() => handleNumberClick(num.toString())}
              >
                {num}
              </Button>
            ))}
            <Button variant="ghost" size="lg" className="h-14" onClick={onCancel}>
              <X className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 text-xl font-semibold bg-transparent"
              onClick={() => handleNumberClick("0")}
            >
              0
            </Button>
            <Button variant="ghost" size="lg" className="h-14" onClick={handleDelete}>
              ←
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
