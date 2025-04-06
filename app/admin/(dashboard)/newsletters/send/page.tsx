"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Send, Users } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { newsletters } from "@/lib/admin-data"

export default function SendNewsletterPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    subject: "",
    content: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSending(true)

    try {
      // Simulate sending newsletter
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Newsletter sent successfully",
        description: `Your newsletter has been sent to ${newsletters.length} subscribers.`,
      })

      router.push("/admin/newsletters")
    } catch (error) {
      toast({
        title: "Error sending newsletter",
        description: "There was an error sending the newsletter. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
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
      <Button variant="outline" size="sm" asChild>
        <Link href="/admin/newsletters">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Subscribers
        </Link>
      </Button>
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold dark:text-gray-900">Send Newsletter</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap">
            <CardTitle className="text-xl">Compose Newsletter</CardTitle>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span>Sending to {newsletters.length} subscribers</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject">Email Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g., New Products Announcement"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Email Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your newsletter content here..."
                rows={12}
                required
              />
              <p className="text-sm text-gray-500">You can use basic HTML tags for formatting.</p>
            </div>

            <div className="flex justify-end flex-wrap gap-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                disabled={isSending}
              >
                {isSending ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Newsletter
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/admin/newsletters")}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

