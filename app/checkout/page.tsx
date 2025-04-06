"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Check, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  })

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to process order
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    })

    // Navigate first
router.push("/checkout/success")
// Then clear cart after short delay

setTimeout(() => {
  clearCart()
  // router.push("/cart")
}, 5000)
    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <Link href="/cart" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 dark:text-gray-300">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to cart
      </Link>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 dark:text-gray-900">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center mb-6">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white" : "bg-gray-200"}`}
              >
                {step > 1 ? <Check className="h-4 w-4" /> : 1}
              </div>
              <div className="h-1 flex-1 mx-2 bg-gray-200">
                <div
                  className={`h-full ${step > 1 ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gray-200"}`}
                  style={{ width: step > 1 ? "100%" : "0%" }}
                ></div>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white" : "bg-gray-200"}`}
              >
                {step > 2 ? <Check className="h-4 w-4" /> : 2}
              </div>
            </div>

            {step === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setStep(2)
                }}
              >
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formState.firstName}
                      onChange={handleChange}
                      required
                      
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" value={formState.lastName} onChange={handleChange} required />
                  </div>
                </div>

                <div className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" name="address" value={formState.address} onChange={handleChange} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={formState.city} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" value={formState.state} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" name="zipCode" value={formState.zipCode} onChange={handleChange} required />
                  </div>
                </div>

                <div className="mt-6 flex justify-end ">
                  <Button type="submit" className="border dark:border-gray-800">Continue to Payment</Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>

                <RadioGroup
                  value={formState.paymentMethod}
                  onValueChange={(value) => setFormState((prev) => ({ ...prev, paymentMethod: value }))}
                  className="mb-6"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                    <RadioGroupItem value="credit-card" className="dark:bg-gray-700" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Credit / Debit Card
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="cash-on-delivery" className="dark:bg-gray-700" id="cash-on-delivery" />
                    <Label htmlFor="cash-on-delivery" className="flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>

                {formState.paymentMethod === "credit-card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formState.cardNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          value={formState.cardExpiry}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardCvc">CVC</Label>
                        <Input
                          id="cardCvc"
                          name="cardCvc"
                          placeholder="123"
                          value={formState.cardCvc}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formState.paymentMethod === "cash-on-delivery" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                    <p className="text-sm text-yellow-800">
                      You will pay for your order when it is delivered to your address. Please ensure someone is
                      available to receive the package and make the payment.
                    </p>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="dark:text-gray-50">
                    Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="border dark:border-gray-900">
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4 dark:text-gray-900">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-4 mb-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <div>
                    <span className="font-medium">{item.product.name}</span>
                    <span className="text-gray-500 block text-sm">Qty: {item.quantity}</span>
                  </div>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

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
          </div>
        </div>
      </div>
    </div>
  )
}

