"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"

interface SuccessCelebrationProps {
  show: boolean
  message: string
  onComplete?: () => void
}

export function SuccessCelebration({ show, message, onComplete }: SuccessCelebrationProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([])

  useEffect(() => {
    if (show) {
      // Generate confetti pieces
      const pieces = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: ["bg-primary", "bg-secondary", "bg-accent"][Math.floor(Math.random() * 3)],
      }))
      setConfetti(pieces)

      // Clear after animation
      const timer = setTimeout(() => {
        setConfetti([])
        onComplete?.()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center pointer-events-none">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={`confetti absolute w-2 h-2 ${piece.color}`}
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}

      {/* Success message */}
      <div className="bg-card border-2 border-primary rounded-xl p-6 shadow-xl pointer-events-auto animate-scale-in">
        <div className="flex flex-col items-center gap-3 text-center">
          <CheckCircle2 className="h-16 w-16 text-primary" />
          <p className="text-lg font-semibold">{message}</p>
        </div>
      </div>
    </div>
  )
}
