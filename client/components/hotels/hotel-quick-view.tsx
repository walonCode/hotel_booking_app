"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Wifi, Car, Utensils, Calendar, Users, Heart } from "lucide-react"
import type { Hotel } from "@/lib/api"

interface HotelQuickViewProps {
  hotel: Hotel
  trigger: React.ReactNode
}

export function HotelQuickView({ hotel, trigger }: HotelQuickViewProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const amenityIcons = {
    WiFi: Wifi,
    Restaurant: Utensils,
    Parking: Car,
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Gallery */}
          <div className="relative h-64 md:h-full">
            <Image
              src={hotel.images[selectedImage] || "/placeholder.svg"}
              alt={hotel.name}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 flex space-x-2">
              {hotel.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-12 w-12 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? "border-white" : "border-transparent opacity-70"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${hotel.name} ${index + 1}`}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </button>
              ))}
              {hotel.images.length > 4 && (
                <div className="h-12 w-12 rounded-md bg-black/50 flex items-center justify-center text-white text-sm">
                  +{hotel.images.length - 4}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-600 hover:text-red-500"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>

          {/* Hotel Details */}
          <div className="p-6 overflow-y-auto max-h-[600px]">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-soft-black">{hotel.name}</h2>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-warm-gold text-warm-gold" />
                    <span className="font-medium">{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-slate-gray mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{hotel.location}</span>
                </div>
                <p className="text-slate-gray">{hotel.description}</p>
              </div>

              <Tabs defaultValue="rooms">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="rooms">Rooms</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                <TabsContent value="rooms" className="space-y-4 pt-4">
                  {hotel.roomTypes.map((room) => (
                    <div key={room.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-soft-black">{room.name}</h4>
                          <p className="text-slate-gray text-sm">{room.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-royal-blue">${room.price}</div>
                          <div className="text-slate-gray text-xs">per night</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {room.amenities.slice(0, 3).map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {room.amenities.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{room.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-gray">
                        <Users className="h-4 w-4" />
                        <span>Sleeps {room.capacity}</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="amenities" className="pt-4">
                  <div className="grid grid-cols-2 gap-3">
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
                </TabsContent>
                <TabsContent value="location" className="pt-4">
                  <div className="h-48 bg-slate-200 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="h-8 w-8 text-slate-400" />
                    <span className="text-slate-500 ml-2">Map view</span>
                  </div>
                  <p className="text-sm text-slate-gray mb-2">
                    <strong>Address:</strong> {hotel.location}, {hotel.city}, Sierra Leone
                  </p>
                  <p className="text-sm text-slate-gray">
                    <strong>Nearby:</strong> City Center (2km), Beach (1km), Airport (15km)
                  </p>
                </TabsContent>
              </Tabs>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-soft-black">${hotel.pricePerNight}</p>
                    <p className="text-sm text-slate-gray">per night</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Check Availability
                    </Button>
                    <Link href={`/hotels/${hotel.id}`}>
                      <Button className="bg-royal-blue hover:bg-royal-blue/90">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
