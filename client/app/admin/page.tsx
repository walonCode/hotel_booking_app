"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Hotel, Users, DollarSign, TrendingUp, Plus, Edit, Trash2, Eye, AlertTriangle, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getHotels, type Hotel as HotelType, type Booking } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

// Mock admin data
const adminStats = {
  totalHotels: 156,
  totalBookings: 2847,
  totalRevenue: 485920,
  monthlyGrowth: 12.5,
}

const recentBookings: Booking[] = [
  {
    id: "b1",
    hotelId: "1",
    hotelName: "Grand Oceanview Resort",
    roomId: "101",
    roomName: "Deluxe Ocean View",
    checkIn: "2024-01-15",
    checkOut: "2024-01-20",
    guests: 2,
    totalPrice: 1750,
    status: "confirmed",
    paymentStatus: "paid",
  },
  {
    id: "b2",
    hotelId: "2",
    hotelName: "City Center Hotel",
    roomId: "201",
    roomName: "Standard King",
    checkIn: "2024-01-18",
    checkOut: "2024-01-22",
    guests: 1,
    totalPrice: 1000,
    status: "pending",
    paymentStatus: "pending",
  },
]

const fraudAlerts = [
  {
    id: "f1",
    type: "Suspicious Payment",
    description: "Multiple failed payment attempts from same IP",
    severity: "high",
    timestamp: "2024-01-10T10:30:00Z",
  },
  {
    id: "f2",
    type: "Unusual Booking Pattern",
    description: "Same user booking multiple rooms in different cities",
    severity: "medium",
    timestamp: "2024-01-09T15:45:00Z",
  },
]

export default function AdminDashboard() {
  const { toast } = useToast()
  const [hotels, setHotels] = useState<HotelType[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedHotel, setSelectedHotel] = useState<HotelType | null>(null)
  const [isAddingHotel, setIsAddingHotel] = useState(false)
  const [newHotel, setNewHotel] = useState({
    name: "",
    description: "",
    city: "",
    country: "",
    address: "",
    price: "",
    amenities: "",
  })

  useEffect(() => {
    fetchHotels()
  }, [])

  const fetchHotels = async () => {
    try {
      setLoading(true)
      const hotelData = await getHotels()
      setHotels(hotelData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load hotels.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddHotel = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Hotel Added",
        description: "New hotel has been successfully added.",
      })

      setIsAddingHotel(false)
      setNewHotel({
        name: "",
        description: "",
        city: "",
        country: "",
        address: "",
        price: "",
        amenities: "",
      })
      fetchHotels()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add hotel.",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-deep-blue">Admin Dashboard</h1>
          <p className="text-gray-600">Manage hotels, bookings, and platform analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Hotel className="h-8 w-8 text-sky-blue" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Hotels</p>
                  <p className="text-2xl font-bold">{adminStats.totalHotels}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-sky-blue" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold">{adminStats.totalBookings.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-sky-blue" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">${adminStats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-sky-blue" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                  <p className="text-2xl font-bold">+{adminStats.monthlyGrowth}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="hotels" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="fraud">Fraud Alerts</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="hotels">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Hotel Management</CardTitle>
                    <CardDescription>Add, edit, and manage hotel listings</CardDescription>
                  </div>
                  <Dialog open={isAddingHotel} onOpenChange={setIsAddingHotel}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Hotel
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Hotel</DialogTitle>
                        <DialogDescription>Fill in the details to add a new hotel to the platform.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Hotel Name</Label>
                          <Input
                            id="name"
                            value={newHotel.name}
                            onChange={(e) => setNewHotel((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter hotel name"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newHotel.description}
                            onChange={(e) => setNewHotel((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter hotel description"
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={newHotel.city}
                              onChange={(e) => setNewHotel((prev) => ({ ...prev, city: e.target.value }))}
                              placeholder="Enter city"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              value={newHotel.country}
                              onChange={(e) => setNewHotel((prev) => ({ ...prev, country: e.target.value }))}
                              placeholder="Enter country"
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={newHotel.address}
                            onChange={(e) => setNewHotel((prev) => ({ ...prev, address: e.target.value }))}
                            placeholder="Enter full address"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="price">Starting Price (per night)</Label>
                          <Input
                            id="price"
                            type="number"
                            value={newHotel.price}
                            onChange={(e) => setNewHotel((prev) => ({ ...prev, price: e.target.value }))}
                            placeholder="Enter starting price"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                          <Input
                            id="amenities"
                            value={newHotel.amenities}
                            onChange={(e) => setNewHotel((prev) => ({ ...prev, amenities: e.target.value }))}
                            placeholder="Pool, Spa, Gym, Restaurant"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddingHotel(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddHotel}>Add Hotel</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hotels.map((hotel) => (
                    <div key={hotel.id} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{hotel.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {hotel.location.city}, {hotel.location.country}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{hotel.description}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="secondary">{hotel.rating} ⭐</Badge>
                            <Badge variant="outline">${hotel.price}/night</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Monitor and manage customer bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">{booking.hotelName}</h3>
                          <p className="text-sm text-gray-600">{booking.roomName}</p>
                          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                            <span>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</span>
                            <span>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</span>
                            <span>Guests: {booking.guests}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${booking.totalPrice}</p>
                          <div className="mt-1 space-y-1">
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                            <Badge
                              variant="outline"
                              className={
                                booking.paymentStatus === "paid"
                                  ? "text-green-600"
                                  : booking.paymentStatus === "pending"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }
                            >
                              {booking.paymentStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <p className="text-gray-500">Revenue chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <p className="text-gray-500">Booking trends chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Hotels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {hotels.slice(0, 5).map((hotel, index) => (
                      <div key={hotel.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-blue text-white text-sm font-bold">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-semibold">{hotel.name}</p>
                            <p className="text-sm text-gray-600">{hotel.location.city}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(Math.random() * 50000 + 10000).toFixed(0)}</p>
                          <p className="text-sm text-gray-600">revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Users</span>
                      <span className="font-semibold">12,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Users (30 days)</span>
                      <span className="font-semibold">8,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New Users (this month)</span>
                      <span className="font-semibold">1,456</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hotel Owners</span>
                      <span className="font-semibold">234</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fraud">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Fraud Detection Alerts
                </CardTitle>
                <CardDescription>Monitor suspicious activities and potential fraud</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fraudAlerts.map((alert) => (
                    <div key={alert.id} className="rounded-lg border border-red-200 bg-red-50 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-red-800">{alert.type}</h3>
                            <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                          </div>
                          <p className="text-sm text-red-700">{alert.description}</p>
                          <p className="text-xs text-red-600 mt-1">{new Date(alert.timestamp).toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Investigate
                          </Button>
                          <Button variant="outline" size="sm">
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure platform-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Commission Rate</h4>
                      <p className="text-sm text-gray-600">Platform commission on bookings</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="number" value="15" className="w-20" />
                      <span>%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Service Fee</h4>
                      <p className="text-sm text-gray-600">Fixed service fee per booking</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>$</span>
                      <Input type="number" value="25" className="w-20" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Tax Rate</h4>
                      <p className="text-sm text-gray-600">Default tax rate for bookings</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="number" value="12" className="w-20" />
                      <span>%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>Configure payment methods and processing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Orange Money</h4>
                      <p className="text-sm text-gray-600">Enable Orange Money payments</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Afri Money</h4>
                      <p className="text-sm text-gray-600">Enable Afri Money payments</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure system notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Send email notifications to users</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">SMS Notifications</h4>
                      <p className="text-sm text-gray-600">Send SMS notifications to users</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
