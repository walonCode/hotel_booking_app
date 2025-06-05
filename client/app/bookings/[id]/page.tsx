"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Calendar, Users, MapPin, CreditCard, Download, ArrowLeft, Star, CheckCircle } from "lucide-react"
import { api, type Booking } from "@/lib/api"

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("success") === "true") {
      setShowSuccess(true)
      // Remove the success parameter from URL
      window.history.replaceState({}, "", window.location.pathname)
    }
  }, [])

  useEffect(() => {
    if (params?.id) {
      loadBookingDetails(params.id as string)
    }
  }, [params?.id])

  const loadBookingDetails = async (id: string) => {
    try {
      const bookingData = await api.getBookingById(id)
      if (bookingData) {
        setBooking(bookingData)
      } else {
        router.push("/bookings")
      }
    } catch (error) {
      console.error("Failed to load booking details:", error)
      router.push("/bookings")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-green"
      case "pending":
        return "bg-warm-gold"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-slate-gray"
    }
  }

  const calculateNights = () => {
    if (!booking) return 0
    const checkIn = new Date(booking.checkIn)
    const checkOut = new Date(booking.checkOut)
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }
  showSuccess && (
    <div className="mb-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-6 w-6 text-emerald-600" />
          <div>
            <h3 className="text-lg font-semibold text-emerald-800">Booking Confirmed!</h3>
            <p className="text-emerald-700">
              Your payment has been processed successfully and your booking is confirmed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-soft-black mb-4">Booking not found</h1>
          <Button onClick={() => router.push("/bookings")}>Back to Bookings</Button>
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
          Back to Bookings
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{booking.hotelName}</CardTitle>
                    <p className="text-slate-gray">Booking ID: {booking.id}</p>
                  </div>
                  <Badge className={`text-white ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-royal-blue" />
                    <div>
                      <p className="font-medium text-soft-black">Check-in</p>
                      <p className="text-slate-gray">{booking.checkIn}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-royal-blue" />
                    <div>
                      <p className="font-medium text-soft-black">Check-out</p>
                      <p className="text-slate-gray">{booking.checkOut}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-royal-blue" />
                    <div>
                      <p className="font-medium text-soft-black">Guests</p>
                      <p className="text-slate-gray">{booking.guests} guests</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Room Details */}
            <Card>
              <CardHeader>
                <CardTitle>Room Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-soft-black mb-2">{booking.roomType}</h3>
                    <p className="text-slate-gray">
                      {calculateNights()} {calculateNights() === 1 ? "night" : "nights"} • {booking.guests} guests
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-soft-black mb-2">Guest Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-gray">Primary Guest</p>
                        <p className="font-medium">{booking.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-gray">Email</p>
                        <p className="font-medium">{booking.customerEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Special Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-gray">No special requests for this booking.</p>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-royal-blue hover:bg-royal-blue/90">
                <Download className="h-4 w-4 mr-2" />
                Download Confirmation
              </Button>
              <Button variant="outline">Contact Hotel</Button>
              {booking.status === "confirmed" && <Button variant="outline">Modify Booking</Button>}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Price Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-gray">Room rate ({calculateNights()} nights)</span>
                  <span>${booking.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-gray">Taxes & fees</span>
                  <span>Included</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-royal-blue">${booking.totalPrice}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hotel Info */}
            <Card>
              <CardHeader>
                <CardTitle>Hotel Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-royal-blue mt-1" />
                  <div>
                    <p className="font-medium text-soft-black">{booking.hotelName}</p>
                    <p className="text-slate-gray text-sm">Freetown, Sierra Leone</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 fill-warm-gold text-warm-gold" />
                  <span className="font-medium">4.8</span>
                  <span className="text-slate-gray text-sm">(124 reviews)</span>
                </div>

                <Button variant="outline" className="w-full">
                  View Hotel Details
                </Button>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-royal-blue" />
                  <div>
                    <p className="font-medium text-soft-black">Payment Confirmed</p>
                    <p className="text-slate-gray text-sm">Paid with •••• 1234</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-gray text-sm">Have questions about your booking? We're here to help.</p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    View Help Center
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
