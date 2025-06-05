"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Star, MapPin, Wifi, Car, Utensils, Dumbbell, Waves, ArrowLeft, Heart, Share2 } from "lucide-react"
import { api, type Hotel, type Review } from "@/lib/api"
import { BookingSteps } from "@/components/bookings/booking-steps"
import { X } from "lucide-react"

export default function HotelDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(2)
  const [isBooking, setIsBooking] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)

  useEffect(() => {
    if (params?.id) {
      loadHotelDetails(params.id as string)
    }
  }, [params?.id])

  const loadHotelDetails = async (id: string) => {
    try {
      setIsLoading(true)
      const [hotelData, reviewsData] = await Promise.all([api.getHotelById(id), api.getReviews(id)])

      if (hotelData) {
        setHotel(hotelData)
        setReviews(reviewsData)
      } else {
        router.push("/hotels")
      }
    } catch (error) {
      console.error("Failed to load hotel details:", error)
      router.push("/hotels")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBooking = async () => {
    if (!hotel || !checkIn || !checkOut) return

    try {
      setIsBooking(true)
      const booking = await api.createBooking({
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomType: hotel.roomTypes[0].name,
        checkIn,
        checkOut,
        guests,
        totalPrice: calculateTotalPrice(),
        customerName: "John Doe", // In real app, get from auth
        customerEmail: "john@example.com",
      })

      router.push(`/bookings/${booking.id}`)
    } catch (error) {
      console.error("Booking failed:", error)
    } finally {
      setIsBooking(false)
    }
  }

  const calculateTotalPrice = () => {
    if (!hotel || !checkIn || !checkOut) return 0
    const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    return nights * hotel.pricePerNight
  }

  const amenityIcons = {
    WiFi: Wifi,
    Restaurant: Utensils,
    Parking: Car,
    Gym: Dumbbell,
    Pool: Waves,
    "Beach Access": Waves,
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-soft-black mb-4">Hotel not found</h1>
          <Button onClick={() => router.push("/hotels")}>Back to Hotels</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-off-white">
      <div className="container py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Hotels
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative h-96">
                <Image
                  src={hotel.images[selectedImage] || "/placeholder.svg"}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button size="icon" variant="secondary" className="bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="bg-white/80 hover:bg-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {hotel.images.length > 1 && (
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {hotel.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 ${
                          selectedImage === index ? "ring-2 ring-royal-blue" : ""
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
                </div>
              )}
            </Card>

            {/* Hotel Info */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-soft-black mb-2">{hotel.name}</h1>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4 text-slate-gray" />
                        <span className="text-slate-gray">{hotel.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-warm-gold text-warm-gold" />
                        <span className="font-medium">{hotel.rating}</span>
                        <span className="text-slate-gray">({hotel.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-gray leading-relaxed">{hotel.description}</p>

                  <div>
                    <h3 className="text-lg font-semibold text-soft-black mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {hotel.amenities.map((amenity) => {
                        const Icon = amenityIcons[amenity as keyof typeof amenityIcons]
                        return (
                          <div key={amenity} className="flex items-center space-x-2">
                            {Icon ? (
                              <Icon className="h-4 w-4 text-royal-blue" />
                            ) : (
                              <div className="h-4 w-4 bg-royal-blue rounded-full" />
                            )}
                            <span className="text-sm text-slate-gray">{amenity}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Room Types */}
            <Card>
              <CardHeader>
                <CardTitle>Available Rooms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hotel.roomTypes.map((room) => (
                  <div key={room.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-soft-black">{room.name}</h4>
                        <p className="text-slate-gray text-sm">{room.description}</p>
                        <p className="text-slate-gray text-sm">Sleeps {room.capacity} guests</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-royal-blue">${room.price}</div>
                        <div className="text-slate-gray text-sm">per night</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Guest Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-slate-gray">No reviews yet. Be the first to review!</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 bg-royal-blue rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {review.customerName.charAt(0)}
                          </div>
                          <span className="font-medium text-soft-black">{review.customerName}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-warm-gold text-warm-gold" />
                          <span className="text-sm">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-slate-gray text-sm">{review.comment}</p>
                      <p className="text-slate-gray text-xs mt-2">{review.date}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Book Your Stay</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-royal-blue">${hotel.pricePerNight}</div>
                    <div className="text-slate-gray text-sm">per night</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkin">Check-in</Label>
                    <Input
                      id="checkin"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkout">Check-out</Label>
                    <Input
                      id="checkout"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests">Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={(e) => setGuests(Number.parseInt(e.target.value))}
                  />
                </div>

                {checkIn && checkOut && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-gray">
                        ${hotel.pricePerNight} ×{" "}
                        {Math.ceil(
                          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24),
                        )}{" "}
                        nights
                      </span>
                      <span>${calculateTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between items-center font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-royal-blue">${calculateTotalPrice()}</span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => setShowBookingModal(true)}
                  disabled={!checkIn || !checkOut}
                  className="w-full bg-royal-blue hover:bg-royal-blue/90"
                  size="lg"
                >
                  Book Now
                </Button>

                <p className="text-xs text-slate-gray text-center">
                  You won't be charged yet. Review your booking details on the next page.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-soft-black">Complete Your Booking</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowBookingModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <BookingSteps
                hotel={hotel}
                selectedRoom={hotel.roomTypes[0]}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
                onComplete={() => setShowBookingModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
