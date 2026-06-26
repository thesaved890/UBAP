import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AppWrapper } from "@/components/app-wrapper"
import { UBAPBackground } from "@/components/ubap-background"
import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "UBAP — United Bank of African Pioneers",
  description: "UBAP: United Bank of African Pioneers. Manage crypto (Pi, XRP, XLM, BTC), precious metals (Gold, Diamond, Silver), and instant fiat conversions across all African currencies.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#047857" />
      </head>
      <body className={inter.className}>
        <UBAPBackground />
        <LanguageProvider>
          <AppWrapper>{children}</AppWrapper>
        </LanguageProvider>
      </body>
    </html>
  )
}
