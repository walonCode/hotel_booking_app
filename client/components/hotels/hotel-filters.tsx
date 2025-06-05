"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X } from "lucide-react"

interface HotelFiltersProps {
  onFiltersChange: (filters: {
    city?: string
    minPrice?: number
    maxPrice?: number
    rating?: number
    amenities?: string[]
  }) => void
  isLoading?: boolean
}

export function HotelFilters({ onFiltersChange, isLoading }: HotelFiltersProps) {
  const [city, setCity] = useState("")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [rating, setRating] = useState("")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const amenities = [
    "WiFi",
    "Pool",
    "Restaurant",
    "Spa",
    "Gym",
    "Beach Access",
    "Business Center",
    "Conference Rooms",
    "Airport Transfer",
    "Laundry",
  ]

  const cities = ["Freetown", "Bo", "Kenema", "Makeni", "Koidu", "Port Loko"]

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity])
    } else {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    }
  }

  const applyFilters = () => {
    onFiltersChange({
      city: city || undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      rating: rating ? Number.parseFloat(rating) : undefined,
      amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
    })
  }

  const clearFilters = () => {
    setCity("")
    setPriceRange([0, 500])
    setRating("")
    setSelectedAmenities([])
    onFiltersChange({})
  }

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* City */}
        <div className="space-y-2">
          <Label>City</Label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((cityName) => (
                <SelectItem key={cityName} value={cityName}>
                  {cityName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Price Range (per night)</Label>
          <div className="px-2">
            <Slider value={priceRange} onValueChange={setPriceRange} max={500} min={0} step={10} className="w-full" />
          </div>
          <div className="flex items-center justify-between text-sm text-slate-gray">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <Label>Minimum Rating</Label>
          <Select value={rating} onValueChange={setRating}>
            <SelectTrigger>
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4.5">4.5+ Stars</SelectItem>
              <SelectItem value="4.0">4.0+ Stars</SelectItem>
              <SelectItem value="3.5">3.5+ Stars</SelectItem>
              <SelectItem value="3.0">3.0+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amenities */}
        <div className="space-y-3">
          <Label>Amenities</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <Label htmlFor={amenity} className="text-sm">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-4 border-t">
          <Button onClick={applyFilters} className="w-full bg-royal-blue hover:bg-royal-blue/90" disabled={isLoading}>
            Apply Filters
          </Button>
          <Button onClick={clearFilters} variant="outline" className="w-full" disabled={isLoading}>
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
