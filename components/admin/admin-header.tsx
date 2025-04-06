"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Bell, Settings, LogOut, ExternalLink, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/theme-toggle"

const sampleNotifications = [
  {
    id: 1,
    title: "New Order",
    message: "Order #ORD-12350 has been placed",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Low Stock Alert",
    message: "100W Solar Panel is running low on stock (5 remaining)",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "New Message",
    message: "You have a new customer message from Alex Johnson",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    title: "Payment Received",
    message: "Payment for order #ORD-12345 has been received",
    time: "Yesterday",
    read: true,
  },
  {
    id: 5,
    title: "New Subscriber",
    message: "New newsletter subscriber: maria@example.com",
    time: "Yesterday",
    read: true,
  },
]

export default function AdminHeader({ user }) {
  const router = useRouter()
  const [notifications, setNotifications] = useState(sampleNotifications)
  const [isNavigating, setIsNavigating] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const handleLogout = () => {
    localStorage.removeItem("admin_user")
    router.push("/admin/login")
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const navigateToSettings = () => {
    setIsNavigating(true)
    router.push("/admin/settings")
  }

  return (
    <header className=" h-16 border-b bg-background flex items-center justify-end lg:justify-between px-4  top-0 z-30">
      <div className="font-bold text-2xl hidden lg:flex">
        <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          Admin Panel
        </span>
      </div>

      <div className="flex items-center gap-4">

      <div className="opacity-0 invisible min-[510px]:opacity-100 min-[510px]:visible transition-all">
  <ThemeToggle variant="outline" />
</div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end" forceMount>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      markAllAsRead()
                    }}
                    className="text-xs h-8"
                  >
                    Mark all as read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation()
                    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[300px]">
              {notifications.length > 0 ? (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
                        notification.read ? "bg-background" : "bg-blue-50/50 dark:bg-blue-900/20"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        {!notification.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">No notifications</div>
              )}
            </ScrollArea>
            <div className="p-2 border-t text-center">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="w-full text-xs text-muted-foreground hover:text-foreground"
              >
                <Link href="/admin/notifications">View all notifications</Link>
              </Button>
            </div>
          </PopoverContent>
        </Popover>

       

        <Button asChild variant="outline" size="sm" className="flex">
          <Link href="/" target="_blank">
            <ExternalLink className="h-4 w-4 mr-1" /> View Site
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <div className="p-2 h-7 w-10 border-2 border-gray-300 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-orange-600 dark:text-orange-300 font-medium">
                {user?.name?.charAt(0) || "A"}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={navigateToSettings} className="p-0 m-0">
              <div className="flex items-center w-full p-2 rounded-[5px] hover:bg-transparent hover:border hover:border-gray-200 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center m-0 p-0">
             <ThemeToggle variant="ghost" size="default" showLabel={true} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

