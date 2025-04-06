"use client"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const { toast } = useToast()

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleRemove = (productId) => {
    removeFromCart(productId)
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    })
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8 dark:text-gray-300">Looks like you haven't added any products to your cart yet.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="hidden md:grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b">
              <div className="dark:text-gray-900 col-span-2 font-medium">Product</div>
              <div className="dark:text-gray-900 font-medium">Price</div>
              <div className="dark:text-gray-900 font-medium">Quantity</div>
              <div className="dark:text-gray-900 font-medium text-right">Total</div>
            </div>

            {cart.map((item) => (
              <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border-b items-center">
                <div className="md:col-span-2 flex items-center space-x-4">
                  <Image
                    src={item.product.image || "/placeholder.svg?height=80&width=80"}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="font-medium dark:text-gray-900">{item.product.name}</h3>
                    <button
                      onClick={() => handleRemove(item.product.id)}
                      className="text-sm text-red-500 flex items-center mt-1"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-gray-700">
                  <span className="md:hidden font-medium mr-2 dark:text-gray-900">Price:</span>${item.product.price.toFixed(2)}
                </div>

                <div>
                  <span className="md:hidden font-medium mr-2 dark:text-gray-900">Quantity:</span>
                  <div className="flex border rounded-md w-24 dark:text-gray-900">
                    <button
                      className="px-2 py-1 border-r"
                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 flex-1 text-center">{item.quantity}</span>
                    <button
                      className="px-2 py-1 border-l"
                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right font-medium dark:text-gray-900">
                  <span className="md:hidden font-medium mr-2">Total:</span>$
                  {(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="p-4 flex justify-between  flex-wrap ">
              <Button variant="outline" onClick={clearCart} className="m-1">
                Clear Cart
              </Button>
              <Button asChild variant="outline" className="m-1">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4 dark:text-gray-900">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              asChild
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
            >
              <Link href="/checkout">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <div className="mt-4 text-sm text-gray-500">
              <p>Free shipping on orders over $100</p>
              <p>Secure payment processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

