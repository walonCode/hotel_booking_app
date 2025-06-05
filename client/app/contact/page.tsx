"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us an email anytime",
    value: "support@stayease.com",
    action: "mailto:support@stayease.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri from 8am to 6pm",
    value: "+1 (555) 123-4567",
    action: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come say hello at our office",
    value: "123 Business Ave, Suite 100\nNew York, NY 10001",
    action: null,
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "Our support team is available",
    value: "Monday - Friday: 8am - 6pm\nSaturday: 9am - 4pm\nSunday: Closed",
    action: null,
  },
]

const faqItems = [
  {
    question: "How do I cancel my booking?",
    answer:
      "You can cancel your booking through your dashboard or by contacting our support team. Cancellation policies vary by property.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, we use industry-standard encryption and security measures to protect your payment information.",
  },
  {
    question: "Can I modify my booking dates?",
    answer:
      "Booking modifications depend on the property's policy and availability. Contact us for assistance with changes.",
  },
  {
    question: "What if I have issues during my stay?",
    answer:
      "Our 24/7 support team is available to help resolve any issues during your stay. Contact us immediately for assistance.",
  },
]

export default function ContactPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      })
      setLoading(false)
    }, 1500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-deep-blue py-16 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Get in Touch</h1>
            <p className="text-lg text-white/90">
              Have questions or need help? We're here to assist you with anything you need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <info.icon className="mx-auto mb-4 h-12 w-12 text-sky-blue" />
                    <h3 className="mb-2 text-lg font-semibold">{info.title}</h3>
                    <p className="mb-3 text-sm text-gray-600">{info.description}</p>
                    {info.action ? (
                      <a href={info.action} className="text-sm font-medium text-sky-blue hover:underline">
                        {info.value}
                      </a>
                    ) : (
                      <p className="whitespace-pre-line text-sm font-medium text-gray-900">{info.value}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="bg-light-gray py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booking">Booking Support</SelectItem>
                          <SelectItem value="payment">Payment Issues</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Brief description of your inquiry"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please provide details about your inquiry..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Quick answers to common questions. Can't find what you're looking for? Contact us!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="mb-2 font-semibold text-deep-blue">{item.question}</h4>
                      <p className="text-sm text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6 text-center">
                  <h3 className="mb-2 text-lg font-semibold">Need Immediate Help?</h3>
                  <p className="mb-4 text-sm text-gray-600">For urgent matters, our support team is available 24/7</p>
                  <Button className="bg-sky-blue hover:bg-sky-blue/90">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Support Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
