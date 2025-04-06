"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, MessageSquare, ShoppingCart, Mail, Layers } from "lucide-react"
import RecentOrdersTable from "@/components/admin/recent-orders-table"
import RecentMessagesTable from "@/components/admin/recent-messages-table"
import { products, categories } from "@/lib/products"
import { orders, messages, newsletters } from "@/lib/admin-data"

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold dark:text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Products"
          value={products.length}
          icon={<Package className="h-8 w-8 text-orange-500" />}
          description="Products in inventory"
          linkHref="/admin/products"
          linkText="View all products"
        />
        <DashboardCard
          title="Total Orders"
          value={orders.length}
          icon={<ShoppingCart className="h-8 w-8 text-green-500" />}
          description="Orders received"
          linkHref="/admin/orders"
          linkText="View all orders"
        />
        <DashboardCard
          title="Customer Messages"
          value={messages.length}
          icon={<MessageSquare className="h-8 w-8 text-blue-500" />}
          description="Inquiries from customers"
          linkHref="/admin/messages"
          linkText="View all messages"
        />
        <DashboardCard
          title="Newsletter Subscribers"
          value={newsletters.length}
          icon={<Mail className="h-8 w-8 text-purple-500" />}
          description="Email subscribers"
          linkHref="/admin/newsletters"
          linkText="View all subscribers"
        />

        <DashboardCard
          title="Categories"
          value={categories.length}
          icon={<Layers className="h-8 w-8 text-indigo-500" />}
          description="Product categories"
          linkHref="/admin/categories"
          linkText="Manage categories"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card style={{ height: "fit-content" }}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <RecentOrdersTable orders={orders.slice(0, 5)} />
          </CardContent>
        </Card>

        <Card style={{ height: "fit-content" }}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Recent Messages</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <RecentMessagesTable messages={messages.slice(0, 5)} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DashboardCard({ title, value, icon, description, linkHref, linkText }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground">{title}</h3>
          {icon}
        </div>
        <div className="flex flex-col">
          <div className="text-3xl font-bold text-foreground">{value}</div>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
          <Link
            href={linkHref}
            className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 text-sm mt-4 inline-block"
          >
            {linkText}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

