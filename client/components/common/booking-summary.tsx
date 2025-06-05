import { Calendar, Users, CreditCard, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import type { Hotel, RoomType } from "@/lib/api"

interface BookingSummaryProps {
  hotel: Hotel
  room: RoomType
  checkIn: string
  checkOut: string
  guests: number
  children?: number
  onPriceCalculated?: (total: number) => void
}

export function BookingSummary({
  hotel,
  room,
  checkIn,
  checkOut,
  guests,
  children = 0,
  onPriceCalculated,
}: BookingSummaryProps) {
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    return Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const roomTotal = room.price * nights
  const taxes = roomTotal * 0.12 // 12% tax
  const serviceFee = 25
  const total = roomTotal + taxes + serviceFee

  // Notify parent of price calculation
  if (onPriceCalculated && total > 0) {
    onPriceCalculated(total)
  }

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold">{room.name}</h4>
          <p className="text-sm text-gray-600">{hotel.name}</p>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant="secondary">{hotel.rating} ⭐</Badge>
            <Badge variant="outline">{hotel.location.city}</Badge>
          </div>
        </div>

        {checkIn && checkOut && (
          <>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span className="font-medium">{new Date(checkIn).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span className="font-medium">{new Date(checkOut).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-gray-400" />
                <div className="flex justify-between w-full">
                  <span>Guests:</span>
                  <span className="font-medium">
                    {guests} Adult{guests !== 1 ? "s" : ""}
                    {children > 0 && `, ${children} Child${children !== 1 ? "ren" : ""}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span>Duration:</span>
                <span className="font-medium">
                  {nights} night{nights !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>
                  ${room.price} × {nights} night{nights !== 1 ? "s" : ""}
                </span>
                <span>${roomTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & fees</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
            </div>

            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-deep-blue">${total.toFixed(2)}</span>
            </div>
          </>
        )}

        <div className="rounded-lg bg-green-50 p-3">
          <div className="flex items-center gap-2 text-green-700">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Free cancellation</span>
          </div>
          <p className="text-xs text-green-600">Cancel up to 24 hours before check-in for a full refund</p>
        </div>

        <div className="text-xs text-gray-500">
          <p>• Prices are in USD and include all taxes</p>
          <p>• Additional fees may apply for extra services</p>
          <p>• Check-in: 3:00 PM | Check-out: 11:00 AM</p>
        </div>
      </CardContent>
    </Card>
  )
}
