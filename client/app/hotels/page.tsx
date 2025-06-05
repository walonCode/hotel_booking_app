"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { HotelCard } from "@/components/common/hotel-card"
import { SearchInput } from "@/components/ui/search-input"
import { EmptyState } from "@/components/ui/empty-state"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav"
import { getHotels } from "@/lib/api"
import type { SearchFilters, Hotel } from "@/lib/types"

export default function HotelsPage() {
  const searchParams = useSearchParams()
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState(searchParams.get("location") || "")

  const [filters, setFilters] = useState<SearchFilters>({
    location: searchParams.get("location") || "",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    adults: Number(searchParams.get("adults")) || 2,
    children: Number(searchParams.get("children")) || 0,
    priceRange: [0, 1000],
    amenities: [],
    rating: 0,
    sortBy: "price",
    propertyType: "all",
  })

  // Fetch hotels
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getHotels(filters)
        setHotels(data)
      } catch (err) {
        setError("Failed to fetch hotels. Please try again.")
        console.error("Error fetching hotels:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [filters])

  // Update filters when search query changes
  useEffect(() => {
    setFilters((prev) => ({ ...prev, location: searchQuery }))
  }, [searchQuery])

  // Memoized filtered hotels
  const processedHotels = useMemo(() => {
    if (!hotels) return []
    return hotels.filter((hotel) => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        hotel.name.toLowerCase().includes(query) ||
        hotel.location.city.toLowerCase().includes(query) ||
        hotel.location.country.toLowerCase().includes(query)
      )
    })
  }, [hotels, searchQuery])

  const breadcrumbItems = [{ label: "Hotels" }, ...(searchQuery ? [{ label: `Search: ${searchQuery}` }] : [])]

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-6">
        <BreadcrumbNav items={breadcrumbItems} />

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Hotels in ${searchQuery}` : "Find Hotels in Sierra Leone"}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Discover amazing accommodations across Salone for your perfect stay
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchInput
            placeholder="Search by city, hotel name, or landmark..."
            value={searchQuery}
            onChange={setSearchQuery}
            className="max-w-md"
            suggestions={["Freetown", "Bo", "Kenema", "Makeni", "Aberdeen Beach", "Hill Station"]}
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="text-blue-600 hover:underline">
              Try again
            </button>
          </div>
        ) : processedHotels.length === 0 ? (
          <EmptyState
            icon="🏨"
            title="No hotels found"
            description="Try adjusting your search criteria to find more options."
            action={{
              label: "Clear Search",
              onClick: () => setSearchQuery(""),
            }}
          />
        ) : (
          <>
            {/* Results header */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600 text-sm sm:text-base">
                {processedHotels.length} propert{processedHotels.length !== 1 ? "ies" : "y"} found
              </p>
            </div>

            {/* Hotels grid */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {processedHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} variant={hotel.featured ? "featured" : "default"} />
              ))}
            </div>
          </>
        )}
      </div>
    </ErrorBoundary>
  )
}
