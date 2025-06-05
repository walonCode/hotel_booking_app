"use client"

import { Minus, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface GuestSelectorProps {
  adults: number
  children: number
  onAdultsChange: (count: number) => void
  onChildrenChange: (count: number) => void
  maxGuests?: number
}

export function GuestSelector({
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
  maxGuests = 10,
}: GuestSelectorProps) {
  const totalGuests = adults + children

  const adjustCount = (current: number, delta: number, min: number, max: number) => {
    const newValue = current + delta
    return Math.max(min, Math.min(max, newValue))
  }

  return (
    <div className="space-y-2">
      <Label>Guests</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start pl-10">
            <Users className="absolute left-3 h-4 w-4 text-gray-400" />
            {totalGuests} Guest{totalGuests !== 1 ? "s" : ""}
            {children > 0 && ` (${children} child${children !== 1 ? "ren" : ""})`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Adults</p>
                <p className="text-sm text-gray-600">Ages 13 or above</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onAdultsChange(adjustCount(adults, -1, 1, maxGuests))}
                  disabled={adults <= 1}
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{adults}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onAdultsChange(adjustCount(adults, 1, 1, maxGuests))}
                  disabled={totalGuests >= maxGuests}
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Children</p>
                <p className="text-sm text-gray-600">Ages 2-12</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onChildrenChange(adjustCount(children, -1, 0, maxGuests))}
                  disabled={children <= 0}
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{children}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onChildrenChange(adjustCount(children, 1, 0, maxGuests))}
                  disabled={totalGuests >= maxGuests}
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
