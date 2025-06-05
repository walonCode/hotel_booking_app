"use client"

import { useState, useEffect } from "react"
import { HotelCard } from "@/components/hotels/hotel-card"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { api, type Hotel } from "@/lib/api"

interface SimilarHotelsProps {
  currentHotelId: string
  city: string
}

export function SimilarHotels({ currentHotelId, city }: SimilarHotelsProps) {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadSimilarHotels()
  }, [currentHotelId, city])

  const loadSimilarHotels = async () => {
    try {
      setIsLoading(true)
      // In a real app, we would filter by city and exclude the current hotel
      const allHotels = await api.getHotels({ city })
      const filtered = allHotels.filter((hotel) => hotel.id !== currentHotelId)
      setHotels(filtered)
    } catch (error) {
      console.error("Failed to load similar hotels:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const scrollLeft = () => {
    const container = document.getElementById("similar-hotels-container")
    if (container) {
      container.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    const container = document.getElementById("similar-hotels-container")
    if (container) {
      container.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (hotels.length === 0) {
    return null
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-soft-black">Similar Hotels in {city}</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={scrollLeft} className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={scrollRight} className="rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        id="similar-hotels-container"
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {hotels.map((hotel) => (
          <div key={hotel.id} className="min-w-[300px] max-w-[300px]">
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  )
}
