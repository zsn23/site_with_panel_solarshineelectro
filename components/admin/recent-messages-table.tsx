import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export default function RecentMessagesTable({ messages }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300">New</Badge>
        )
      case "read":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
            Read
          </Badge>
        )
      case "replied":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">
            Replied
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
              <TableHead className="text-foreground font-bold">Name</TableHead>
              <TableHead className="text-center text-foreground font-bold">Email</TableHead>
              <TableHead className="text-center text-foreground font-bold">Date</TableHead>
              <TableHead className="text-center text-foreground font-bold">Status</TableHead>
              <TableHead className="text-center text-foreground font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length > 0 ? (
              messages.map((message) => (
                <TableRow
                  key={message.id}
                  className="border-b dark:border-gray-700 hover:bg-muted/50 dark:hover:bg-gray-800/50"
                >
                  <TableCell className="font-medium whitespace-nowrap">{message.name}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">{message.email}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">{message.date}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">{getStatusBadge(message.status)}</TableCell>
                  <TableCell className="text-center">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/messages/${message.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No recent messages
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

