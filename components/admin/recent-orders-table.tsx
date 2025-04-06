import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export default function RecentOrdersTable({ orders }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300">
            Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300">
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300">
            Shipped
          </Badge>
        )
      case "delivered":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="p-0 rounded-lg overflow-hidden">
      <div className="overflow-x-auto p-1 border rounded-b-lg dark:border-gray-700">
        <Table className="table-auto">
          <TableHeader>
            <TableRow className="bg-muted/50 dark:bg-gray-800">
              <TableHead className="text-foreground font-bold">Order</TableHead>
              <TableHead className="text-center text-foreground font-bold">Customer</TableHead>
              <TableHead className="text-center text-foreground font-bold">Date</TableHead>
              <TableHead className="text-center text-foreground font-bold">Status</TableHead>
              <TableHead className="text-center text-foreground font-bold">Total</TableHead>
              <TableHead className="text-center text-foreground font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="border-b dark:border-gray-700 hover:bg-muted/50 dark:hover:bg-gray-800/50"
                >
                  <TableCell className="font-medium whitespace-nowrap">{order.orderNumber}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">{order.customer.name}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">{order.date}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">${order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/orders/${order.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No recent orders
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

