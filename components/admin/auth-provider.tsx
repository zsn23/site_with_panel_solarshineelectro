"use client"

import { useRouter } from "next/navigation"
import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to verify the session
        const storedUser = localStorage.getItem("admin_user")

        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    // In a real app, this would be an API call to authenticate
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo credentials
        if (email === "admin@example.com" && password === "password") {
          const userData = {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
          }

          setUser(userData)
          localStorage.setItem("admin_user", JSON.stringify(userData))
          resolve(userData)
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  // const logout = () => {
  //   setUser(null)
  //   localStorage.removeItem("admin_user")
  //   window.location.href = "/admin/login"
  // }

  const logout = () => {
    // Clear user data
    setUser(null)
    localStorage.removeItem("admin_user")
    // Use router.push for client-side navigation (faster)
    router.push("/admin/login")
  }

  const value = {
    user,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

