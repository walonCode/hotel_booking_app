"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { HotelCard } from "@/components/hotels/hotel-card"
import { HotelFilters } from "@/components/hotels/hotel-filters"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, Grid, List } from "lucide-react"
import { api, type Hotel } from "@/lib/api"

export default function HotelsPage() {
  const searchParams = useSearchParams()
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("search") || "")
  const [sortBy, setSortBy] = useState("recommended")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    loadHotels()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = hotels.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.city.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredHotels(filtered)
    } else {
      setFilteredHotels(hotels)
    }
  }, [searchQuery, hotels])

  const loadHotels = async () => {
    try {
      setIsLoading(true)
      const data = await api.getHotels()
      setHotels(data)
      setFilteredHotels(data)
    } catch (error) {
      console.error("Failed to load hotels:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFiltersChange = async (filters: any) => {
    try {
      setIsLoading(true)
      const data = await api.getHotels(filters)
      setFilteredHotels(data)
    } catch (error) {
      console.error("Failed to apply filters:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSort = (value: string) => {
    setSortBy(value)
    const sorted = [...filteredHotels]

    switch (value) {
      case "price-low":
        sorted.sort((a, b) => a.pricePerNight - b.pricePerNight)
        break
      case "price-high":
        sorted.sort((a, b) => b.pricePerNight - a.pricePerNight)
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Keep original order for 'recommended'
        break
    }

    setFilteredHotels(sorted)
  }

  const handleSearch = () => {
    // Search is handled by useEffect
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-off-white">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-soft-black mb-4">Hotels in Sierra Leone</h1>
          <p className="text-slate-gray text-lg">
            Discover {filteredHotels.length} amazing accommodations across the country
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-gray" />
              <Input
                placeholder="Search hotels by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={handleSort}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {searchQuery && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-gray">Active filters:</span>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Search: {searchQuery}</span>
                <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-red-500">
                  ×
                </button>
              </Badge>
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`w-80 ${showFilters ? "block" : "hidden"} lg:block`}>
            <HotelFilters onFiltersChange={handleFiltersChange} isLoading={isLoading} />
          </div>

          {/* Hotels Grid/List */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredHotels.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏨</div>
                <h3 className="text-xl font-semibold text-soft-black mb-2">No hotels found</h3>
                <p className="text-slate-gray">Try adjusting your search criteria or filters</p>
              </div>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}
              >
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} className={viewMode === "list" ? "flex-row" : ""} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
