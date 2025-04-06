"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/admin/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, ChevronLeft, ChevronRight, Filter, Calendar, Mail } from "lucide-react"
import { messages } from "@/lib/admin-data"

export default function MessagesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [messagesList, setMessagesList] = useState([...messages])

  const itemsPerPage = 10

  useEffect(() => {
    setMounted(true)
    if (!loading && !user && mounted) {
      router.push("/admin/login")
    }
  }, [user, loading, router, mounted])

  // Filter and search messages
  useEffect(() => {
    let filtered = [...messages]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (message) =>
          message.name.toLowerCase().includes(query) ||
          message.email.toLowerCase().includes(query) ||
          message.message.toLowerCase().includes(query),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((message) => message.status === statusFilter)
    }

    setMessagesList(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, statusFilter])

  // Calculate pagination
  const totalPages = Math.ceil(messagesList.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedMessages = messagesList.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>
      case "read":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Read</Badge>
      case "replied":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Replied</Badge>
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
        <h1 className="text-2xl sm:text-3xl font-bold dark:text-gray-900">Customer Messages</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search messages..."
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
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
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
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-muted/50 dark:bg-gray-800 text-foreground">
                <TableHead className="text-foreground font-bold  ">Name</TableHead>
                <TableHead className="text-center text-foreground font-bold  ">Email</TableHead>
                <TableHead className="text-center text-foreground font-bold">Message</TableHead>
                <TableHead className="text-center text-foreground font-bold  ">Date</TableHead>
                <TableHead className="text-center text-foreground font-bold  ">Status</TableHead>
                <TableHead className="text-center text-foreground font-bold  ">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="dark:text-gray-900">
              {paginatedMessages.length > 0 ? (
                paginatedMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium  ">
                      <div className="flex flex-col whitespace-nowrap">
                        <span>{message.name}</span>
                        <span className="text-xs text-gray-500 sm:hidden">{message.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center    ">{message.email}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-center ">{message.message}</TableCell>
                    <TableCell className="text-center whitespace-nowrap ">{message.date}</TableCell>
                    <TableCell className="text-center   ">{getStatusBadge(message.status)}</TableCell>
                    <TableCell className=" ">
                      <div className="flex justify-center flex-wrap gap-1 sm:gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8  sm:px-3 dark:text-gray-100"
                          onClick={() => router.push(`/admin/messages/${message.id}`)}
                          
                        >
                          <Eye className="h-4 w-4 sm:mr-1" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                        {message.status !== "replied" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8  sm:px-3 text-blue-500 border-blue-200 hover:bg-blue-50 dark:hover:bg-gray-900"
                            onClick={() => router.push(`/admin/messages/${message.id}?reply=true`)}
                          >
                            <Mail className="h-4 w-4 sm:mr-1" />
                            <span className="hidden sm:inline">Reply</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No messages found. Try adjusting your filters.
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
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, messagesList.length)} of {messagesList.length}{" "}
            messages
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

