"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Search, Users, ChevronDown, MapPin, X } from "lucide-react"
import { useRouter } from "next/navigation"

export function AdvancedSearch() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: undefined as Date | undefined,
    checkOut: undefined as Date | undefined,
    guests: 2,
    priceRange: [0, 500] as [number, number],
    amenities: [] as string[],
  })

  const handleSearch = () => {
    // Build query string
    const params = new URLSearchParams()

    if (searchParams.location) {
      params.append("location", searchParams.location)
    }

    if (searchParams.checkIn) {
      params.append("checkIn", format(searchParams.checkIn, "yyyy-MM-dd"))
    }

    if (searchParams.checkOut) {
      params.append("checkOut", format(searchParams.checkOut, "yyyy-MM-dd"))
    }

    params.append("guests", searchParams.guests.toString())
    params.append("minPrice", searchParams.priceRange[0].toString())
    params.append("maxPrice", searchParams.priceRange[1].toString())

    if (searchParams.amenities.length > 0) {
      params.append("amenities", searchParams.amenities.join(","))
    }

    router.push(`/hotels?${params.toString()}`)
  }

  const toggleAmenity = (amenity: string) => {
    setSearchParams((prev) => {
      const current = [...prev.amenities]
      if (current.includes(amenity)) {
        return {
          ...prev,
          amenities: current.filter((a) => a !== amenity),
        }
      } else {
        return {
          ...prev,
          amenities: [...current, amenity],
        }
      }
    })
  }

  const resetSearch = () => {
    setSearchParams({
      location: "",
      checkIn: undefined,
      checkOut: undefined,
      guests: 2,
      priceRange: [0, 500],
      amenities: [],
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-1">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {/* Location */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <MapPin className="h-5 w-5 text-slate-gray" />
          </div>
          <Input
            placeholder="Where are you going?"
            value={searchParams.location}
            onChange={(e) => setSearchParams((prev) => ({ ...prev, location: e.target.value }))}
            className="pl-10 h-14"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`h-14 justify-start text-left font-normal ${!searchParams.checkIn && "text-slate-500"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {searchParams.checkIn ? format(searchParams.checkIn, "MMM dd") : "Check-in"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={searchParams.checkIn}
                onSelect={(date) => setSearchParams((prev) => ({ ...prev, checkIn: date }))}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`h-14 justify-start text-left font-normal ${!searchParams.checkOut && "text-slate-500"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {searchParams.checkOut ? format(searchParams.checkOut, "MMM dd") : "Check-out"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={searchParams.checkOut}
                onSelect={(date) => setSearchParams((prev) => ({ ...prev, checkOut: date }))}
                disabled={(date) => date < (searchParams.checkIn || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Users className="h-5 w-5 text-slate-gray" />
          </div>
          <Input
            type="number"
            min="1"
            max="10"
            value={searchParams.guests}
            onChange={(e) => setSearchParams((prev) => ({ ...prev, guests: Number.parseInt(e.target.value) || 1 }))}
            className="pl-10 h-14"
          />
        </div>

        {/* Search Button */}
        <Button onClick={handleSearch} className="h-14 bg-royal-blue hover:bg-royal-blue/90">
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </div>

      {/* Advanced Options */}
      <div className="mt-2">
        <Button
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className="text-royal-blue hover:text-royal-blue/90 p-2"
        >
          {isOpen ? "Hide" : "Show"} advanced options
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>

        {isOpen && (
          <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Range */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Price Range (per night)</Label>
                <span className="text-sm text-slate-gray">
                  ${searchParams.priceRange[0]} - ${searchParams.priceRange[1]}
                </span>
              </div>
              <Slider
                value={searchParams.priceRange}
                onValueChange={(value) =>
                  setSearchParams((prev) => ({ ...prev, priceRange: value as [number, number] }))
                }
                min={0}
                max={500}
                step={10}
              />
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 gap-2">
                {["WiFi", "Pool", "Restaurant", "Spa", "Gym", "Beach Access"].map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={searchParams.amenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <Label htmlFor={`amenity-${amenity}`} className="text-sm">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <div className="md:col-span-2 flex justify-end">
              <Button variant="outline" onClick={resetSearch} className="flex items-center">
                <X className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
