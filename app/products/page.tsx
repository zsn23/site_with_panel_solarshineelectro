"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/products"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const searchQuery = searchParams.get("search")

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [filters, setFilters] = useState({
    category: categoryParam || "all",
    priceRange: [0, 1000],
    inStock: false,
  })
  const [sortBy, setSortBy] = useState("featured")

  useEffect(() => {
    let result = [...products]

    // Apply search filter if present
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (filters.category !== "all") {
      result = result.filter((product) => product.category === filters.category)
    }

    // Apply price range filter
    result = result.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Apply in-stock filter
    if (filters.inStock) {
      result = result.filter((product) => product.stock > 0)
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      default:
        // 'featured' is default
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    setFilteredProducts(result)
  }, [filters, sortBy, searchQuery])

  // Update category filter when URL param changes
  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }))
    }
  }, [categoryParam])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Our Products</h1>
      {searchQuery && (
        <p className="text-gray-600 mb-6 dark:text-gray-300">
          Search results for: <span className="font-medium">"{searchQuery}"</span>
        </p>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h2 className="font-semibold text-lg mb-4 dark:text-gray-900">Filters</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 dark:text-gray-700">Category</h3>
                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
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

              <div>
                <h3 className="font-medium mb-2 dark:text-gray-900">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 dark:bg-gray-900 dark:p-3 rounded-[5px]">
                <Checkbox
                  id="in-stock"
                  checked={filters.inStock}
                  onCheckedChange={(checked) => setFilters({ ...filters, inStock: checked === true })}
                />
                <Label htmlFor="in-stock">In Stock Only</Label>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  setFilters({
                    category: "all",
                    priceRange: [0, 1000],
                    inStock: false,
                  })
                }
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            <p className="text-gray-500 dark:text-gray-200">{filteredProducts.length} products</p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products match your filters.</p>
              <Button
                variant="link"
                onClick={() =>
                  setFilters({
                    category: "all",
                    priceRange: [0, 1000],
                    inStock: false,
                  })
                }
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

