"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Minus, Upload, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { categories } from "@/lib/products"

export default function AddProductPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fullDescription: "",
    price: "",
    oldPrice: "",
    category: "",
    stock: "1",
    featured: false,
    image: null,
    specifications: [{ name: "", value: "" }],
    useWhatsapp: false,
    whatsappNumber: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    setMounted(true)
  }, [])

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
      // In a real app, this would be an API call to save the product
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a random ID for the new product
      const newProductId = `product-${Math.random().toString(36).substring(2, 10)}`

      toast({
        title: "Product added successfully",
        description: "The new product has been added to your inventory",
      })

      router.push("/admin/products")
    } catch (error) {
      toast({
        title: "Error adding product",
        description: "There was an error adding the product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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
      <div className="flex items-center">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold dark:text-gray-900">Add New Product</h1>
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
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="useWhatsapp"
                    name="useWhatsapp"
                    checked={formData.useWhatsapp}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, useWhatsapp: checked === true }))}
                  />
                  <Label htmlFor="useWhatsapp" className="cursor-pointer">
                    Use WhatsApp for ordering (hide price)
                  </Label>
                </div>

                {formData.useWhatsapp ? (
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                    <Input
                      id="whatsappNumber"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      placeholder="+1234567890"
                      required={formData.useWhatsapp}
                    />
                    <p className="text-sm text-gray-500">Include country code (e.g., +1 for US)</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2 mt-4">
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
                        required={!formData.useWhatsapp}
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
                  </>
                )}

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
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white dark:bg-gray-900"
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
            {isSubmitting ? "Adding Product..." : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  )
}

