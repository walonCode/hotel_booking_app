"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Users, Globe, Award, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { icon: Users, label: "Happy Customers", value: "50,000+" },
  { icon: Globe, label: "Cities Worldwide", value: "200+" },
  { icon: Award, label: "Awards Won", value: "25+" },
  { icon: Heart, label: "Years of Service", value: "10+" },
]

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Passionate about travel and hospitality with 15+ years of industry experience.",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Tech enthusiast focused on creating seamless user experiences.",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Ensures smooth operations and exceptional customer service.",
  },
  {
    name: "David Kim",
    role: "Head of Marketing",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Creative strategist helping travelers discover amazing places.",
  },
]

const values = [
  {
    title: "Trust & Safety",
    description: "We prioritize the safety and security of our users above all else.",
    icon: "🛡️",
  },
  {
    title: "Innovation",
    description: "Constantly improving our platform with cutting-edge technology.",
    icon: "💡",
  },
  {
    title: "Customer First",
    description: "Every decision we make is centered around our customers' needs.",
    icon: "❤️",
  },
  {
    title: "Global Community",
    description: "Building connections between travelers and hosts worldwide.",
    icon: "🌍",
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-deep-blue py-20 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/90 to-deep-blue/70">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center mix-blend-overlay" />
        </div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">About StayEase</h1>
            <p className="text-lg text-white/90 md:text-xl">
              We're on a mission to make travel accommodation booking simple, safe, and enjoyable for everyone. Since
              2014, we've been connecting travelers with amazing places to stay around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <CardContent className="p-6">
                    <stat.icon className="mx-auto mb-4 h-12 w-12 text-sky-blue" />
                    <div className="mb-2 text-3xl font-bold text-deep-blue">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-light-gray py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="mb-6 text-3xl font-bold text-deep-blue">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  StayEase was born from a simple idea: travel accommodation booking should be easy, transparent, and
                  trustworthy. Our founders, experienced travelers themselves, were frustrated with the complexity and
                  hidden fees of existing platforms.
                </p>
                <p>
                  In 2014, we launched with a small team and a big vision. We wanted to create a platform that puts
                  travelers first, offering genuine reviews, transparent pricing, and exceptional customer service.
                </p>
                <p>
                  Today, we're proud to serve millions of travelers worldwide, helping them discover and book amazing
                  accommodations in over 200 cities. But our mission remains the same: making travel accessible and
                  enjoyable for everyone.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-96 overflow-hidden rounded-lg"
            >
              <Image src="/placeholder.svg?height=400&width=600" alt="Our story" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-deep-blue">Our Values</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              These core values guide everything we do and help us create the best possible experience for our users.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 text-4xl">{value.icon}</div>
                <h3 className="mb-2 text-xl font-semibold text-deep-blue">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-light-gray py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-deep-blue">Meet Our Team</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              The passionate people behind StayEase who work tirelessly to make your travel dreams come true.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                    <p className="mb-3 text-sky-blue">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-deep-blue py-16 text-white">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="mb-4 text-3xl font-bold">Join Our Journey</h2>
            <p className="mb-8 text-lg text-white/90">
              Be part of our mission to make travel accessible and enjoyable for everyone.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button className="rounded-lg bg-sky-blue px-8 py-3 font-semibold text-white transition-colors hover:bg-sky-blue/90">
                Start Your Journey
              </button>
              <button className="rounded-lg border border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-deep-blue">
                Partner With Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
