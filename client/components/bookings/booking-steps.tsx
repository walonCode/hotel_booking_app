"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Calendar, Users, Check, ChevronRight, ChevronLeft, Smartphone, CreditCardIcon } from "lucide-react"
import { api, type Hotel, type RoomType } from "@/lib/api"
import { MobileMoneyPayment } from "@/components/payments/mobile-money-payment"

interface BookingStepsProps {
  hotel: Hotel
  selectedRoom: RoomType
  checkIn: string
  checkOut: string
  guests: number
  onComplete?: () => void
}

export function BookingSteps({ hotel, selectedRoom, checkIn, checkOut, guests, onComplete }: BookingStepsProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [bookingData, setBookingData] = useState({
    // Guest Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",

    // Payment Information
    paymentMethod: "credit-card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    savePaymentInfo: false,
    mobileMoneyTransactionId: "",

    // Booking Details
    hotelId: hotel.id,
    hotelName: hotel.name,
    roomType: selectedRoom.name,
    checkIn,
    checkOut,
    guests,
    totalPrice: calculateTotalPrice(),
  })

  function calculateTotalPrice() {
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    return nights * selectedRoom.price
  }

  const handleInputChange = (field: string, value: any) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else {
      handleBookingSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBookingSubmit = async () => {
    setIsLoading(true)
    try {
      // In a real app, we would process payment here
      const booking = await api.createBooking({
        hotelId: bookingData.hotelId,
        hotelName: bookingData.hotelName,
        roomType: bookingData.roomType,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        totalPrice: bookingData.totalPrice,
        customerName: `${bookingData.firstName} ${bookingData.lastName}`,
        customerEmail: bookingData.email,
      })

      // Close modal if provided
      if (onComplete) {
        onComplete()
      }

      // Navigate to booking confirmation
      router.push(`/bookings/${booking.id}?success=true`)
    } catch (error) {
      console.error("Booking failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMobileMoneyComplete = (transactionId: string) => {
    handleInputChange("mobileMoneyTransactionId", transactionId)
    handleInputChange("paymentMethod", "mobile-money")
    setCurrentStep(3) // Move to review step
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={bookingData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={bookingData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={bookingData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests (optional)</Label>
              <Input
                id="specialRequests"
                value={bookingData.specialRequests}
                onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                placeholder="E.g., early check-in, high floor, etc."
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Payment Method</Label>
              <RadioGroup
                value={bookingData.paymentMethod}
                onValueChange={(value) => handleInputChange("paymentMethod", value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex items-center space-x-2">
                    <CreditCardIcon className="h-4 w-4" />
                    <span>Credit/Debit Card</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mobile-money" id="mobile-money" />
                  <Label htmlFor="mobile-money" className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4" />
                    <span>Mobile Money</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {bookingData.paymentMethod === "credit-card" && (
              <>
                <div className="space-y-4">
                  {/* Credit card form fields */}
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={bookingData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      value={bookingData.cardName}
                      onChange={(e) => handleInputChange("cardName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        value={bookingData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={bookingData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="savePaymentInfo"
                      checked={bookingData.savePaymentInfo}
                      onCheckedChange={(checked) => handleInputChange("savePaymentInfo", checked)}
                    />
                    <Label htmlFor="savePaymentInfo" className="text-sm">
                      Save payment information for future bookings
                    </Label>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handleBack}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNext} className="bg-royal-blue hover:bg-royal-blue/90">
                    Continue
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
            )}

            {bookingData.paymentMethod === "mobile-money" && (
              <div className="space-y-4">
                <MobileMoneyPayment
                  amount={bookingData.totalPrice}
                  onPaymentComplete={handleMobileMoneyComplete}
                  onCancel={handleBack}
                />
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-soft-black">Guest Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-gray">Name</p>
                  <p className="font-medium">
                    {bookingData.firstName} {bookingData.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-slate-gray">Email</p>
                  <p className="font-medium">{bookingData.email}</p>
                </div>
                <div>
                  <p className="text-slate-gray">Phone</p>
                  <p className="font-medium">{bookingData.phone}</p>
                </div>
                {bookingData.specialRequests && (
                  <div className="col-span-2">
                    <p className="text-slate-gray">Special Requests</p>
                    <p className="font-medium">{bookingData.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-soft-black">Booking Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-gray">Hotel</p>
                  <p className="font-medium">{hotel.name}</p>
                </div>
                <div>
                  <p className="text-slate-gray">Room Type</p>
                  <p className="font-medium">{selectedRoom.name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-slate-gray" />
                  <div>
                    <p className="text-slate-gray">Check-in</p>
                    <p className="font-medium">{checkIn}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-slate-gray" />
                  <div>
                    <p className="text-slate-gray">Check-out</p>
                    <p className="font-medium">{checkOut}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-slate-gray" />
                  <div>
                    <p className="text-slate-gray">Guests</p>
                    <p className="font-medium">{guests} guests</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-soft-black">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-gray">Room rate</span>
                  <span>
                    ${selectedRoom.price} × {calculateNights()} nights
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-gray">Taxes & fees</span>
                  <span>Included</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-royal-blue">${bookingData.totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-soft-black">Payment Method</h3>
              <div className="flex items-center space-x-2">
                {bookingData.paymentMethod === "credit-card" && (
                  <>
                    <CreditCardIcon className="h-5 w-5 text-slate-gray" />
                    <div>
                      <p className="font-medium">Credit Card ending in {bookingData.cardNumber.slice(-4) || "****"}</p>
                      <p className="text-sm text-slate-gray">{bookingData.cardName || "Card Holder"}</p>
                    </div>
                  </>
                )}
                {bookingData.paymentMethod === "mobile-money" && (
                  <>
                    <Smartphone className="h-5 w-5 text-slate-gray" />
                    <div>
                      <p className="font-medium">Mobile Money</p>
                      <p className="text-sm text-slate-gray">Transaction ID: {bookingData.mobileMoneyTransactionId}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <a href="/terms" className="text-royal-blue hover:underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-royal-blue hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleBookingSubmit}
                disabled={isLoading}
                className="bg-royal-blue hover:bg-royal-blue/90"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Processing...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  function calculateNights() {
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    return Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {currentStep === 1 && "Guest Information"}
          {currentStep === 2 && "Payment Details"}
          {currentStep === 3 && "Review & Confirm"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center w-full">
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                currentStep >= 1 ? "bg-royal-blue text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              {currentStep > 1 ? <Check className="h-5 w-5" /> : 1}
            </div>
            <div className={`flex-1 h-1 ${currentStep > 1 ? "bg-royal-blue" : "bg-slate-200"}`}></div>
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                currentStep >= 2 ? "bg-royal-blue text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              {currentStep > 2 ? <Check className="h-5 w-5" /> : 2}
            </div>
            <div className={`flex-1 h-1 ${currentStep > 2 ? "bg-royal-blue" : "bg-slate-200"}`}></div>
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                currentStep >= 3 ? "bg-royal-blue text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* Step Content */}
        {renderStepContent()}
      </CardContent>
    </Card>
  )
}
