"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
    })

    setFormData({
      name: "",
      whatsapp: "",
      email: "",
      message: "",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="container-fluid mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
            Have questions about our products or services? We're here to help. Fill out the form below or use our
            contact information to get in touch.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2 dark:text-gray-900">Our Location</h3>
            <p className="text-gray-600">
              123 Solar Street
              <br />
              Sunshine City, SC 12345
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2 dark:text-gray-900">Phone & WhatsApp</h3>
            <p className="text-gray-600">
              +1 (555) 123-4567
              <br />
              Mon-Fri: 9am - 6pm
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2 dark:text-gray-900">Email</h3>
            <p className="text-gray-600">
              info@solarshine.com
              <br />
              support@solarshine.com
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-6 dark:text-gray-900">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Number
                </label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  rows={5}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </div>

          <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px] md:h-auto">
            {/* Placeholder for map - in a real implementation, you would use Google Maps or similar */}
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <div className="text-center p-4">
                <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Map would be displayed here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg dark:text-gray-900">
          <h2 className="text-xl font-semibold mb-4 ">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">What are your business hours?</h3>
              <p className="text-gray-600">
                We're open Monday through Friday from 9am to 6pm, and Saturday from 10am to 4pm.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Do you offer installation services?</h3>
              <p className="text-gray-600">
                Yes, we provide professional installation services for all our solar products. Visit our Services page
                for more information.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">What areas do you serve?</h3>
              <p className="text-gray-600">
                We currently serve the entire Sunshine City metropolitan area and surrounding counties within a 50-mile
                radius.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">How quickly do you respond to inquiries?</h3>
              <p className="text-gray-600">We aim to respond to all inquiries within 24 business hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

