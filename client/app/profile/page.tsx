"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { User, Mail, Phone, MapPin, Star, Settings, Shield, Bell } from "lucide-react"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+232 XX XXX XXXX",
    city: "Freetown",
    bio: "Travel enthusiast exploring the beautiful landscapes of Sierra Leone.",
    joinDate: "2024-01-15",
    totalBookings: 12,
    membershipLevel: "Gold",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    bookingReminders: true,
    currency: "USD",
    language: "English",
  })

  const handleProfileUpdate = async () => {
    setIsLoading(true)
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Profile updated:", profile)
    } catch (error) {
      console.error("Profile update failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreferencesUpdate = async () => {
    setIsLoading(true)
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Preferences updated:", preferences)
    } catch (error) {
      console.error("Preferences update failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-off-white">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-soft-black mb-4">My Profile</h1>
          <p className="text-slate-gray text-lg">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-24 w-24 bg-gradient-to-br from-royal-blue to-sky-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-soft-black mb-1">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-slate-gray text-sm mb-3">{profile.email}</p>
                <Badge className="bg-warm-gold text-soft-black mb-4">{profile.membershipLevel} Member</Badge>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-gray">Member since</span>
                    <span className="text-soft-black">{new Date(profile.joinDate).getFullYear()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-gray">Total bookings</span>
                    <span className="text-soft-black">{profile.totalBookings}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-gray">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-warm-gold text-warm-gold" />
                      <span className="text-soft-black">4.8</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Personal Info</span>
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Preferences</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Security</span>
                </TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-gray" />
                          <Input
                            id="firstName"
                            value={profile.firstName}
                            onChange={(e) => setProfile((prev) => ({ ...prev, firstName: e.target.value }))}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-gray" />
                          <Input
                            id="lastName"
                            value={profile.lastName}
                            onChange={(e) => setProfile((prev) => ({ ...prev, lastName: e.target.value }))}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-gray" />
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-gray" />
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-gray" />
                          <Input
                            id="city"
                            value={profile.city}
                            onChange={(e) => setProfile((prev) => ({ ...prev, city: e.target.value }))}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        value={profile.bio}
                        onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                        rows={4}
                      />
                    </div>

                    <Button
                      onClick={handleProfileUpdate}
                      disabled={isLoading}
                      className="bg-royal-blue hover:bg-royal-blue/90"
                    >
                      {isLoading ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Updating...
                        </>
                      ) : (
                        "Update Profile"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences */}
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences & Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-soft-black flex items-center space-x-2">
                        <Bell className="h-5 w-5" />
                        <span>Notifications</span>
                      </h4>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="emailNotifications">Email Notifications</Label>
                            <p className="text-sm text-slate-gray">Receive booking confirmations and updates</p>
                          </div>
                          <input
                            type="checkbox"
                            id="emailNotifications"
                            checked={preferences.emailNotifications}
                            onChange={(e) =>
                              setPreferences((prev) => ({ ...prev, emailNotifications: e.target.checked }))
                            }
                            className="rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="smsNotifications">SMS Notifications</Label>
                            <p className="text-sm text-slate-gray">Receive text messages for urgent updates</p>
                          </div>
                          <input
                            type="checkbox"
                            id="smsNotifications"
                            checked={preferences.smsNotifications}
                            onChange={(e) =>
                              setPreferences((prev) => ({ ...prev, smsNotifications: e.target.checked }))
                            }
                            className="rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="marketingEmails">Marketing Emails</Label>
                            <p className="text-sm text-slate-gray">Receive special offers and promotions</p>
                          </div>
                          <input
                            type="checkbox"
                            id="marketingEmails"
                            checked={preferences.marketingEmails}
                            onChange={(e) => setPreferences((prev) => ({ ...prev, marketingEmails: e.target.checked }))}
                            className="rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="bookingReminders">Booking Reminders</Label>
                            <p className="text-sm text-slate-gray">Get reminded about upcoming trips</p>
                          </div>
                          <input
                            type="checkbox"
                            id="bookingReminders"
                            checked={preferences.bookingReminders}
                            onChange={(e) =>
                              setPreferences((prev) => ({ ...prev, bookingReminders: e.target.checked }))
                            }
                            className="rounded"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currency">Preferred Currency</Label>
                        <select
                          id="currency"
                          value={preferences.currency}
                          onChange={(e) => setPreferences((prev) => ({ ...prev, currency: e.target.value }))}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="SLL">SLL (Le)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <select
                          id="language"
                          value={preferences.language}
                          onChange={(e) => setPreferences((prev) => ({ ...prev, language: e.target.value }))}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="English">English</option>
                          <option value="Krio">Krio</option>
                          <option value="French">French</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      onClick={handlePreferencesUpdate}
                      disabled={isLoading}
                      className="bg-royal-blue hover:bg-royal-blue/90"
                    >
                      {isLoading ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Updating...
                        </>
                      ) : (
                        "Save Preferences"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold text-soft-black mb-2">Change Password</h4>
                        <p className="text-slate-gray text-sm mb-4">Update your password to keep your account secure</p>
                        <Button variant="outline">Change Password</Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold text-soft-black mb-2">Two-Factor Authentication</h4>
                        <p className="text-slate-gray text-sm mb-4">Add an extra layer of security to your account</p>
                        <Button variant="outline">Enable 2FA</Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold text-soft-black mb-2">Login Sessions</h4>
                        <p className="text-slate-gray text-sm mb-4">Manage your active login sessions</p>
                        <Button variant="outline">View Sessions</Button>
                      </div>

                      <div className="border rounded-lg p-4 border-red-200">
                        <h4 className="font-semibold text-red-600 mb-2">Delete Account</h4>
                        <p className="text-slate-gray text-sm mb-4">Permanently delete your account and all data</p>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
