import type React from "react"
import { Inter } from "next/font/google"
import "../../globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Solar Shine Electro - Admin Login",
  description: "Admin login for Solar Shine Electro e-commerce store",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-50`}>
      {children}
      <Toaster />
    </div>
  )
}

