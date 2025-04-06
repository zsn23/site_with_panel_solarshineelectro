"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/admin/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
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
import { Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { products } from "@/lib/products"
import { useToast } from "@/components/ui/use-toast"

export default function ProductsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsList, setProductsList] = useState([...products])
  const [productToDelete, setProductToDelete] = useState(null)
  const { toast } = useToast()

  const itemsPerPage = 10

  useEffect(() => {
    setMounted(true)
    if (!loading && !user && mounted) {
      router.push("/admin/login")
    }
  }, [user, loading, router, mounted])

  // Filter and search products
  useEffect(() => {
    let filtered = [...products]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((product) => product.category === categoryFilter)
    }

    // Apply stock filter
    if (stockFilter === "in-stock") {
      filtered = filtered.filter((product) => product.stock > 0)
    } else if (stockFilter === "out-of-stock") {
      filtered = filtered.filter((product) => product.stock === 0)
    }

    setProductsList(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, categoryFilter, stockFilter])

  const handleDeleteProduct = (id) => {
    // In a real app, this would make an API call to delete the product
    const updatedProducts = productsList.filter((product) => product.id !== id)
    setProductsList(updatedProducts)

    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted",
    })

    setProductToDelete(null)
  }

  // Calculate pagination
  const totalPages = Math.ceil(productsList.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = productsList.slice(startIndex, startIndex + itemsPerPage)

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
        <h1 className="text-3xl font-bold dark:text-gray-900">Products</h1>
        <Button
          asChild
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
        >
          <Link href="/admin/products/add">
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="solar-panels">Solar Panels</SelectItem>
                <SelectItem value="fans">AC/DC Fans</SelectItem>
                <SelectItem value="inverters">Solar Inverters</SelectItem>
                <SelectItem value="batteries">Dry Batteries</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Stock Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stock Status</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 shadow-md rounded-lg overflow-hidden">
        <Table className="table-auto">
          <TableHeader>
            <TableRow className="bg-muted/50 dark:bg-gray-800 text-foreground">
              <TableHead className="text-foreground font-bold">Product</TableHead>
              <TableHead className="text-center text-foreground font-bold">Category</TableHead>
              <TableHead className="text-center text-foreground font-bold">Price</TableHead>
              <TableHead className="text-center text-foreground font-bold">Stock</TableHead>
              <TableHead className="text-center text-foreground font-bold">Status</TableHead>
              <TableHead className="text-center text-foreground font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="dark:text-gray-900">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg?height=40&width=40"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="truncate max-w-[200px]">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">{product.category}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">{product.stock}</TableCell>
                  <TableCell className="text-center p-0 whitespace-nowrap">
                    {product.stock > 0 ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                        Out of Stock
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2 dark:text-gray-100">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/products/edit/${product.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-900"
                            onClick={() => setProductToDelete(product)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the product "{productToDelete?.name}". This action cannot be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => handleDeleteProduct(productToDelete?.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No products found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 ">
          <div className="text-sm text-gray-500 text-center sm:text-left">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, productsList.length)} of {productsList.length}{" "}
            products
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

