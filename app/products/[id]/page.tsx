"use client"

import { useState } from "react"
import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import { Star, Truck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)

  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
          <Image
            src={product.image || "/placeholder.svg?height=500&width=500"}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600 dark:text-gray-300">{product.reviews} reviews</span>
            </div>
          </div>

          <div>
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="ml-2 text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="text-gray-700 dark:text-gray-300">{product.description}</p>

          <div className="flex items-center space-x-4">
            <div className="border rounded-md flex">
              <button className="px-3 py-1 border-r" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button className="px-3 py-1 border-l" onClick={() => setQuantity((prev) => prev + 1)}>
                +
              </button>
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>

          <div className="pt-4 border-t space-y-3">
            <div className="flex items-center dark:text-gray-300 text-gray-700 ">
              <Truck className="h-5 w-5 mr-2 " />
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center dark:text-gray-300 text-gray-700">
              <ShieldCheck className="h-5 w-5 mr-2" />
              <span>2 year warranty included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="p-6 bg-white rounded-lg shadow-sm border mt-2">
          <h3 className="text-lg font-semibold mb-4 dark:text-gray-900">Product Description</h3>
          <p className="text-gray-700">{product.fullDescription || product.description}</p>
        </TabsContent>
        <TabsContent value="specifications" className="p-6 bg-white rounded-lg shadow-sm border mt-2">
          <h3 className="text-lg font-semibold mb-4 dark:text-gray-900">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:text-gray-900">
            {product.specifications?.map((spec, index) => (
              <div key={index} className="flex justify-between border-b pb-2">
                <span className="font-medium">{spec.name}</span>
                <span className="text-gray-600">{spec.value}</span>
              </div>
            )) || <p className="text-gray-500">Specifications not available for this product.</p>}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="p-6 bg-white rounded-lg shadow-sm border mt-2 dark:text-gray-900">
          <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
          {product.reviewsList?.map((review, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ml-2 font-medium">{review.name}</span>
                <span className="ml-auto text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          )) || <p className="text-gray-500">No reviews yet for this product.</p>}
        </TabsContent>
      </Tabs>
    </div>
  )
}

