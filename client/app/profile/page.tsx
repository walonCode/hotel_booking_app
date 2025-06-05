"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Camera, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { getUserProfile, type User } from "@/lib/api"

export default function ProfilePage() {
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    dateOfBirth: "",
    gender: "",
  })

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const userData = await getUserProfile("user1")
      setUser(userData)
      setFormData({
        name: userData.name,
        email: userData.email,
        phone: "+1 (555) 123-4567",
        bio: "Travel enthusiast who loves exploring new places and cultures.",
        location: "New York, USA",
        dateOfBirth: "1990-05-15",
        gender: "male",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
      setEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="mx-auto max-w-2xl">
          <div className="animate-pulse space-y-6">
            <div className="h-32 w-32 rounded-full bg-gray-200 mx-auto" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Profile not found</h1>
          <p className="text-gray-600">Unable to load your profile information.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl"
      >
        <Card>
          <CardHeader className="text-center">
            <div className="relative mx-auto mb-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription>Manage your profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-end">
              {editing ? (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setEditing(false)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setEditing(true)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="pl-10"
                  />
                  <Edit2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="pl-10"
                  />
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="pl-10"
                  />
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <div className="relative">
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="pl-10"
                  />
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                  disabled={!editing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!editing}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>

            <div className="rounded-lg bg-light-gray p-4">
              <h3 className="mb-2 font-semibold">Account Statistics</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-sky-blue">{user.bookings.length}</div>
                  <div className="text-sm text-gray-600">Total Bookings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-sky-blue">
                    {user.bookings.filter((b) => b.status === "confirmed").length}
                  </div>
                  <div className="text-sm text-gray-600">Confirmed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-sky-blue">2</div>
                  <div className="text-sm text-gray-600">Years Member</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
