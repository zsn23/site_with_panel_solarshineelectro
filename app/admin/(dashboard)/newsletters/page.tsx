"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Search, ChevronLeft, ChevronRight, Calendar, Trash2, Download, Send } from "lucide-react"
import { newsletters } from "@/lib/admin-data"
import { useToast } from "@/components/ui/use-toast"

export default function NewslettersPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [subscribersList, setSubscribersList] = useState([...newsletters])
  const [subscriberToDelete, setSubscriberToDelete] = useState(null)
  const { toast } = useToast()

  const itemsPerPage = 10

  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter and search subscribers
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      setSubscribersList(newsletters.filter((subscriber) => subscriber.email.toLowerCase().includes(query)))
    } else {
      setSubscribersList([...newsletters])
    }
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery])

  const handleDeleteSubscriber = (id) => {
    // In a real app, this would make an API call to delete the subscriber
    const updatedSubscribers = subscribersList.filter((subscriber) => subscriber.id !== id)
    setSubscribersList(updatedSubscribers)

    toast({
      title: "Subscriber removed",
      description: "The subscriber has been successfully removed from the newsletter list",
    })

    setSubscriberToDelete(null)
  }

  const exportToCSV = () => {
    // Create CSV content
    const headers = ["Email", "Date Subscribed", "Source"]
    const csvRows = [
      headers.join(","),
      ...subscribersList.map((subscriber) => [subscriber.email, subscriber.date, subscriber.source].join(",")),
    ]
    const csvContent = csvRows.join("\n")

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `newsletter_subscribers_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "CSV exported successfully",
      description: `Exported ${subscribersList.length} subscribers to CSV file.`,
    })
  }

  // Calculate pagination
  const totalPages = Math.ceil(subscribersList.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedSubscribers = subscribersList.slice(startIndex, startIndex + itemsPerPage)

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold dark:text-gray-900">Newsletter Subscribers</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-1" /> Export CSV
          </Button>
          <Button
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
            size="sm"
            onClick={() => router.push("/admin/newsletters/send")}
          >
            <Send className="h-4 w-4 mr-1" /> Send Newsletter
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-500" />
          <select className="border rounded-md px-3 py-1.5 text-sm">
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
            <option value="thisMonth">This month</option>
            <option value="lastMonth">Last month</option>
          </select>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="table-auto">
            <TableHeader>
              <TableRow className="bg-muted/50 dark:bg-gray-800 text-foreground">
                <TableHead className="text-foreground font-bold">Email</TableHead>
                <TableHead className="text-center text-foreground font-bold">Date Subscribed</TableHead>
                <TableHead className="text-center text-foreground font-bold">Source</TableHead>
                <TableHead className="text-center text-foreground font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="dark:text-gray-900">
              {paginatedSubscribers.length > 0 ? (
                paginatedSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium whitespace-nowrap">{subscriber.email}</TableCell>
                    <TableCell className="text-center whitespace-nowrap">{subscriber.date}</TableCell>
                    <TableCell className="text-center whitespace-nowrap">{subscriber.source}</TableCell>
                    <TableCell className="text-center">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-900"
                            onClick={() => setSubscriberToDelete(subscriber)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove the subscriber "{subscriberToDelete?.email}" from your newsletter list.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => handleDeleteSubscriber(subscriberToDelete?.id)}
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    No subscribers found. Try adjusting your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500 text-center sm:text-left">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, subscribersList.length)} of{" "}
            {subscribersList.length} subscribers
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

