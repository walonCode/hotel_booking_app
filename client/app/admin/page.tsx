"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Hotel, CreditCard, TrendingUp, Calendar, Star } from "lucide-react"
import { api, type Hotel as HotelType, type Booking } from "@/lib/api"

export default function AdminDashboard() {
  const [hotels, setHotels] = useState<HotelType[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [hotelsData, bookingsData] = await Promise.all([api.getHotels(), api.getBookings()])
      setHotels(hotelsData)
      setBookings(bookingsData)
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate metrics
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0)
  const totalBookings = bookings.length
  const averageRating = hotels.reduce((sum, hotel) => sum + hotel.rating, 0) / hotels.length
  const occupancyRate = 75 // Mock data

  // Chart data
  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 25000 },
    { month: "Jun", revenue: 28000 },
  ]

  const cityData = [
    { name: "Freetown", bookings: 45, color: "#1E3A8A" },
    { name: "Bo", bookings: 25, color: "#FBBF24" },
    { name: "Kenema", bookings: 20, color: "#10B981" },
    { name: "Makeni", bookings: 10, color: "#38BDF8" },
  ]

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
          <h1 className="text-3xl md:text-4xl font-bold text-soft-black mb-4">Admin Dashboard</h1>
          <p className="text-slate-gray text-lg">Monitor your hotel booking platform performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-gray text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-soft-black">${totalRevenue.toLocaleString()}</p>
                  <p className="text-emerald-green text-sm flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <div className="h-12 w-12 bg-emerald-green/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-emerald-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-gray text-sm">Total Bookings</p>
                  <p className="text-2xl font-bold text-soft-black">{totalBookings}</p>
                  <p className="text-emerald-green text-sm flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +8% from last month
                  </p>
                </div>
                <div className="h-12 w-12 bg-royal-blue/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-royal-blue" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-gray text-sm">Average Rating</p>
                  <p className="text-2xl font-bold text-soft-black">{averageRating.toFixed(1)}</p>
                  <p className="text-emerald-green text-sm flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Excellent rating
                  </p>
                </div>
                <div className="h-12 w-12 bg-warm-gold/10 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-warm-gold" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-gray text-sm">Occupancy Rate</p>
                  <p className="text-2xl font-bold text-soft-black">{occupancyRate}%</p>
                  <p className="text-emerald-green text-sm flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +5% from last month
                  </p>
                </div>
                <div className="h-12 w-12 bg-sky-blue/10 rounded-lg flex items-center justify-center">
                  <Hotel className="h-6 w-6 text-sky-blue" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#1E3A8A" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bookings by City */}
          <Card>
            <CardHeader>
              <CardTitle>Bookings by City</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={cityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="bookings"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {cityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-soft-black">{booking.hotelName}</p>
                    <p className="text-sm text-slate-gray">
                      {booking.customerName} • {booking.checkIn} - {booking.checkOut}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-soft-black">${booking.totalPrice}</p>
                    <Badge
                      className={`text-white ${
                        booking.status === "confirmed"
                          ? "bg-emerald-green"
                          : booking.status === "pending"
                            ? "bg-warm-gold"
                            : "bg-red-500"
                      }`}
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
