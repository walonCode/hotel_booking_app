import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Camera, Mountain, Waves, TreePine, Building } from "lucide-react"

export default function DestinationsPage() {
  const destinations = [
    {
      id: "freetown",
      name: "Freetown",
      description: "The vibrant capital city with beautiful beaches, rich history, and bustling markets.",
      image: "/placeholder.svg?height=400&width=600",
      hotels: 15,
      highlights: ["Lumley Beach", "Cotton Tree", "National Museum", "Aberdeen Beach"],
      category: "City",
      icon: Building,
    },
    {
      id: "bo",
      name: "Bo",
      description: "Sierra Leone's second-largest city, known for its cultural heritage and diamond mining history.",
      image: "/placeholder.svg?height=400&width=600",
      hotels: 8,
      highlights: ["Bo School", "Kakua Chiefdom", "Local Markets", "Cultural Centers"],
      category: "Cultural",
      icon: Camera,
    },
    {
      id: "ken",
      category: "Cultural",
      icon: Camera,
    },
    {
      id: "kenema",
      name: "Kenema",
      description: "Gateway to the Eastern Province, surrounded by lush forests and known for diamond mining.",
      image: "/placeholder.svg?height=400&width=600",
      hotels: 6,
      highlights: ["Gola Rainforest", "Diamond Mines", "Kenema Museum", "Traditional Villages"],
      category: "Nature",
      icon: TreePine,
    },
    {
      id: "makeni",
      name: "Makeni",
      description: "Northern Sierra Leone's commercial hub with beautiful landscapes and friendly communities.",
      image: "/placeholder.svg?height=400&width=600",
      hotels: 5,
      highlights: ["Wusum Hotel", "Central Mosque", "Local Markets", "Bombali District"],
      category: "City",
      icon: Building,
    },
    {
      id: "peninsula",
      name: "Freetown Peninsula",
      description: "Stunning beaches, mountain views, and charming fishing villages along the coast.",
      image: "/placeholder.svg?height=400&width=600",
      hotels: 12,
      highlights: ["Tokeh Beach", "River No. 2 Beach", "Banana Islands", "Leicester Peak"],
      category: "Beach",
      icon: Waves,
    },
    {
      id: "kailahun",
      name: "Kailahun",
      description: "Eastern border town rich in culture and surrounded by beautiful natural landscapes.",
      image: "/placeholder.svg?height=400&width=600",
      hotels: 4,
      highlights: ["Moa River", "Traditional Crafts", "Border Markets", "Forest Reserves"],
      category: "Cultural",
      icon: Camera,
    },
    {
      id: "port-loko",
      name: "Port Loko",
      description: "Historic town with colonial architecture and access to mangrove forests.",
      image: "/placeholder.svg?height=400&width=600",
      hotels: 3,
      highlights: ["Mangrove Swamps", "Colonial Buildings", "River Port", "Traditional Fishing"],
      category: "Nature",
      icon: TreePine,
    },
    {
      id: "koidu",
      name: "Koidu",
      description: "Diamond mining capital with rich geological heritage and vibrant local culture.",
      image: "/placeholder.svg?height=400&width=600",
      hotels: 4,
      highlights: ["Diamond Mines", "Kono Museum", "Local Markets", "Traditional Ceremonies"],
      category: "Cultural",
      icon: Mountain,
    },
  ]

  const categories = [
    { name: "All", count: destinations.length },
    { name: "City", count: destinations.filter((d) => d.category === "City").length },
    { name: "Beach", count: destinations.filter((d) => d.category === "Beach").length },
    { name: "Nature", count: destinations.filter((d) => d.category === "Nature").length },
    { name: "Cultural", count: destinations.filter((d) => d.category === "Cultural").length },
  ]

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-royal-blue/90 to-sky-blue/80 z-10" />
        <Image
          src="/placeholder.svg?height=400&width=1200"
          alt="Sierra Leone destinations"
          fill
          className="object-cover"
        />
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover <span className="text-warm-gold">Sierra Leone</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90">Explore breathtaking destinations across the country</p>
        </div>
      </section>

      <div className="container py-16">
        {/* Categories Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-soft-black mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant="outline"
                className="px-4 py-2 text-sm cursor-pointer hover:bg-royal-blue hover:text-white transition-colors"
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative h-64">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name || ""}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-soft-black">
                    <destination.icon className="h-3 w-3 mr-1" />
                    {destination.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-royal-blue text-white">{destination.hotels} Hotels</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-soft-black mb-2 flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-royal-blue" />
                      <span>{destination.name}</span>
                    </h3>
                    <p className="text-slate-gray text-sm leading-relaxed">{destination.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-soft-black mb-2">Top Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights?.slice(0, 3).map((highlight) => (
                        <Badge key={highlight} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {destination.highlights?.length || 0 > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{destination.highlights?.length || 0 - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Link href={`/hotels?city=${destination.name}`}>
                    <Button className="w-full bg-royal-blue hover:bg-royal-blue/90">
                      View Hotels in {destination.name}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-royal-blue to-sky-blue text-white text-center p-12">
            <CardContent>
              <h2 className="text-3xl font-bold mb-4">Plan Your Sierra Leone Adventure</h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                From pristine beaches to lush mountains, Sierra Leone offers unforgettable experiences for every
                traveler
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/hotels">
                  <Button size="lg" className="bg-warm-gold hover:bg-warm-gold/90 text-soft-black">
                    Browse All Hotels
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-royal-blue"
                  >
                    Plan Custom Trip
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
