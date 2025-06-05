"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Phone, AlertCircle, CheckCircle } from "lucide-react"

interface MobileMoneyPaymentProps {
  amount: number
  onPaymentComplete: (transactionId: string) => void
  onCancel: () => void
}

export function MobileMoneyPayment({ amount, onPaymentComplete, onCancel }: MobileMoneyPaymentProps) {
  const [provider, setProvider] = useState<"orange" | "africell" | "">("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [step, setStep] = useState<"select" | "verify" | "confirm">("select")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [transactionId, setTransactionId] = useState("")

  const handleSubmit = async () => {
    // Validate phone number - more flexible validation
    if (!phoneNumber.match(/^(?:\+232|0)[0-9]{8,9}$/)) {
      setError("Please enter a valid Sierra Leone phone number (e.g., +23279123456 or 079123456)")
      return
    }

    if (!provider) {
      setError("Please select a mobile money provider")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to initiate the mobile money payment
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a mock transaction ID
      const mockTransactionId = `MM${Date.now().toString().slice(-8)}`
      setTransactionId(mockTransactionId)

      // Move to verification step
      setStep("verify")
    } catch (error) {
      console.error("Payment initiation failed:", error)
      setError("Failed to initiate payment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async () => {
    if (!verificationCode || verificationCode.length < 4) {
      setError("Please enter the verification code sent to your phone")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      // In a real app, this would verify the code with the payment provider
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate verification success
      setStep("confirm")
    } catch (error) {
      console.error("Verification failed:", error)
      setError("Invalid verification code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirm = () => {
    onPaymentComplete(transactionId)
  }

  const formatPhoneNumber = (input: string) => {
    // Remove non-numeric characters
    const cleaned = input.replace(/\D/g, "")

    // Handle different input formats
    if (cleaned.startsWith("232")) {
      return `+${cleaned}`
    } else if (cleaned.startsWith("0")) {
      return cleaned
    } else if (cleaned.length > 0 && !cleaned.startsWith("232")) {
      return `0${cleaned}`
    }
    return cleaned
  }

  return (
    <div className="space-y-6">
      {step === "select" && (
        <>
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-soft-black mb-2">Mobile Money Payment</h3>
            <p className="text-slate-gray">Select your mobile money provider and enter your phone number</p>
          </div>

          <div className="space-y-4">
            <RadioGroup value={provider} onValueChange={(value) => setProvider(value as "orange" | "africell")}>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <RadioGroupItem value="orange" id="orange" className="peer sr-only" />
                  <Label
                    htmlFor="orange"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-white p-4 hover:bg-slate-50 hover:border-slate-200 peer-data-[state=checked]:border-royal-blue [&:has([data-state=checked])]:border-royal-blue cursor-pointer"
                  >
                    <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold mb-2">
                      OM
                    </div>
                    <span className="text-sm font-medium">Orange Money</span>
                  </Label>
                </div>
                <div className="relative">
                  <RadioGroupItem value="africell" id="africell" className="peer sr-only" />
                  <Label
                    htmlFor="africell"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-white p-4 hover:bg-slate-50 hover:border-slate-200 peer-data-[state=checked]:border-royal-blue [&:has([data-state=checked])]:border-royal-blue cursor-pointer"
                  >
                    <div className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mb-2">
                      AM
                    </div>
                    <span className="text-sm font-medium">Afri Money</span>
                  </Label>
                </div>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-gray" />
                <Input
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                  placeholder="+232 79 123 456"
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-slate-gray">Enter your mobile money registered number</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-slate-gray">Amount to pay:</span>
                <span className="font-bold text-soft-black">${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-slate-gray">Fee:</span>
                <span className="text-soft-black">$0.00</span>
              </div>
              <div className="border-t mt-2 pt-2 flex justify-between items-center">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-royal-blue">${amount.toFixed(2)}</span>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !provider || !phoneNumber}
                className="bg-royal-blue hover:bg-royal-blue/90"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Processing...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </div>
        </>
      )}

      {step === "verify" && (
        <>
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-soft-black mb-2">Verify Payment</h3>
            <p className="text-slate-gray">
              A verification code has been sent to {phoneNumber}. Please enter it below.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter code"
                className="text-center text-2xl tracking-widest"
                maxLength={6}
              />
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please check your phone for an SMS with the verification code. If you don't receive it within 2 minutes,
                you can request a new code.
              </AlertDescription>
            </Alert>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep("select")}>
                Back
              </Button>
              <Button
                onClick={handleVerify}
                disabled={isLoading || !verificationCode}
                className="bg-royal-blue hover:bg-royal-blue/90"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Verifying...
                  </>
                ) : (
                  "Verify Payment"
                )}
              </Button>
            </div>
          </div>
        </>
      )}

      {step === "confirm" && (
        <>
          <div className="text-center mb-6">
            <div className="h-16 w-16 bg-emerald-green rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-soft-black mb-2">Payment Successful!</h3>
            <p className="text-slate-gray">Your payment of ${amount.toFixed(2)} has been processed successfully.</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-gray">Transaction ID:</span>
              <span className="font-medium text-soft-black">{transactionId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-gray">Payment Method:</span>
              <span className="font-medium text-soft-black">
                {provider === "orange" ? "Orange Money" : "Afri Money"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-gray">Phone Number:</span>
              <span className="font-medium text-soft-black">{phoneNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-gray">Amount:</span>
              <span className="font-bold text-royal-blue">${amount.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button onClick={handleConfirm} className="bg-royal-blue hover:bg-royal-blue/90">
              Continue to Confirmation
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
