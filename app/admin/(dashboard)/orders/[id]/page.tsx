"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/admin/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Printer, Mail } from "lucide-react"
import { orders } from "@/lib/admin-data"
import { useToast } from "@/components/ui/use-toast"

export default function OrderDetailsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const { id } = params
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [order, setOrder] = useState(null)
  const [status, setStatus] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!authLoading && !user && mounted) {
      router.push("/admin/login")
    }
  }, [user, authLoading, router, mounted])

  // Load order data
  useEffect(() => {
    if (id) {
      const orderData = orders.find((o) => o.id === id)

      if (orderData) {
        setOrder(orderData)
        setStatus(orderData.status)
      } else {
        toast({
          title: "Order not found",
          description: "The order you're looking for doesn't exist",
          variant: "destructive",
        })
        router.push("/admin/orders")
      }

      setLoading(false)
    }
  }, [id, router, toast])

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus)
    setIsUpdating(true)

    try {
      // In a real app, this would be an API call to update the order status
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      setOrder((prev) => ({ ...prev, status: newStatus }))

      toast({
        title: "Status updated",
        description: `Order status has been updated to ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: "Error updating status",
        description: "There was an error updating the order status",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

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

  if (authLoading || !mounted || !user || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
        <p className="text-gray-500 mb-4">The order you're looking for doesn't exist or has been removed.</p>
        <Button asChild variant="outline">
          <Link href="/admin/orders">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild>
        <Link href="/admin/orders">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Orders
        </Link>
      </Button>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold dark:text-gray-900">Order Details</h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-1" /> Print Order
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-1" /> Email Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-500">Order Number</div>
                  <div className="font-medium">{order.orderNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Date Placed</div>
                  <div className="font-medium">{order.date}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Amount</div>
                  <div className="font-medium">${order.total.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div>{getStatusBadge(order.status)}</div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden">
                              <img
                                src={item.image || "/placeholder.svg?height=40&width=40"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span>{item.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 flex justify-end">
                <div className="w-full max-w-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Discount</span>
                      <span>-${order.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p>{order.paymentMethod}</p>
                  {order.paymentMethod === "Credit Card" && (
                    <p className="text-gray-500 mt-1">
                      {order.paymentDetails.cardType} ending in {order.paymentDetails.lastFour}
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="font-medium mb-2">Billing Address</h3>
                  <p>{order.billingAddress.name}</p>
                  <p>{order.billingAddress.street}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Contact Details</h3>
                  <p>{order.customer.name}</p>
                  <p className="text-gray-500">{order.customer.email}</p>
                  <p className="text-gray-500">{order.customer.phone}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-1">Shipping Address</h3>
                  <p>{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Current Status</h3>
                  <div>{getStatusBadge(order.status)}</div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Update Status</h3>
                  <Select value={status} onValueChange={handleStatusChange} disabled={isUpdating}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  {isUpdating && <p className="text-sm text-gray-500 mt-2">Updating status...</p>}
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Order Timeline</h3>
                  <div className="space-y-3">
                    {order.timeline.map((event, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2"></div>
                        <div>
                          <p className="font-medium">{event.status}</p>
                          <p className="text-sm text-gray-500">
                            {event.date} {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

