"use client"

import { Home, TrendingUp, Users, User, DollarSign, Wallet } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"

export function BottomNav() {
  const pathname = usePathname()
  const { t } = useTranslation()

  const items = [
    { icon: Home, label: t("home"), href: "/" },
    { icon: Wallet, label: "Wallet", href: "/wallet" },
    { icon: TrendingUp, label: t("markets"), href: "/materials" },
    { icon: DollarSign, label: t("invest"), href: "/invest" },
    { icon: User, label: t("profile"), href: "/profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-bottom">
      <nav className="flex items-center justify-around max-w-lg mx-auto">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-3 px-3 text-xs transition-all duration-200 flex-1 relative",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className={cn("h-5 w-5 transition-transform", isActive && "scale-110")} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  aria-hidden="true"
                />
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
