"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/admin/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, ChevronLeft, ChevronRight, Filter, Calendar } from "lucide-react"
import { orders } from "@/lib/admin-data"

export default function OrdersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersList, setOrdersList] = useState([...orders])

  const itemsPerPage = 10

  useEffect(() => {
    setMounted(true)
    if (!loading && !user && mounted) {
      router.push("/admin/login")
    }
  }, [user, loading, router, mounted])

  // Filter and search orders
  useEffect(() => {
    let filtered = [...orders]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(query) ||
          order.customer.name.toLowerCase().includes(query) ||
          order.customer.email.toLowerCase().includes(query),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setOrdersList(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, statusFilter])

  // Calculate pagination
  const totalPages = Math.ceil(ordersList.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = ordersList.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>
      case "shipped":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading || !mounted || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold dark:text-gray-900">Orders</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-500" />
            <Select defaultValue="last30">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7">Last 7 days</SelectItem>
                <SelectItem value="last30">Last 30 days</SelectItem>
                <SelectItem value="thisMonth">This month</SelectItem>
                <SelectItem value="lastMonth">Last month</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 shadow-md rounded-lg overflow-hidden">
        <Table className="table-auto">
          <TableHeader>
            <TableRow className="bg-muted/50 dark:bg-gray-800 text-foreground">
              <TableHead className="text-foreground font-bold whitespace-nowrap">Order Number</TableHead>
              <TableHead className="text-center text-foreground font-bold">Date</TableHead>
              <TableHead className="text-center text-foreground font-bold">Customer</TableHead>
              <TableHead className="text-center text-foreground font-bold">Total</TableHead>
              <TableHead className="text-center text-foreground font-bold">Status</TableHead>
              <TableHead className="text-center text-foreground font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="dark:text-gray-900">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium whitespace-nowrap">{order.orderNumber}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">{order.date}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    <div>
                      <div className="font-medium whitespace-nowrap">{order.customer.name}</div>
                      <div className="text-sm text-gray-500 whitespace-nowrap">{order.customer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">${order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-center">
                    <Button className="dark:text-gray-100" variant="outline" size="sm" onClick={() => router.push(`/admin/orders/${order.id}`)}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No orders found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500 text-center sm:text-left">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, ordersList.length)} of {ordersList.length}{" "}
            orders
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm dark:text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

