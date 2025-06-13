import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/firebase/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Estate Connect - Modern Property Platform | Uganda's #1 Real Estate Marketplace",
  description:
    "Discover your perfect property in Uganda with Estate Connect. Browse houses, land, condos, and architectural plans. Modern platform with verified listings and secure transactions.",
  keywords:
    "Uganda real estate, property for sale, houses for rent, land for sale, architectural plans, Kampala properties",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ModernHeader />
          <main className="pt-20">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
