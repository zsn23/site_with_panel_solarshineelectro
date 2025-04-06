"use client"

import Link from "next/link"
import { CheckCircle, Home, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrderSuccessPage() {
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
      <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="dark:text-gray-300 text-gray-600 mb-2">Thank you for your purchase.</p>
      <p className="dark:text-gray-300 text-gray-600 mb-8">
        Your order number is: <span className="font-semibold">{orderNumber}</span>
      </p>

      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8 dark:text-gray-900">
        <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
        <div className="grid gap-4 text-left">
          <div className="flex">
            <div className="mr-4 mt-1">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                1
              </div>
            </div>
            <div>
              <h3 className="font-medium">Order Confirmation</h3>
              <p className="text-gray-600">You will receive an email confirmation with your order details.</p>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4 mt-1">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                2
              </div>
            </div>
            <div>
              <h3 className="font-medium">Order Processing</h3>
              <p className="text-gray-600">We'll prepare your items and get them ready for shipping.</p>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4 mt-1">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                3
              </div>
            </div>
            <div>
              <h3 className="font-medium">Shipping</h3>
              <p className="text-gray-600">Your order will be shipped and you'll receive tracking information.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline" className="flex items-center border dark:border-white">
          <Link href="/">
            <Home className="mr-2 h-4 w-4 " />
            Return to Home
          </Link>
        </Button>
        <Button
          asChild
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
        >
          <Link href="/products">
            <Package className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  )
}

