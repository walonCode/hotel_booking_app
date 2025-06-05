"use client"

import { useState, useEffect } from "react"
import { HotelCard } from "@/components/hotels/hotel-card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Filter } from "lucide-react"
import { api, type Hotel } from "@/lib/api"
import Link from "next/link"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      // Mock API call - in real app, this would fetch user's favorites
      const allHotels = await api.getHotels()
      // Simulate some favorites
      setFavorites(allHotels.slice(0, 2))
    } catch (error) {
      console.error("Failed to load favorites:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeFavorite = (hotelId: string) => {
    setFavorites((prev) => prev.filter((hotel) => hotel.id !== hotelId))
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
          <h1 className="text-3xl md:text-4xl font-bold text-soft-black mb-4 flex items-center space-x-3">
            <Heart className="h-8 w-8 text-red-500" />
            <span>My Favorites</span>
          </h1>
          <p className="text-slate-gray text-lg">Your saved hotels and accommodations</p>
        </div>

        {favorites.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 text-slate-gray mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-soft-black mb-2">No favorites yet</h3>
              <p className="text-slate-gray mb-6">
                Start exploring our amazing hotels and save your favorites for easy access
              </p>
              <Link href="/hotels">
                <Button className="bg-royal-blue hover:bg-royal-blue/90">Browse Hotels</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-gray">
                {favorites.length} {favorites.length === 1 ? "hotel" : "hotels"} saved
              </p>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((hotel) => (
                <div key={hotel.id} className="relative">
                  <HotelCard hotel={hotel} />
                  <Button
                    onClick={() => removeFavorite(hotel.id)}
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
