"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/admin/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Minus, Upload, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { products } from "@/lib/products"

export default function EditProductPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const { id } = params
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fullDescription: "",
    price: "",
    oldPrice: "",
    category: "",
    stock: "0",
    featured: false,
    image: null,
    specifications: [{ name: "", value: "" }],
  })

  useEffect(() => {
    setMounted(true)
    if (!authLoading && !user && mounted) {
      router.push("/admin/login")
    }
  }, [user, authLoading, router, mounted])

  // Load product data
  useEffect(() => {
    if (id) {
      const product = products.find((p) => p.id === id)

      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          fullDescription: product.fullDescription || "",
          price: product.price.toString(),
          oldPrice: product.oldPrice ? product.oldPrice.toString() : "",
          category: product.category,
          stock: product.stock.toString(),
          featured: product.featured || false,
          image: product.image,
          specifications: product.specifications || [{ name: "", value: "" }],
        })

        setPreviewImage(product.image)
      } else {
        toast({
          title: "Product not found",
          description: "The product you're trying to edit doesn't exist",
          variant: "destructive",
        })
        router.push("/admin/products")
      }

      setLoading(false)
    }
  }, [id, router, toast])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecs = [...formData.specifications]
    updatedSpecs[index] = { ...updatedSpecs[index], [field]: value }
    setFormData((prev) => ({ ...prev, specifications: updatedSpecs }))
  }

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { name: "", value: "" }],
    }))
  }

  const removeSpecification = (index) => {
    const updatedSpecs = formData.specifications.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, specifications: updatedSpecs }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to update the product
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Product updated successfully",
        description: "The product has been updated in your inventory",
      })

      router.push("/admin/products")
    } catch (error) {
      toast({
        title: "Error updating product",
        description: "There was an error updating the product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading || !mounted || !user || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief description of the product"
                    rows={2}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullDescription">Full Description</Label>
                  <Textarea
                    id="fullDescription"
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    placeholder="Detailed description of the product"
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium">Specifications</h3>
                <p className="text-sm text-gray-500">Add technical specifications for this product</p>

                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`spec-name-${index}`}>Specification</Label>
                      <Input
                        id={`spec-name-${index}`}
                        value={spec.name}
                        onChange={(e) => handleSpecificationChange(index, "name", e.target.value)}
                        placeholder="e.g., Power Output"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`spec-value-${index}`}>Value</Label>
                      <Input
                        id={`spec-value-${index}`}
                        value={spec.value}
                        onChange={(e) => handleSpecificationChange(index, "value", e.target.value)}
                        placeholder="e.g., 100W"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="mt-8"
                      onClick={() => removeSpecification(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addSpecification} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" /> Add Specification
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium">Product Details</h3>

                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oldPrice">Old Price ($) (Optional)</Label>
                  <Input
                    id="oldPrice"
                    name="oldPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.oldPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solar-panels">Solar Panels</SelectItem>
                      <SelectItem value="fans">AC/DC Fans</SelectItem>
                      <SelectItem value="inverters">Solar Inverters</SelectItem>
                      <SelectItem value="batteries">Dry Batteries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked === true }))}
                  />
                  <Label htmlFor="featured" className="cursor-pointer">
                    Featured product
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium">Product Image</h3>

                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {previewImage ? (
                    <div className="relative">
                      <img
                        src={previewImage || "/placeholder.svg"}
                        alt="Product preview"
                        className="mx-auto max-h-[200px] object-contain"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white"
                        onClick={() => {
                          setPreviewImage(null)
                          setFormData((prev) => ({ ...prev, image: null }))
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="py-8">
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Drag and drop an image, or click to browse</p>
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Button type="button" variant="outline" onClick={() => document.getElementById("image").click()}>
                        Select Image
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating Product..." : "Update Product"}
          </Button>
        </div>
      </form>
    </div>
  )
}

