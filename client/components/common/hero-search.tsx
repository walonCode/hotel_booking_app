"use client"

import { useState } from "react"
import { Search, Calendar, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function HeroSearch() {
  const [destination, setDestination] = useState("")
  const [dates, setDates] = useState("Jun 10 - Jun 17")
  const [guests, setGuests] = useState("2 adults, 0 children")
  const [isExpanded, setIsExpanded] = useState(false)

  const popularDestinations = ["Freetown", "Bo", "Kenema", "Makeni", "Koidu", "Bonthe"]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Destination */}
            <div className="relative flex-1 border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="flex items-center p-4">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                <Input
                  type="text"
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="border-0 p-0 focus-visible:ring-0 text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                  onFocus={() => setIsExpanded(true)}
                />
              </div>

              {/* Popular destinations */}
              {isExpanded && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg z-10 p-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">Popular destinations in Sierra Leone:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularDestinations.map((dest) => (
                      <Button
                        key={dest}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          setDestination(dest)
                          setIsExpanded(false)
                        }}
                      >
                        {dest}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dates */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex-1 border-b lg:border-b-0 lg:border-r border-gray-200 p-4 cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Check in - Check out</p>
                      <p className="text-sm sm:text-base text-gray-900">{dates}</p>
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Select dates</p>
                    <p className="text-xs text-gray-500">Calendar placeholder - would integrate with a date picker</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Guests */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex-1 border-b lg:border-b-0 lg:border-r border-gray-200 p-4 cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Guests</p>
                      <p className="text-sm sm:text-base text-gray-900">{guests}</p>
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="start">
                <div className="p-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Select guests</p>
                    <p className="text-xs text-gray-500">Guest selector placeholder - would integrate with a counter</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Search button */}
            <div className={cn("p-4", isExpanded ? "lg:bg-blue-50" : "")}>
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md"
                onClick={() => setIsExpanded(false)}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HeroSearch
