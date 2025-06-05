"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Users, Shield, Star, MapPin, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeroSearch } from "@/components/common/hero-search"
import { HotelCard } from "@/components/common/hotel-card"

// Mock data
const featuredHotels = [
  {
    id: "1",
    name: "Radisson Blu Mammy Yoko Hotel",
    description:
      "Luxury beachfront hotel with stunning ocean views and world-class amenities in the heart of Aberdeen.",
    location: {
      city: "Freetown",
      country: "Sierra Leone",
      address: "Aberdeen Beach Road",
    },
    images: ["/placeholder.svg?height=400&width=600"],
    rating: 4.8,
    price: 180,
    amenities: ["Free WiFi", "Parking", "Restaurant", "Pool"],
    roomTypes: [
      {
        id: "r1",
        name: "Deluxe Room",
        capacity: 2,
        price: 180,
      },
      {
        id: "r2",
        name: "Executive Suite",
        capacity: 4,
        price: 350,
      },
    ],
    reviews: [
      {
        id: "rev1",
        rating: 5,
        comment: "Excellent service and beautiful views!",
        author: "James Wilson",
      },
      {
        id: "rev2",
        rating: 4,
        comment: "Great location but breakfast could be better.",
        author: "Aminata Kamara",
      },
    ],
    verified: true,
    featured: true,
  },
  {
    id: "2",
    name: "Country Lodge Hotel",
    description: "Serene hilltop retreat offering panoramic views of Freetown and comfortable accommodations.",
    location: {
      city: "Freetown",
      country: "Sierra Leone",
      address: "Hill Station Road",
    },
    images: ["/placeholder.svg?height=400&width=600"],
    rating: 4.6,
    price: 120,
    amenities: ["Free WiFi", "Restaurant", "Business Center", "Gym"],
    roomTypes: [
      {
        id: "r1",
        name: "Standard Room",
        capacity: 2,
        price: 120,
      },
      {
        id: "r2",
        name: "Superior Room",
        capacity: 3,
        price: 180,
      },
    ],
    reviews: [
      {
        id: "rev1",
        rating: 5,
        comment: "Peaceful location with friendly staff!",
        author: "Sarah Johnson",
      },
    ],
    verified: true,
    featured: true,
  },
  {
    id: "3",
    name: "Bo Heritage Hotel",
    description: "Modern hotel in the heart of Bo City with traditional Sierra Leonean hospitality and comfort.",
    location: {
      city: "Bo",
      country: "Sierra Leone",
      address: "Bo City Center",
    },
    images: ["/placeholder.svg?height=400&width=600"],
    rating: 4.5,
    price: 85,
    amenities: ["Free WiFi", "Parking", "Restaurant", "Conference Room"],
    roomTypes: [
      {
        id: "r1",
        name: "Standard Room",
        capacity: 2,
        price: 85,
      },
      {
        id: "r2",
        name: "Family Room",
        capacity: 4,
        price: 150,
      },
    ],
    reviews: [
      {
        id: "rev1",
        rating: 4,
        comment: "Clean rooms and good local food!",
        author: "Mohamed Sesay",
      },
    ],
    verified: true,
  },
]

const destinations = [
  { name: "Freetown", hotels: 45, image: "/placeholder.svg?height=300&width=400" },
  { name: "Bo", hotels: 12, image: "/placeholder.svg?height=300&width=400" },
  { name: "Kenema", hotels: 8, image: "/placeholder.svg?height=300&width=400" },
  { name: "Makeni", hotels: 6, image: "/placeholder.svg?height=300&width=400" },
]

const features = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your bookings are protected with bank-level security and instant confirmation including Orange Money",
  },
  {
    icon: Users,
    title: "24/7 Local Support",
    description: "Round-the-clock customer support in English and Krio for all your needs",
  },
  {
    icon: TrendingUp,
    title: "Best Local Rates",
    description: "We guarantee the best rates for Sierra Leone accommodations with our price match promise",
  },
]

const stats = [
  { icon: Users, number: "5,000+", label: "Happy Travelers" },
  { icon: MapPin, number: "50+", label: "Cities Covered" },
  { icon: Star, number: "4.8", label: "Average Rating" },
  { icon: Award, number: "3+", label: "Years Serving SL" },
]

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Aminata Kamara",
      location: "Freetown",
      text: "StayEase made my business trip to Bo so easy. Found the perfect hotel with great amenities!",
      rating: 5,
    },
    {
      name: "James Wilson",
      location: "UK Visitor",
      text: "Excellent service for my first visit to Sierra Leone. The local support was invaluable.",
      rating: 5,
    },
    {
      name: "Fatima Sesay",
      location: "Kenema",
      text: "Best hotel booking platform in Sierra Leone. Always reliable and great prices!",
      rating: 5,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden bg-gradient-to-br from-deep-blue via-deep-blue/95 to-blue-600/80">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 flex h-full flex-col items-center justify-center px-4 py-16 text-center text-white">
          <motion.div
            className="max-w-4xl mx-auto space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Discover
                <span className="block bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
                  Sierra Leone
                </span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Find the perfect accommodation across Sierra Leone. From luxury hotels in Freetown to cozy guesthouses
                in Bo, discover places that feel like home in Salone.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <HeroSearch />
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3 text-white/90">
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold">{stat.number}</div>
                    <div className="text-xs sm:text-sm opacity-80">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Hotels in Sierra Leone
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of the finest accommodations across Salone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10 sm:mb-12">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="group">
              <Link href="/hotels">
                View All Hotels
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-12 sm:py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the most sought-after cities and regions in Sierra Leone
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <Card
                key={destination.name}
                className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                    <p className="text-sm opacity-90">{destination.hotels} hotels</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose StayEase?</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to making your Sierra Leone travel experience exceptional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
              >
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from real travelers across Sierra Leone
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg p-6 lg:p-12 text-center">
              <CardContent className="p-0">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[currentTestimonial].location}</div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Ready to Explore Sierra Leone?</h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your journey today and discover the beauty of Salone with our trusted hotel partners
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              <Link href="/hotels">Browse Hotels</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
