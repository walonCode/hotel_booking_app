"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Calendar, Users, CreditCard } from "lucide-react"
import { api, type Booking } from "@/lib/api"

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      const data = await api.getBookings()
      setBookings(data)
    } catch (error) {
      console.error("Failed to load bookings:", error)
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-off-white">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-soft-black mb-4">My Bookings</h1>
          <p className="text-slate-gray text-lg">Manage your hotel reservations and view booking history</p>
        </div>

        {bookings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-soft-black mb-2">No bookings yet</h3>
              <p className="text-slate-gray mb-6">Start exploring our amazing hotels and make your first booking</p>
              <Link href="/hotels">
                <Button className="bg-royal-blue hover:bg-royal-blue/90">Browse Hotels</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-semibold text-soft-black">{booking.hotelName}</h3>
                        <Badge className={`text-white ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-slate-gray" />
                          <span className="text-slate-gray">
                            {booking.checkIn} - {booking.checkOut}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-slate-gray" />
                          <span className="text-slate-gray">{booking.guests} guests</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-4 w-4 text-slate-gray" />
                          <span className="text-slate-gray">${booking.totalPrice} total</span>
                        </div>
                      </div>

                      <p className="text-slate-gray">Room: {booking.roomType}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <Link href={`/bookings/${booking.id}`}>
                        <Button variant="outline" className="w-full sm:w-auto">
                          View Details
                        </Button>
                      </Link>
                      <Link href={`/hotels/${booking.hotelId}`}>
                        <Button className="w-full sm:w-auto bg-royal-blue hover:bg-royal-blue/90">View Hotel</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
