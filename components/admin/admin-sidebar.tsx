"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sun,
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  Mail,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Menu,
  Layers,
} from "lucide-react"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 445)
    }

    // Initial check
    checkScreenSize()

    // Add event listener
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      const mobileBreakpoint = 1024
      const isMobileView = window.innerWidth < mobileBreakpoint
      setIsMobile(isMobileView)

      // On mobile, sidebar starts closed but is accessible via toggle
      // On desktop, sidebar starts expanded
      if (isMobileView) {
        setCollapsed(false) // Don't collapse on mobile, just hide/show
        setIsOpen(false) // Start closed on mobile
      } else {
        setIsOpen(true) // Always visible on desktop
        setCollapsed(false) // Start expanded on desktop
      }
    }

    // Initial check
    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [pathname, isMobile])

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen((prev) => !prev)
    } else {
      setCollapsed((prev) => !prev)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_user")
    window.location.href = "/admin/login"
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin/dashboard",
    },
    {
      title: "Products",
      icon: <Package className="h-5 w-5" />,
      href: "/admin/products",
    },
    {
      title: "Categories",
      icon: <Layers className="h-5 w-5" />,
      href: "/admin/categories",
    },
    {
      title: "Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      href: "/admin/orders",
    },
    {
      title: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/admin/messages",
    },
    {
      title: "Newsletter",
      icon: <Mail className="h-5 w-5" />,
      href: "/admin/newsletters",
    },
    {
      title: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      href: "/admin/notifications",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
    },
  ]

  const sidebarClasses = isMobile
    ? `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out bg-background border-r ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`
    : `relative transition-all duration-300 ease-in-out bg-background border-r ${collapsed ? "w-16" : "w-64"}`

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside className={sidebarClasses}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-4 border-b">
            <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-md">
              {(!collapsed || isMobile) && (
                <div className="flex items-center justify-center gap-2">
                  <Sun className="h-5 w-5 text-orange-500" />
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    Solar Shine Electro
                  </span>
                </div>
              )}
              {collapsed && !isMobile && <Sun className="h-6 w-6 text-orange-500 mx-auto" />}
            </Link>
          </div>

          <ScrollArea className="flex-1 py-4">
            <nav className="px-2 space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400"
                        : "text-foreground hover:bg-accent"
                    } ${collapsed && !isMobile ? "justify-center" : ""}`}
                  >
                    {item.icon}
                    {(!collapsed || isMobile) && <span>{item.title}</span>}
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t">
            <Button
              variant="outline"
              className={`w-full ${collapsed && !isMobile ? "p-2" : ""}`}
              onClick={handleLogout}
            >
              <LogOut className={`h-5 w-5 ${collapsed && !isMobile ? "" : "mr-2"}`} />
              {(!collapsed || isMobile) && <span>Logout</span>}
            </Button>
          </div>
        </div>

        {/* Always visible toggle button */}
        <Button
          variant="ghost"
          size="icon"
          className={`border-2 border-muted absolute -right-3 top-5 h-5 w-5 z-40 rounded-full border bg-background shadow-lg ${
            isMobile ? "hidden" : "block"
          }`}
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight className="flex items-center" /> : <ChevronLeft className="flex items-center" />}
        </Button>
      </aside>

      {/* Hamburger Button - Always visible on mobile */}
      <Button
        variant="outline"
        size="icon"
        className={`absolute p-3 z-40 ${isMobile ? "flex" : "hidden"}`}
        onClick={toggleSidebar}
        style={{ top: "12px", left: "25px" }}
      >
        <Menu />
      </Button>

      {/* Admin Panel Heading - Hidden below 445px */}
      <div
        className={`absolute z-40 ${isMobile ? "flex" : "hidden"} ${isSmallScreen ? "hidden" : ""}`}
        style={{ top: "18px", left: "75px" }}
      >
        <Link href="/admin/dashboard" className="font-bold text-xl">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </Link>
      </div>
    </>
  )
}

