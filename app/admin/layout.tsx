import type React from "react"
import { Inter } from "next/font/google"
import "../globals.css"
import { AuthProvider } from "@/components/admin/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Solar Shine Electro - Admin Panel",
  description: "Admin panel for Solar Shine Electro e-commerce store",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-background`}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}

