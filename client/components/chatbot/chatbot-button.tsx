"use client"

import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChatbotModal from "./chatbot-modal"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-sky-blue hover:bg-sky-blue/90 shadow-lg"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Open chatbot</span>
        </Button>
      </motion.div>

      <AnimatePresence>{isOpen && <ChatbotModal onClose={() => setIsOpen(false)} />}</AnimatePresence>
    </>
  )
}
