"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { categories } from "@/lib/products"

export default function CategoriesPage() {
  const [mounted, setMounted] = useState(false)
  const [categoriesList, setCategoriesList] = useState([...categories])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCategories, setFilteredCategories] = useState([...categories])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState(null)
  const [categoryToDelete, setCategoryToDelete] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()

  const itemsPerPage = 5 // You can adjust this number as needed

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      setFilteredCategories(
        categoriesList.filter(
          (category) => category.name.toLowerCase().includes(query) || category.slug.toLowerCase().includes(query),
        ),
      )
    } else {
      setFilteredCategories(categoriesList)
    }
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, categoriesList])

  // Calculate pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage)

  const handleAddCategory = (categoryData) => {
    const newCategory = {
      id: `category-${Date.now()}`,
      ...categoryData,
      slug: categoryData.slug || categoryData.name.toLowerCase().replace(/\s+/g, "-"),
    }

    setCategoriesList((prev) => [...prev, newCategory])
    setIsAddDialogOpen(false)

    toast({
      title: "Category added",
      description: "The new category has been added successfully",
    })
  }

  const handleEditCategory = (categoryData) => {
    setCategoriesList((prev) =>
      prev.map((category) =>
        category.id === categoryToEdit.id
          ? {
              ...category,
              ...categoryData,
              slug: categoryData.slug || categoryData.name.toLowerCase().replace(/\s+/g, "-"),
            }
          : category,
      ),
    )

    setIsEditDialogOpen(false)
    setCategoryToEdit(null)

    toast({
      title: "Category updated",
      description: "The category has been updated successfully",
    })
  }

  const handleDeleteCategory = () => {
    setCategoriesList((prev) => prev.filter((category) => category.id !== categoryToDelete.id))
    setCategoryToDelete(null)

    toast({
      title: "Category deleted",
      description: "The category has been deleted successfully",
    })
  }

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
        <h1 className="text-2xl sm:text-3xl font-bold dark:text-gray-900">Categories</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600">
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-w-[95vw]">
            <CategoryForm onSubmit={handleAddCategory} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg border-gray-200 dark:border-gray-700 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-muted/50 dark:bg-gray-800 text-foreground">
                <TableHead className="text-foreground font-bold px-2 sm:px-4">Name</TableHead>
                <TableHead className="text-center text-foreground font-bold px-2 sm:px-4">Slug</TableHead>
                <TableHead className="text-center text-foreground font-bold px-2 sm:px-4">Products</TableHead>
                <TableHead className="text-center text-foreground font-bold px-2 sm:px-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="dark:text-gray-900">
              {paginatedCategories.length > 0 ? (
                paginatedCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium whitespace-nowrap px-2 sm:px-4">
                      <div>
                        {category.name}
                        <div className="text-xs text-gray-500">{category.slug}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap px-2 sm:px-4">{category.slug}</TableCell>
                    <TableCell className="text-center whitespace-nowrap px-2 sm:px-4">
                      {category.productCount || 0}
                    </TableCell>
                    <TableCell className="px-2 sm:px-4">
                      <div className="flex justify-center gap-2">
                        <Dialog
                          open={isEditDialogOpen && categoryToEdit?.id === category.id}
                          onOpenChange={(open) => {
                            setIsEditDialogOpen(open)
                            if (!open) setCategoryToEdit(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button className="dark:text-gray-100" variant="outline" size="sm" onClick={() => setCategoryToEdit(category)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px] max-w-[95vw]">
                            <CategoryForm category={categoryToEdit} onSubmit={handleEditCategory} />
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-900"
                              onClick={() => setCategoryToDelete(category)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="sm:max-w-[425px] max-w-[95vw]">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the category "{categoryToDelete?.name}". This action cannot
                                be undone and may affect products in this category.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleDeleteCategory}>
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
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    No categories found. Try adjusting your search or add a new category.
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
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCategories.length)} of{" "}
            {filteredCategories.length} categories
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

function CategoryForm({ category, onSubmit }) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "name" && !formData.slug) {
      setFormData((prev) => ({
        ...prev,
        slug: value.toLowerCase().replace(/\s+/g, "-"),
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{category ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogDescription>
          {category ? "Update the details for this category." : "Add a new product category to the system."}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Category Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="auto-generated-from-name"
          />
          <p className="text-sm text-gray-500">Leave empty to auto-generate from name</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Input id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>

        <DialogFooter>
          <Button type="submit">{category ? "Update Category" : "Add Category"}</Button>
        </DialogFooter>
      </form>
    </>
  )
}

