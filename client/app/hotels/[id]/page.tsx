"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
  SpadeIcon as Spa,
  ArrowLeft,
  Calendar,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getHotelById, type Hotel } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

const amenityIcons: Record<string, any> = {
  "Free WiFi": Wifi,
  Parking: Car,
  Restaurant: Utensils,
  Gym: Dumbbell,
  Pool: Waves,
  Spa: Spa,
}

export default function HotelDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (params.id) {
      fetchHotel(params.id as string)
    }
  }, [params.id])

  const fetchHotel = async (id: string) => {
    try {
      setLoading(true)
      const data = await getHotelById(id)
      setHotel(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch hotel details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBookRoom = (roomId: string) => {
    router.push(`/booking?hotelId=${params.id}&roomId=${roomId}`)
  }

  if (loading) {
    return (
      <div className="container py-8">
        <Skeleton className="mb-4 h-8 w-32" />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Skeleton className="mb-4 h-64 w-full" />
            <Skeleton className="mb-2 h-8 w-3/4" />
            <Skeleton className="mb-4 h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!hotel) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 text-6xl">🏨</div>
          <h3 className="mb-2 text-xl font-semibold">Hotel not found</h3>
          <p className="mb-4 text-gray-600">The hotel you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/hotels")}>Back to Hotels</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="mb-6">
            <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg md:h-96">
              <Image
                src={hotel.images[selectedImageIndex] || "/placeholder.svg"}
                alt={hotel.name}
                fill
                className="object-cover"
              />
            </div>
            {hotel.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {hotel.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded ${
                      selectedImageIndex === index ? "ring-2 ring-sky-blue" : ""
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${hotel.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hotel Info */}
          <div className="mb-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h1 className="mb-2 text-3xl font-bold">{hotel.name}</h1>
                <div className="mb-2 flex items-center text-gray-600">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>
                    {hotel.location.address}, {hotel.location.city}, {hotel.location.country}
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="mr-1 h-5 w-5 fill-gold text-gold" />
                  <span className="text-lg font-semibold">{hotel.rating}</span>
                  <span className="ml-2 text-gray-600">({hotel.reviews.length} reviews)</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-deep-blue">${hotel.price}</div>
                <div className="text-gray-600">per night</div>
              </div>
            </div>
            <p className="text-gray-700">{hotel.description}</p>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold">Amenities</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {hotel.amenities.map((amenity) => {
                const IconComponent = amenityIcons[amenity]
                return (
                  <div key={amenity} className="flex items-center">
                    {IconComponent && <IconComponent className="mr-2 h-4 w-4 text-sky-blue" />}
                    <span className="text-sm">{amenity}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="rooms" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="rooms" className="mt-6">
              <div className="space-y-4">
                {hotel.roomTypes.map((room) => (
                  <Card key={room.id}>
                    <CardContent className="p-6">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="relative h-32 overflow-hidden rounded md:h-24">
                          <Image
                            src={room.images[0] || "/placeholder.svg"}
                            alt={room.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{room.name}</h3>
                              <p className="text-sm text-gray-600">{room.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-deep-blue">${room.price}</div>
                              <div className="text-sm text-gray-600">per night</div>
                            </div>
                          </div>
                          <div className="mb-3 flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Users className="mr-1 h-4 w-4" />
                              <span>Up to {room.capacity} guests</span>
                            </div>
                          </div>
                          <div className="mb-4 flex flex-wrap gap-1">
                            {room.amenities.map((amenity) => (
                              <Badge key={amenity} variant="secondary" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            onClick={() => handleBookRoom(room.id)}
                            disabled={!room.available}
                            className="w-full md:w-auto"
                          >
                            {room.available ? "Book Now" : "Not Available"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                {hotel.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-semibold">{review.userName}</h4>
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 fill-gold text-gold" />
                          <span>{review.rating}</span>
                        </div>
                      </div>
                      <p className="mb-2 text-gray-700">{review.comment}</p>
                      <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="location" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-gray-700">
                      {hotel.location.address}, {hotel.location.city}, {hotel.location.country}
                    </p>
                  </div>
                  <div className="h-64 w-full rounded bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Map would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Booking Card */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Book Your Stay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-center">
                <div className="text-2xl font-bold text-deep-blue">${hotel.price}</div>
                <div className="text-gray-600">per night</div>
              </div>
              <Button
                onClick={() => router.push(`/booking?hotelId=${hotel.id}`)}
                className="w-full bg-sky-blue hover:bg-sky-blue/90"
                size="lg"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Check Availability
              </Button>
              <p className="mt-2 text-center text-xs text-gray-500">Free cancellation up to 24 hours before check-in</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
