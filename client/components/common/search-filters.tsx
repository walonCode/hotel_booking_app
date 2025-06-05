"use client"

import { useState } from "react"
import { X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { SearchFilters as SearchFiltersType } from "@/lib/types"

interface SearchFiltersProps {
  filters: SearchFiltersType
  onFiltersChange: (filters: Partial<SearchFiltersType>) => void
  onClearFilters: () => void
  amenitiesList: string[]
  className?: string
  resultsCount?: number
}

export function SearchFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  amenitiesList,
  className,
  resultsCount,
}: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const activeFiltersCount = [
    filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0,
    filters.amenities.length,
    filters.rating > 0 ? 1 : 0,
    filters.propertyType && filters.propertyType !== "all" ? 1 : 0,
  ].reduce((sum, count) => sum + count, 0)

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const newAmenities = checked ? [...filters.amenities, amenity] : filters.amenities.filter((a) => a !== amenity)

    onFiltersChange({ amenities: newAmenities })
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900">Sort by</h3>
        <Select value={filters.sortBy} onValueChange={(value: any) => onFiltersChange({ sortBy: value })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Price (Low to High)</SelectItem>
            <SelectItem value="rating">Rating (High to Low)</SelectItem>
            <SelectItem value="distance">Distance</SelectItem>
            <SelectItem value="popularity">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Property Type */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900">Property Type</h3>
        <Select
          value={filters.propertyType || "all"}
          onValueChange={(value: any) => onFiltersChange({ propertyType: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Properties</SelectItem>
            <SelectItem value="hotel">Hotels</SelectItem>
            <SelectItem value="guesthouse">Guesthouses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900">Price Range</h3>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => onFiltersChange({ priceRange: value as [number, number] })}
            max={1000}
            min={0}
            step={25}
            className="w-full"
          />
          <div className="mt-3 flex justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}+</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900">Minimum Rating</h3>
        <div className="space-y-2">
          {[0, 3, 4, 4.5].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.rating === rating}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onFiltersChange({ rating })
                  } else if (filters.rating === rating) {
                    onFiltersChange({ rating: 0 })
                  }
                }}
              />
              <label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
                {rating === 0 ? "Any rating" : `${rating}+ stars`}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Amenities */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900">Amenities</h3>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {amenitiesList.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
              />
              <label htmlFor={amenity} className="text-sm cursor-pointer">
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <>
          <Separator />
          <Button variant="outline" onClick={onClearFilters} className="w-full">
            <X className="mr-2 h-4 w-4" />
            Clear All Filters ({activeFiltersCount})
          </Button>
        </>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <div className="text-sm text-gray-600">{resultsCount !== undefined && `${resultsCount} properties found`}</div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filter Results</SheetTitle>
              <SheetDescription>Refine your search to find the perfect accommodation.</SheetDescription>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className={`hidden md:block ${className}`}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filters</CardTitle>
              {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount} active</Badge>}
            </div>
            {resultsCount !== undefined && <p className="text-sm text-gray-600">{resultsCount} properties found</p>}
          </CardHeader>
          <CardContent>
            <FilterContent />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
