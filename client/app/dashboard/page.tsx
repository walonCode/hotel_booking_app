"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Star, CreditCard, MessageSquare, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUserProfile, type User as UserType } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function DashboardPage() {
  const { toast } = useToast()
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const userData = await getUserProfile("user1")
      setUser(userData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
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

  const upcomingBookings = user?.bookings.filter((booking) => new Date(booking.checkIn) > new Date()) || []

  const recentBookings = user?.bookings.slice(0, 3) || []

  if (loading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-64 bg-gray-200 rounded" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard not available</h1>
          <p className="text-gray-600">Unable to load your dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-deep-blue">Welcome back, {user.name.split(" ")[0]}!</h1>
          <p className="text-gray-600">Manage your bookings and account settings</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-sky-blue" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold">{user.bookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-sky-blue" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming Trips</p>
                  <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-sky-blue" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold">
                    ${user.bookings.reduce((sum, booking) => sum + booking.totalPrice, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-sky-blue" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Member Since</p>
                  <p className="text-2xl font-bold">2022</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Upcoming Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bookings</CardTitle>
                  <CardDescription>Your next trips</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingBookings.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingBookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center space-x-4 rounded-lg border p-4">
                          <div className="flex-1">
                            <h4 className="font-semibold">{booking.hotelName}</h4>
                            <p className="text-sm text-gray-600">{booking.roomName}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                              {new Date(booking.checkOut).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </div>
                      ))}
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/dashboard/bookings">View All Bookings</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500">No upcoming bookings</p>
                      <Button asChild className="mt-4">
                        <Link href="/hotels">Book Your Next Stay</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center space-x-4">
                        <div className="flex-1">
                          <h4 className="font-semibold">{booking.hotelName}</h4>
                          <p className="text-sm text-gray-600">
                            Booked for {new Date(booking.checkIn).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${booking.totalPrice}</p>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Button asChild className="h-20 flex-col">
                    <Link href="/hotels">
                      <MapPin className="mb-2 h-6 w-6" />
                      Find Hotels
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link href="/profile">
                      <User className="mb-2 h-6 w-6" />
                      Edit Profile
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link href="/contact">
                      <MessageSquare className="mb-2 h-6 w-6" />
                      Contact Support
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>View and manage your hotel bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.bookings.map((booking) => (
                    <div key={booking.id} className="rounded-lg border p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{booking.hotelName}</h3>
                          <p className="text-gray-600">{booking.roomName}</p>
                          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                            <span>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</span>
                            <span>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</span>
                            <span>Guests: {booking.guests}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">${booking.totalPrice}</p>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                          <div className="mt-2">
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
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {booking.status === "confirmed" && new Date(booking.checkIn) > new Date() && (
                          <Button variant="outline" size="sm">
                            Cancel Booking
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="text-lg">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <Button asChild variant="outline" className="mt-2">
                      <Link href="/profile">Edit Profile</Link>
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Account Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Member since:</span>
                        <span>January 2022</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total bookings:</span>
                        <span>{user.bookings.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Confirmed bookings:</span>
                        <span>{user.bookings.filter((b) => b.status === "confirmed").length}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Preferences</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Email notifications:</span>
                        <span>Enabled</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SMS notifications:</span>
                        <span>Disabled</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Currency:</span>
                        <span>USD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive booking confirmations and updates</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">SMS Notifications</h4>
                      <p className="text-sm text-gray-600">Get text messages for important updates</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Privacy Settings</h4>
                      <p className="text-sm text-gray-600">Control your data and privacy preferences</p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Change Password</h4>
                      <p className="text-sm text-gray-600">Update your account password</p>
                    </div>
                    <Button variant="outline">Change</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-red-600">Delete Account</h4>
                      <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive">Delete</Button>
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
