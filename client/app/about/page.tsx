import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Award, Heart, Target, Eye, Zap } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { label: "Hotels & Guesthouses", value: "50+", icon: MapPin },
    { label: "Happy Guests", value: "10,000+", icon: Users },
    { label: "Years of Experience", value: "5+", icon: Award },
    { label: "Cities Covered", value: "15+", icon: Heart },
  ]

  const team = [
    {
      name: "Aminata Kamara",
      role: "CEO & Founder",
      bio: "Tourism industry veteran with 15+ years of experience in Sierra Leone hospitality.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Mohamed Sesay",
      role: "CTO",
      bio: "Tech entrepreneur passionate about using AI to transform the travel industry.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Fatima Bangura",
      role: "Head of Operations",
      bio: "Hospitality expert ensuring the highest standards across our partner hotels.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Ibrahim Koroma",
      role: "Head of Marketing",
      bio: "Digital marketing specialist promoting Sierra Leone's tourism potential globally.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Authentic Hospitality",
      description: "We celebrate Sierra Leone's warm hospitality and cultural richness in every interaction.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Using cutting-edge AI technology to make hotel booking simple and personalized.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Supporting local businesses and communities while promoting sustainable tourism.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to providing exceptional service and unforgettable experiences.",
    },
  ]

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-royal-blue/90 to-sky-blue/80 z-10" />
        <Image
          src="/placeholder.svg?height=400&width=1200"
          alt="Sierra Leone landscape"
          fill
          className="object-cover"
        />
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-warm-gold">SierraStay</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Connecting travelers with Sierra Leone's finest accommodations through innovative technology
          </p>
        </div>
      </section>

      <div className="container py-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="h-8 w-8 text-royal-blue" />
              <h2 className="text-2xl font-bold text-soft-black">Our Mission</h2>
            </div>
            <p className="text-slate-gray leading-relaxed">
              To revolutionize the hospitality industry in Sierra Leone by providing a seamless, AI-powered booking
              platform that connects travelers with authentic accommodations while supporting local businesses and
              promoting sustainable tourism throughout the country.
            </p>
          </Card>

          <Card className="p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="h-8 w-8 text-royal-blue" />
              <h2 className="text-2xl font-bold text-soft-black">Our Vision</h2>
            </div>
            <p className="text-slate-gray leading-relaxed">
              To become the leading digital gateway for Sierra Leone tourism, showcasing the country's natural beauty,
              rich culture, and warm hospitality to the world while empowering local communities through technology and
              sustainable tourism practices.
            </p>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="space-y-3">
                <div className="h-12 w-12 bg-gradient-to-br from-royal-blue to-sky-blue rounded-full flex items-center justify-center mx-auto">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-soft-black">{stat.value}</div>
                <div className="text-slate-gray text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-soft-black mb-8 text-center">Our Story</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-slate-gray leading-relaxed">
                SierraStay was born from a simple observation: Sierra Leone has some of the most beautiful landscapes,
                warmest people, and richest culture in West Africa, yet travelers often struggled to find and book
                quality accommodations easily.
              </p>
              <p className="text-slate-gray leading-relaxed">
                Founded in 2019 by a team of local entrepreneurs and tech enthusiasts, we set out to bridge this gap by
                creating a platform that not only makes booking simple but also showcases the authentic Sierra Leonean
                hospitality experience.
              </p>
              <p className="text-slate-gray leading-relaxed">
                Today, we're proud to partner with over 50 hotels and guesthouses across 15+ cities, helping thousands
                of travelers discover the beauty of Sierra Leone while supporting local businesses and communities.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Sierra Leone tourism"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-soft-black mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-royal-blue to-sky-blue rounded-lg flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-soft-black">{value.title}</h3>
                  </div>
                  <p className="text-slate-gray leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-soft-black mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden">
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-soft-black mb-1">{member.name}</h3>
                  <Badge className="bg-royal-blue text-white mb-3">{member.role}</Badge>
                  <p className="text-slate-gray text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-royal-blue to-sky-blue text-white text-center p-12">
          <CardContent>
            <h2 className="text-3xl font-bold mb-4">Ready to Explore Sierra Leone?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered amazing accommodations through our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/hotels"
                className="bg-warm-gold hover:bg-warm-gold/90 text-soft-black px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Browse Hotels
              </a>
              <a
                href="/contact"
                className="border border-white text-white hover:bg-white hover:text-royal-blue px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Contact Us
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
