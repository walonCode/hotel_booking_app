"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ProgressSteps } from "@/components/ui/progress-steps"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { GuestSelector } from "@/components/ui/guest-selector"
import { BookingSummary } from "@/components/common/booking-summary"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"
import { getHotelById, createBooking, initiatePayment, type Hotel, type RoomType, type PaymentMethod } from "@/lib/api"

const bookingSteps = [
  { id: "details", title: "Details", description: "Booking information" },
  { id: "payment", title: "Payment", description: "Secure payment" },
  { id: "confirmation", title: "Confirmation", description: "Booking confirmed" },
]

export default function BookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState("details")
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const [bookingData, setBookingData] = useState({
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    adults: Number(searchParams.get("adults")) || 2,
    children: Number(searchParams.get("children")) || 0,
    specialRequests: "",
  })

  const [paymentData, setPaymentData] = useState({
    paymentMethod: "" as PaymentMethod,
    phoneNumber: "",
  })

  const [ussdCode, setUssdCode] = useState("")
  const [processing, setProcessing] = useState(false)

  const hotelId = searchParams.get("hotelId")
  const roomId = searchParams.get("roomId")

  useEffect(() => {
    if (hotelId) {
      fetchHotelData()
    }
  }, [hotelId])

  const fetchHotelData = async () => {
    try {
      setLoading(true)
      const hotelData = await getHotelById(hotelId!)
      setHotel(hotelData)

      if (roomId) {
        const room = hotelData.roomTypes.find((r) => r.id === roomId)
        if (room) {
          setSelectedRoom(room)
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load hotel information.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleNextStep = async () => {
    if (currentStep === "details") {
      if (!selectedRoom || !bookingData.checkIn || !bookingData.checkOut) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required booking details.",
          variant: "destructive",
        })
        return
      }

      setCompletedSteps((prev) => [...prev, "details"])
      setCurrentStep("payment")
    } else if (currentStep === "payment") {
      await handlePayment()
    }
  }

  const handlePayment = async () => {
    if (!paymentData.paymentMethod || !paymentData.phoneNumber) {
      toast({
        title: "Payment Information Required",
        description: "Please select payment method and enter phone number.",
        variant: "destructive",
      })
      return
    }

    try {
      setProcessing(true)

      // Create booking first
      const booking = await createBooking({
        hotelId: hotel!.id,
        roomId: selectedRoom!.id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.adults + bookingData.children,
        userId: "user1",
      })

      // Initiate payment
      const paymentResult = await initiatePayment({
        bookingId: booking.id,
        amount: calculateTotal(),
        paymentMethod: paymentData.paymentMethod,
        phoneNumber: paymentData.phoneNumber,
      })

      if (paymentResult.success && paymentResult.ussdCode) {
        setUssdCode(paymentResult.ussdCode)
        toast({
          title: "Payment Initiated",
          description: "Please dial the USSD code to complete payment.",
        })
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
    }
  }

  const handlePaymentComplete = () => {
    setCompletedSteps((prev) => [...prev, "payment"])
    setCurrentStep("confirmation")
    toast({
      title: "Payment Successful",
      description: "Your booking has been confirmed!",
    })
  }

  const calculateTotal = () => {
    if (!selectedRoom || !bookingData.checkIn || !bookingData.checkOut) return 0
    const nights = Math.ceil(
      (new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) / (1000 * 60 * 60 * 24),
    )
    const roomTotal = selectedRoom.price * nights
    const taxes = roomTotal * 0.12
    const serviceFee = 25
    return roomTotal + taxes + serviceFee
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  if (!hotel) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Hotel not found</h1>
          <p className="text-gray-600 mb-4">Unable to load hotel information for booking.</p>
          <Button onClick={() => router.push("/hotels")}>Back to Hotels</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl"
      >
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Progress Steps */}
        <div className="mb-8">
          <ProgressSteps steps={bookingSteps} currentStep={currentStep} completedSteps={completedSteps} />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Step Content */}
            {currentStep === "details" && (
              <BookingDetailsStep
                hotel={hotel}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                bookingData={bookingData}
                setBookingData={setBookingData}
              />
            )}

            {currentStep === "payment" && (
              <PaymentStep
                paymentData={paymentData}
                setPaymentData={setPaymentData}
                ussdCode={ussdCode}
                onPaymentComplete={handlePaymentComplete}
                processing={processing}
              />
            )}

            {currentStep === "confirmation" && (
              <ConfirmationStep
                hotel={hotel}
                room={selectedRoom!}
                bookingData={bookingData}
                onContinue={() => router.push("/dashboard/bookings")}
              />
            )}

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentStep === "payment") setCurrentStep("details")
                  else router.back()
                }}
                disabled={processing}
              >
                {currentStep === "details" ? "Cancel" : "Back"}
              </Button>

              {currentStep !== "confirmation" && (
                <Button onClick={handleNextStep} disabled={processing} className="bg-sky-blue hover:bg-sky-blue/90">
                  {processing ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Processing...
                    </>
                  ) : currentStep === "details" ? (
                    "Continue to Payment"
                  ) : (
                    "Complete Payment"
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            {selectedRoom && (
              <BookingSummary
                hotel={hotel}
                room={selectedRoom}
                checkIn={bookingData.checkIn}
                checkOut={bookingData.checkOut}
                guests={bookingData.adults}
                children={bookingData.children}
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Step Components
function BookingDetailsStep({ hotel, selectedRoom, setSelectedRoom, bookingData, setBookingData }: any) {
  return (
    <div className="space-y-6">
      {/* Room Selection */}
      {!selectedRoom ? (
        <Card>
          <CardHeader>
            <CardTitle>Select a Room</CardTitle>
            <CardDescription>Choose from available rooms at {hotel.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hotel.roomTypes.map((room: RoomType) => (
              <div
                key={room.id}
                className={`cursor-pointer rounded-lg border p-4 transition-colors hover:bg-gray-50 ${
                  selectedRoom?.id === room.id ? "border-sky-blue bg-sky-blue/5" : ""
                }`}
                onClick={() => setSelectedRoom(room)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{room.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.slice(0, 3).map((amenity) => (
                        <span key={amenity} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-xl font-bold">${room.price}</div>
                    <div className="text-sm text-gray-600">per night</div>
                    <div className="text-xs text-gray-500">Up to {room.capacity} guests</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Selected Room</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">{selectedRoom.name}</h3>
                <p className="text-sm text-gray-600">{selectedRoom.description}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">${selectedRoom.price}</div>
                <div className="text-sm text-gray-600">per night</div>
              </div>
            </div>
            <Button variant="outline" onClick={() => setSelectedRoom(null)}>
              Change Room
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Booking Details */}
      {selectedRoom && (
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <DateRangePicker
              checkIn={bookingData.checkIn}
              checkOut={bookingData.checkOut}
              onCheckInChange={(date) => setBookingData((prev: any) => ({ ...prev, checkIn: date }))}
              onCheckOutChange={(date) => setBookingData((prev: any) => ({ ...prev, checkOut: date }))}
            />

            <GuestSelector
              adults={bookingData.adults}
              children={bookingData.children}
              onAdultsChange={(count) => setBookingData((prev: any) => ({ ...prev, adults: count }))}
              onChildrenChange={(count) => setBookingData((prev: any) => ({ ...prev, children: count }))}
              maxGuests={selectedRoom.capacity}
            />

            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
              <Textarea
                id="specialRequests"
                value={bookingData.specialRequests}
                onChange={(e) => setBookingData((prev: any) => ({ ...prev, specialRequests: e.target.value }))}
                placeholder="Any special requests or preferences..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function PaymentStep({ paymentData, setPaymentData, ussdCode, onPaymentComplete, processing }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>Complete your payment using Monime</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!ussdCode ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <select
                id="paymentMethod"
                value={paymentData.paymentMethod}
                onChange={(e) => setPaymentData((prev: any) => ({ ...prev, paymentMethod: e.target.value }))}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select payment method</option>
                <option value="orange_money">Orange Money</option>
                <option value="afri_money">Afri Money</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Mobile Phone Number</Label>
              <input
                id="phoneNumber"
                type="tel"
                value={paymentData.phoneNumber}
                onChange={(e) => setPaymentData((prev: any) => ({ ...prev, phoneNumber: e.target.value }))}
                placeholder="+237 6XX XXX XXX"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </>
        ) : (
          <div className="rounded-lg bg-sky-blue/10 p-6 text-center">
            <h4 className="mb-4 text-lg font-semibold text-sky-blue">Complete Payment</h4>
            <p className="mb-4 text-sm text-gray-600">
              Dial the following USSD code on your phone to complete the payment:
            </p>
            <div className="rounded bg-white p-4 mb-6">
              <code className="text-2xl font-bold">{ussdCode}</code>
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={onPaymentComplete} className="bg-green-600 hover:bg-green-700">
                <Check className="mr-2 h-4 w-4" />
                I've Completed Payment
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ConfirmationStep({ hotel, room, bookingData, onContinue }: any) {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600">Your reservation has been successfully created.</p>
        </div>

        <div className="mb-6 rounded-lg bg-gray-50 p-4 text-left">
          <h3 className="font-semibold mb-2">Booking Details</h3>
          <div className="space-y-1 text-sm">
            <p>
              <strong>Hotel:</strong> {hotel.name}
            </p>
            <p>
              <strong>Room:</strong> {room.name}
            </p>
            <p>
              <strong>Check-in:</strong> {new Date(bookingData.checkIn).toLocaleDateString()}
            </p>
            <p>
              <strong>Check-out:</strong> {new Date(bookingData.checkOut).toLocaleDateString()}
            </p>
            <p>
              <strong>Guests:</strong> {bookingData.adults + bookingData.children}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            A confirmation email has been sent to your email address with all the details.
          </p>
          <Button onClick={onContinue} className="w-full bg-sky-blue hover:bg-sky-blue/90">
            View My Bookings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
