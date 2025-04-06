"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { messages } from "@/lib/admin-data"

export default function MessageDetailPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const { id } = params
  const showReplyForm = searchParams.get("reply") === "true"

  const [mounted, setMounted] = useState(false)
  const [message, setMessage] = useState(null)
  const [replyText, setReplyText] = useState("")
  const [isReplying, setIsReplying] = useState(false)
  const [showReply, setShowReply] = useState(showReplyForm)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)

    // Find the message by ID
    const foundMessage = messages.find((m) => m.id === id)
    if (foundMessage) {
      setMessage(foundMessage)

      // If the message is new, mark it as read
      if (foundMessage.status === "new") {
        foundMessage.status = "read"
      }
    } else {
      router.push("/admin/messages")
    }
  }, [id, router])

  const handleSendReply = async () => {
    if (!replyText.trim()) return

    setIsReplying(true)

    try {
      // Simulate sending email
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update message status
      setMessage((prev) => ({
        ...prev,
        status: "replied",
        reply: {
          text: replyText,
          date: new Date().toLocaleDateString(),
        },
      }))

      setReplyText("")
      setShowReply(false)

      toast({
        title: "Reply sent",
        description: "Your reply has been sent successfully",
      })
    } catch (error) {
      toast({
        title: "Error sending reply",
        description: "There was an error sending your reply. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsReplying(false)
    }
  }

  if (!mounted || !message) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>
      case "read":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Read</Badge>
      case "replied":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Replied</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild>
        <Link href="/admin/messages">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Messages
        </Link>
      </Button>
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold dark:text-gray-900">Message Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg border mb-6">
                <p className="whitespace-pre-wrap dark:text-gray-900">{message.message}</p>
              </div>

              {message.reply && (
                <div className="mt-8 dark:text-gray-900">
                  <h3 className="font-medium text-lg mb-2 dark:text-gray-100">Your Reply</h3>
                  <div className="bg-orange-50 p-4 rounded-lg border">
                    <p className="whitespace-pre-wrap">{message.reply.text}</p>
                    <p className="text-sm text-gray-500 mt-2">Sent on {message.reply.date}</p>
                  </div>
                </div>
              )}

              {!message.reply && !showReply && (
                <Button
                  onClick={() => setShowReply(true)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                >
                  <Mail className="mr-2 h-4 w-4" /> Reply to Message
                </Button>
              )}

              {showReply && !message.reply && (
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium text-lg">Reply to {message.name}</h3>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Hi ${message.name},\n\nThank you for your message...`}
                    rows={6}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowReply(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSendReply}
                      disabled={!replyText.trim() || isReplying}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                    >
                      {isReplying ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Send Reply
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div className="mt-1">{getStatusBadge(message.status)}</div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="mt-1">{message.name}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1">
                    <a href={`mailto:${message.email}`} className="text-blue-600 hover:underline">
                      {message.email}
                    </a>
                  </p>
                </div>

                {message.phone && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1">
                      <a href={`tel:${message.phone}`} className="text-blue-600 hover:underline">
                        {message.phone}
                      </a>
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date Received</h3>
                  <p className="mt-1">{message.date}</p>
                </div>

                <div className="pt-4 border-t">
                  <Button asChild variant="outline" className="w-full">
                    <a
                      href={`https://wa.me/${message.phone?.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contact via WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

