import Link from "next/link"
import Image from "next/image"
import { MapPin, Star, Wifi, Car, Utensils, Waves, Shield, Heart, Users, Bed } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Hotel {
  id: string
  name: string
  description: string
  location: {
    city: string
    country: string
    address: string
  }
  images: string[]
  price: number
  rating: number
  amenities: string[]
  roomTypes: Array<{
    id: string
    name: string
    capacity: number
    price: number
  }>
  reviews: Array<{
    id: string
    rating: number
    comment: string
    author: string
  }>
  verified?: boolean
  featured?: boolean
}

interface HotelCardProps {
  hotel: Hotel
  showBookButton?: boolean
  className?: string
  variant?: "default" | "compact" | "featured"
}

const amenityIcons: Record<string, any> = {
  "Free WiFi": Wifi,
  Parking: Car,
  Restaurant: Utensils,
  Pool: Waves,
}

export function HotelCard({ hotel, showBookButton = true, className, variant = "default" }: HotelCardProps) {
  const isCompact = variant === "compact"
  const isFeatured = variant === "featured"

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer bg-white",
        isFeatured && "ring-2 ring-gold/30 shadow-lg",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden", isCompact ? "h-40" : "h-56")}>
        <Image
          src={hotel.images[0] || "/placeholder.svg?height=400&width=600"}
          alt={hotel.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hotel.verified && (
            <Badge className="bg-green-500 text-white shadow-lg backdrop-blur-sm text-xs">
              <Shield className="mr-1 h-3 w-3" />
              Verified
            </Badge>
          )}
          {isFeatured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg text-xs">
              ⭐ Featured
            </Badge>
          )}
        </div>

        {/* Top right actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Badge className="bg-white/95 text-gray-900 backdrop-blur-sm shadow-lg">
            <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
            {hotel.rating}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white/95 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
          </Button>
        </div>

        {/* Bottom overlay info */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Up to {hotel.roomTypes[0]?.capacity || 4} guests</span>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4" />
              <span>{hotel.roomTypes.length} room types</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className={cn("p-4 sm:p-6", isCompact && "p-3 sm:p-4")}>
        <div className="space-y-3 sm:space-y-4">
          {/* Header */}
          <div>
            <h3
              className={cn(
                "font-semibold line-clamp-1 group-hover:text-blue-600 transition-colors duration-200",
                isCompact ? "text-base sm:text-lg" : "text-lg sm:text-xl",
              )}
            >
              {hotel.name}
            </h3>
            <div className="flex items-center text-gray-500 mt-1">
              <MapPin className="mr-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm line-clamp-1">
                {hotel.location.city}, {hotel.location.country}
              </span>
            </div>
          </div>

          {/* Description */}
          {!isCompact && (
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">{hotel.description}</p>
          )}

          {/* Amenities */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {hotel.amenities.slice(0, isCompact ? 2 : 3).map((amenity) => {
              const IconComponent = amenityIcons[amenity]
              return (
                <div
                  key={amenity}
                  className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 transition-colors hover:bg-blue-100"
                >
                  {IconComponent && <IconComponent className="h-3 w-3 text-blue-600" />}
                  <span className="text-xs font-medium text-blue-600">{amenity}</span>
                </div>
              )
            })}
            {hotel.amenities.length > (isCompact ? 2 : 3) && (
              <div className="flex items-center rounded-full bg-gray-100 px-2 py-1">
                <span className="text-xs font-medium text-gray-600">
                  +{hotel.amenities.length - (isCompact ? 2 : 3)} more
                </span>
              </div>
            )}
          </div>

          {/* Reviews summary */}
          {!isCompact && hotel.reviews.length > 0 && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < Math.floor(hotel.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                    )}
                  />
                ))}
              </div>
              <span>({hotel.reviews.length} reviews)</span>
            </div>
          )}

          {/* Price and action */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">${hotel.price}</span>
                <span className="text-xs sm:text-sm text-gray-500">/ night</span>
              </div>
              <p className="text-xs text-gray-400">Taxes included</p>
            </div>

            {showBookButton && (
              <Button
                asChild
                variant={isCompact ? "default" : "outline"}
                size={isCompact ? "sm" : "default"}
                className={cn(
                  "font-medium transition-all duration-200",
                  !isCompact && "hover:bg-blue-600 hover:text-white hover:border-blue-600",
                )}
              >
                <Link href={`/hotels/${hotel.id}`}>{isCompact ? "Book Now" : "View Details"}</Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
