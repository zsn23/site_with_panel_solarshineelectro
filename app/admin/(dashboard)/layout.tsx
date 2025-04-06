"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Inter } from "next/font/google"
import "../../globals.css"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"

const inter = Inter({ subsets: ["latin"] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("admin_user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push("/admin/login")
    }

    setLoading(false)
  }, [router, pathname])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    // <div className={`${inter.className} min-h-screen bg-gray-50`}>
    //   <div className="flex min-h-screen bg-gray-50">
    //     <AdminSidebar />
    //     <div className="flex-1 flex flex-col">
    //       <AdminHeader user={user} />
    //       <main className="flex-1 p-4">{children}</main>
    //     </div>
    //   </div>
    //   <Toaster />
    // </div>
    <div className="flex  min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex flex-col w-full">
        <AdminHeader user={user} />
        <div className=" p-4 overflow-x-auto">{children}</div>
      </div>
    </div>
  )
}

