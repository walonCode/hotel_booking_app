"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
}

export default function ChatbotModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your StayEase assistant. How can I help you with your hotel booking today?",
      role: "assistant",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const botResponses = [
        "I can help you find the perfect hotel for your needs. Could you tell me your destination and dates?",
        "We have several great options in that area. Are you looking for any specific amenities like a pool or gym?",
        "Based on your preferences, I'd recommend checking out Hotel Oceanview or The Grand Resort. Both have excellent ratings!",
        "You can use the search filters on our hotel listing page to narrow down options by price, rating, and amenities.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        role: "assistant",
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative flex h-[600px] w-full max-w-md flex-col rounded-lg bg-white shadow-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">StayEase Assistant</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "mb-4 max-w-[80%] rounded-lg p-3",
                message.role === "user" ? "ml-auto bg-sky-blue text-white" : "mr-auto bg-gray-100 text-gray-800",
              )}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="mr-auto mb-4 max-w-[80%] rounded-lg bg-gray-100 p-3 text-gray-800">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
