"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, ChevronDown, HelpCircle, Book, CreditCard, Phone, MessageCircle } from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const faqCategories = [
    {
      title: "Booking & Reservations",
      icon: Book,
      faqs: [
        {
          id: "booking-1",
          question: "How do I make a hotel reservation?",
          answer:
            "You can make a reservation by searching for hotels on our homepage, selecting your preferred accommodation, choosing your dates, and completing the booking process with your payment information.",
        },
        {
          id: "booking-2",
          question: "Can I modify or cancel my booking?",
          answer:
            "Yes, you can modify or cancel your booking through your account dashboard. Cancellation policies vary by hotel, so please check the specific terms for your reservation.",
        },
        {
          id: "booking-3",
          question: "How far in advance can I book?",
          answer:
            "You can book up to 12 months in advance. We recommend booking early, especially during peak travel seasons and holidays.",
        },
        {
          id: "booking-4",
          question: "What happens if the hotel is overbooked?",
          answer:
            "In the rare case of overbooking, we'll work with the hotel to find you comparable accommodation at no extra cost, or provide a full refund.",
        },
      ],
    },
    {
      title: "Payments & Pricing",
      icon: CreditCard,
      faqs: [
        {
          id: "payment-1",
          question: "What payment methods do you accept?",
          answer:
            "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and local payment methods including mobile money for Sierra Leone customers.",
        },
        {
          id: "payment-2",
          question: "When will I be charged for my booking?",
          answer:
            "Payment is typically processed immediately upon booking confirmation. Some hotels may offer pay-at-property options, which will be clearly indicated during booking.",
        },
        {
          id: "payment-3",
          question: "Are there any hidden fees?",
          answer:
            "No, we believe in transparent pricing. All fees and taxes are clearly displayed before you complete your booking. The final price you see is what you'll pay.",
        },
        {
          id: "payment-4",
          question: "Can I get a refund if I cancel?",
          answer:
            "Refund eligibility depends on the hotel's cancellation policy and how far in advance you cancel. Free cancellation options are available for many properties.",
        },
      ],
    },
    {
      title: "Account & Profile",
      icon: HelpCircle,
      faqs: [
        {
          id: "account-1",
          question: "How do I create an account?",
          answer:
            "Click 'Sign Up' in the top right corner, fill in your details, and verify your email address. You can also sign up using Google or Facebook for faster registration.",
        },
        {
          id: "account-2",
          question: "I forgot my password. How do I reset it?",
          answer:
            "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a reset link. Follow the instructions in the email to create a new password.",
        },
        {
          id: "account-3",
          question: "How do I update my profile information?",
          answer:
            "Log into your account and go to 'My Profile' where you can update your personal information, contact details, and preferences.",
        },
        {
          id: "account-4",
          question: "Can I delete my account?",
          answer:
            "Yes, you can delete your account from the Security settings in your profile. Please note that this action is permanent and cannot be undone.",
        },
      ],
    },
    {
      title: "Travel & Hotels",
      icon: Phone,
      faqs: [
        {
          id: "travel-1",
          question: "What should I bring when checking in?",
          answer:
            "Bring a valid government-issued ID (passport for international travelers) and the credit card used for booking. Some hotels may require additional documentation.",
        },
        {
          id: "travel-2",
          question: "What are the typical check-in and check-out times?",
          answer:
            "Standard check-in is usually 3:00 PM and check-out is 11:00 AM. However, times may vary by hotel. You can find specific times in your booking confirmation.",
        },
        {
          id: "travel-3",
          question: "Can I request early check-in or late check-out?",
          answer:
            "Yes, you can request early check-in or late check-out directly with the hotel. Availability depends on occupancy and may incur additional charges.",
        },
        {
          id: "travel-4",
          question: "What if I have special requirements or accessibility needs?",
          answer:
            "Please contact us or the hotel directly to discuss special requirements. We'll work to ensure your needs are accommodated whenever possible.",
        },
      ],
    },
  ]

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.faqs.length > 0)

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-royal-blue to-sky-blue text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Find answers to common questions and get the help you need
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-gray" />
              <Input
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 text-lg bg-white text-soft-black"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container py-16">
        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="space-y-4">
              <div className="h-16 w-16 bg-gradient-to-br from-royal-blue to-sky-blue rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-soft-black">Live Chat</h3>
              <p className="text-slate-gray">Get instant help from our AI assistant</p>
              <Button className="bg-royal-blue hover:bg-royal-blue/90">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="space-y-4">
              <div className="h-16 w-16 bg-gradient-to-br from-emerald-green to-sky-blue rounded-full flex items-center justify-center mx-auto">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-soft-black">Call Us</h3>
              <p className="text-slate-gray">Speak with our support team</p>
              <Button variant="outline">+232 XX XXX XXXX</Button>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="space-y-4">
              <div className="h-16 w-16 bg-gradient-to-br from-warm-gold to-sky-blue rounded-full flex items-center justify-center mx-auto">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-soft-black">Contact Form</h3>
              <p className="text-slate-gray">Send us a detailed message</p>
              <Button variant="outline">Contact Us</Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-soft-black mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-gray text-lg">Find quick answers to the most common questions</p>
          </div>

          {filteredFAQs.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Search className="h-16 w-16 text-slate-gray mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-soft-black mb-2">No results found</h3>
                <p className="text-slate-gray">Try searching with different keywords or browse our categories below</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredFAQs.map((category) => (
                <Card key={category.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-royal-blue rounded-lg flex items-center justify-center">
                        <category.icon className="h-5 w-5 text-white" />
                      </div>
                      <span>{category.title}</span>
                      <Badge variant="secondary">{category.faqs.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {category.faqs.map((faq) => (
                      <Collapsible key={faq.id}>
                        <CollapsibleTrigger
                          onClick={() => toggleItem(faq.id)}
                          className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <span className="font-medium text-soft-black">{faq.question}</span>
                          <ChevronDown
                            className={`h-4 w-4 text-slate-gray transition-transform ${
                              openItems.includes(faq.id) ? "rotate-180" : ""
                            }`}
                          />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                          <p className="text-slate-gray leading-relaxed">{faq.answer}</p>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Still Need Help */}
        <Card className="mt-12 bg-gradient-to-r from-royal-blue to-sky-blue text-white text-center p-8">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-white/90 mb-6">
              Can't find what you're looking for? Our support team is here to help you 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-warm-gold hover:bg-warm-gold/90 text-soft-black">
                Contact Support
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-royal-blue"
              >
                Live Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
