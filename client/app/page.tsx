"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { HotelCard } from "@/components/hotels/hotel-card"
import { Chatbot } from "@/components/ai/chatbot"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Search, MapPin, Shield, Zap, Headphones } from "lucide-react"
import { api, type Hotel } from "@/lib/api"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [featuredHotels, setFeaturedHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadFeaturedHotels = async () => {
      try {
        const hotels = await api.getRecommendedHotels()
        setFeaturedHotels(hotels)
      } catch (error) {
        console.error("Failed to load featured hotels:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFeaturedHotels()
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/hotels?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-royal-blue/90 to-sky-blue/80 z-10" />
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Sierra Leone landscape"
          fill
          className="object-cover"
          priority
        />

        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Sierra Leone's
            <span className="block text-warm-gold">Hidden Gems</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            AI-powered hotel booking platform connecting you to the best accommodations across Sierra Leone
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-full p-2 shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="flex-1 flex items-center space-x-3 px-4">
                <MapPin className="h-5 w-5 text-slate-gray" />
                <Input
                  placeholder="Where do you want to stay in Sierra Leone?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-0 focus-visible:ring-0 text-soft-black placeholder:text-slate-gray"
                />
              </div>
              <Button onClick={handleSearch} className="bg-royal-blue hover:bg-royal-blue/90 rounded-full px-8">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-warm-gold">50+</div>
              <div className="text-sm text-white/80">Hotels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warm-gold">1000+</div>
              <div className="text-sm text-white/80">Happy Guests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warm-gold">4.8</div>
              <div className="text-sm text-white/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-off-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-soft-black mb-4">Why Choose SierraStay?</h2>
            <p className="text-slate-gray text-lg max-w-2xl mx-auto">
              Experience the future of hotel booking with our AI-powered platform designed specifically for Sierra Leone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="h-16 w-16 bg-gradient-to-br from-royal-blue to-sky-blue rounded-full flex items-center justify-center mx-auto">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-soft-black">AI-Powered Recommendations</h3>
                <p className="text-slate-gray">
                  Get personalized hotel suggestions based on your preferences and travel history
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="h-16 w-16 bg-gradient-to-br from-emerald-green to-sky-blue rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-soft-black">Secure Booking</h3>
                <p className="text-slate-gray">
                  Book with confidence using our secure payment system and fraud protection
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="h-16 w-16 bg-gradient-to-br from-warm-gold to-sky-blue rounded-full flex items-center justify-center mx-auto">
                  <Headphones className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-soft-black">24/7 AI Support</h3>
                <p className="text-slate-gray">
                  Get instant help from our AI chatbot or connect with local support agents
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-soft-black mb-2">Featured Hotels</h2>
              <p className="text-slate-gray">Discover our handpicked selection of the best accommodations</p>
            </div>
            <Link href="/hotels">
              <Button
                variant="outline"
                className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white"
              >
                View All Hotels
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 bg-off-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-soft-black mb-4">Popular Destinations</h2>
            <p className="text-slate-gray text-lg">Explore the most beautiful cities and regions in Sierra Leone</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Freetown", hotels: "15+ Hotels", image: "/placeholder.svg?height=300&width=400" },
              { name: "Bo", hotels: "8+ Hotels", image: "/placeholder.svg?height=300&width=400" },
              { name: "Kenema", hotels: "6+ Hotels", image: "/placeholder.svg?height=300&width=400" },
              { name: "Makeni", hotels: "5+ Hotels", image: "/placeholder.svg?height=300&width=400" },
            ].map((destination) => (
              <Card key={destination.name} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">{destination.name}</h3>
                    <p className="text-white/80 text-sm">{destination.hotels}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-royal-blue to-sky-blue text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Explore Sierra Leone?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered amazing accommodations through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hotels">
              <Button size="lg" className="bg-warm-gold hover:bg-warm-gold/90 text-soft-black">
                Browse Hotels
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-royal-blue"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  )
}
