"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Contact form submitted:", formData)
      setSubmitted(true)
    } catch (error) {
      console.error("Failed to submit form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <div className="h-16 w-16 bg-emerald-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-soft-black mb-2">Message Sent!</h2>
            <p className="text-slate-gray mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
            <Button onClick={() => setSubmitted(false)} className="bg-royal-blue hover:bg-royal-blue/90">
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-royal-blue to-sky-blue text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions about your booking or need assistance? We're here to help!
          </p>
        </div>
      </section>

      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-soft-black mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 bg-royal-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-soft-black mb-1">Address</h3>
                    <p className="text-slate-gray">
                      123 Siaka Stevens Street
                      <br />
                      Freetown, Sierra Leone
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 bg-emerald-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-soft-black mb-1">Phone</h3>
                    <p className="text-slate-gray">+232 XX XXX XXXX</p>
                    <p className="text-slate-gray">+232 YY YYY YYYY</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 bg-warm-gold rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-soft-black mb-1">Email</h3>
                    <p className="text-slate-gray">info@sierrastay.sl</p>
                    <p className="text-slate-gray">support@sierrastay.sl</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 bg-sky-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-soft-black mb-1">Business Hours</h3>
                    <p className="text-slate-gray">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-slate-gray">Saturday: 9:00 AM - 4:00 PM</p>
                    <p className="text-slate-gray">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Need Quick Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-gray text-sm">
                  For immediate assistance, try our AI chatbot or check our FAQ section.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat with AI Assistant
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    View FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full bg-royal-blue hover:bg-royal-blue/90">
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-soft-black mb-6 text-center">Find Us</h2>
          <Card className="overflow-hidden">
            <div className="h-96 bg-slate-gray flex items-center justify-center">
              <div className="text-center text-white">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg">Interactive Map</p>
                <p className="text-sm opacity-75">Map integration would be implemented here</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
