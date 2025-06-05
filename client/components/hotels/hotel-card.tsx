import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Wifi, Car, Utensils } from "lucide-react"
import type { Hotel } from "@/lib/api"

interface HotelCardProps {
  hotel: Hotel
  className?: string
}

export function HotelCard({ hotel, className }: HotelCardProps) {
  const amenityIcons = {
    WiFi: Wifi,
    Restaurant: Utensils,
    Parking: Car,
  }

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="relative h-48">
        <Image src={hotel.images[0] || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
        <div className="absolute top-3 right-3">
          <Badge className="bg-emerald-green text-white">${hotel.pricePerNight}/night</Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-soft-black line-clamp-1">{hotel.name}</h3>
            <div className="flex items-center space-x-1 text-slate-gray text-sm">
              <MapPin className="h-4 w-4" />
              <span>{hotel.location}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-warm-gold text-warm-gold" />
              <span className="text-sm font-medium">{hotel.rating}</span>
            </div>
            <span className="text-slate-gray text-sm">({hotel.reviewCount} reviews)</span>
          </div>

          <p className="text-slate-gray text-sm line-clamp-2">{hotel.description}</p>

          <div className="flex items-center space-x-2">
            {hotel.amenities.slice(0, 3).map((amenity) => {
              const Icon = amenityIcons[amenity as keyof typeof amenityIcons]
              return Icon ? (
                <div key={amenity} className="flex items-center space-x-1">
                  <Icon className="h-4 w-4 text-slate-gray" />
                </div>
              ) : (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              )
            })}
            {hotel.amenities.length > 3 && (
              <span className="text-slate-gray text-xs">+{hotel.amenities.length - 3} more</span>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-right">
              <div className="text-lg font-bold text-royal-blue">${hotel.pricePerNight}</div>
              <div className="text-slate-gray text-xs">per night</div>
            </div>
            <Link href={`/hotels/${hotel.id}`}>
              <Button className="bg-royal-blue hover:bg-royal-blue/90">View Details</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
