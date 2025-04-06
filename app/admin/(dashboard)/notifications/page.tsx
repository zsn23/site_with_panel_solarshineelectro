"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Bell, Trash2 } from "lucide-react"

// Sample notifications data
const sampleNotifications = [
  {
    id: 1,
    title: "New Order",
    message: "Order #ORD-12350 has been placed",
    time: "10 minutes ago",
    date: "2023-04-10",
    read: false,
    type: "order",
  },
  {
    id: 2,
    title: "Low Stock Alert",
    message: "100W Solar Panel is running low on stock (5 remaining)",
    time: "1 hour ago",
    date: "2023-04-10",
    read: false,
    type: "inventory",
  },
  {
    id: 3,
    title: "New Message",
    message: "You have a new customer message from Alex Johnson",
    time: "3 hours ago",
    date: "2023-04-10",
    read: true,
    type: "message",
  },
  {
    id: 4,
    title: "Payment Received",
    message: "Payment for order #ORD-12345 has been received",
    time: "Yesterday",
    date: "2023-04-09",
    read: true,
    type: "payment",
  },
  {
    id: 5,
    title: "New Subscriber",
    message: "New newsletter subscriber: maria@example.com",
    time: "Yesterday",
    date: "2023-04-09",
    read: true,
    type: "subscriber",
  },
  {
    id: 6,
    title: "Order Shipped",
    message: "Order #ORD-12340 has been shipped",
    time: "2 days ago",
    date: "2023-04-08",
    read: true,
    type: "order",
  },
  {
    id: 7,
    title: "Review Received",
    message: "New 5-star review for 100W Solar Panel",
    time: "3 days ago",
    date: "2023-04-07",
    read: true,
    type: "review",
  },
]

export default function NotificationsPage() {
  const [mounted, setMounted] = useState(false)
  const [notifications, setNotifications] = useState(sampleNotifications)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    setMounted(true)
  }, [])

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.type === filter)

  const getTypeColor = (type) => {
    switch (type) {
      case "order":
        return "bg-blue-100 text-blue-800"
      case "inventory":
        return "bg-yellow-100 text-yellow-800"
      case "message":
        return "bg-purple-100 text-purple-800"
      case "payment":
        return "bg-green-100 text-green-800"
      case "subscriber":
        return "bg-orange-100 text-orange-800"
      case "review":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold dark:text-gray-900">Notifications</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={!notifications.some((n) => !n.read)}>
            <Check className="h-4 w-4 mr-1" /> Mark All as Read
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-900"
            onClick={clearAllNotifications}
            disabled={notifications.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Clear All
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 ">
        <Button className="border" variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
          All
        </Button>
        <Button className="border" variant={filter === "unread" ? "default" : "outline"} size="sm" onClick={() => setFilter("unread")}>
          Unread
        </Button>
        <Button className="border" variant={filter === "order" ? "default" : "outline"} size="sm" onClick={() => setFilter("order")}>
          Orders
        </Button>
        <Button
          variant={filter === "inventory" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("inventory")}
          className="border"
        >
          Inventory
        </Button>
        <Button className="border" variant={filter === "message" ? "default" : "outline"} size="sm" onClick={() => setFilter("message")}>
          Messages
        </Button>
        <Button className="border" variant={filter === "payment" ? "default" : "outline"} size="sm" onClick={() => setFilter("payment")}>
          Payments
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">All Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length > 0 ? (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg ${notification.read ? "bg-white" : "bg-blue-50"}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center flex-wrap justify-between gap-2 mb-1">
                        <div className="flex gap-2">
                          <h3 className="font-medium whitespace-nowrap dark:text-gray-900">{notification.title}</h3>

                          <Badge className={getTypeColor(notification.type)}>
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </Badge>
                        </div>

                        <div>
                          {!notification.read && (
                            <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                              <Check className="h-4 w-4" /> Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-sm text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No notifications</h3>
              <p className="text-gray-500">
                {filter !== "all"
                  ? `You don't have any ${filter === "unread" ? "unread" : filter} notifications.`
                  : "You don't have any notifications at the moment."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

