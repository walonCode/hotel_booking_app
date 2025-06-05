"use client"
import { Calendar, CalendarDays } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface DateRangePickerProps {
  checkIn: string
  checkOut: string
  onCheckInChange: (date: string) => void
  onCheckOutChange: (date: string) => void
  className?: string
  minDate?: string
}

export function DateRangePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  className,
  minDate,
}: DateRangePickerProps) {
  const today = new Date().toISOString().split("T")[0]
  const minimumDate = minDate || today

  const handleCheckInChange = (date: string) => {
    onCheckInChange(date)
    // If check-out is before or same as new check-in, clear it
    if (checkOut && new Date(checkOut) <= new Date(date)) {
      onCheckOutChange("")
    }
  }

  const getMinCheckOutDate = () => {
    if (!checkIn) return minimumDate
    const checkInDate = new Date(checkIn)
    checkInDate.setDate(checkInDate.getDate() + 1)
    return checkInDate.toISOString().split("T")[0]
  }

  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      <div className="space-y-2">
        <Label htmlFor="checkIn">Check-in Date</Label>
        <div className="relative">
          <Input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => handleCheckInChange(e.target.value)}
            min={minimumDate}
            className="pl-10"
          />
          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="checkOut">Check-out Date</Label>
        <div className="relative">
          <Input
            id="checkOut"
            type="date"
            value={checkOut}
            onChange={(e) => onCheckOutChange(e.target.value)}
            min={getMinCheckOutDate()}
            disabled={!checkIn}
            className="pl-10"
          />
          <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </div>
  )
}
