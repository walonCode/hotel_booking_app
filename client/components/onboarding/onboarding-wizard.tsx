"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Check, ChevronLeft, ChevronRight, Heart, MapPin, Calendar, Users } from "lucide-react"
import { useRouter } from "next/navigation"

interface OnboardingWizardProps {
  onComplete?: () => void
}

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [preferences, setPreferences] = useState({
    travelPurpose: "",
    preferredDestinations: [] as string[],
    budget: "",
    amenities: [] as string[],
    travelStyle: "",
    notificationPreferences: {
      email: true,
      sms: false,
      push: true,
    },
  })

  const totalSteps = 4

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      // Mock API call to save preferences
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Saved preferences:", preferences)

      // Call onComplete callback or redirect
      if (onComplete) {
        onComplete()
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error("Failed to save preferences:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    if (onComplete) {
      onComplete()
    } else {
      router.push("/")
    }
  }

  const updatePreference = (category: string, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: value,
    }))
  }

  const toggleDestination = (destination: string) => {
    setPreferences((prev) => {
      const current = [...prev.preferredDestinations]
      if (current.includes(destination)) {
        return {
          ...prev,
          preferredDestinations: current.filter((d) => d !== destination),
        }
      } else {
        return {
          ...prev,
          preferredDestinations: [...current, destination],
        }
      }
    })
  }

  const toggleAmenity = (amenity: string) => {
    setPreferences((prev) => {
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

  const updateNotificationPreference = (channel: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [channel]: value,
      },
    }))
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-soft-black mb-2">Welcome to SierraStay!</h2>
              <p className="text-slate-gray">Tell us why you're traveling to Sierra Leone</p>
            </div>

            <RadioGroup
              value={preferences.travelPurpose}
              onValueChange={(value) => updatePreference("travelPurpose", value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                { value: "leisure", label: "Leisure & Vacation", icon: Heart },
                { value: "business", label: "Business Trip", icon: Users },
                { value: "exploration", label: "Exploration & Adventure", icon: MapPin },
                { value: "local", label: "I'm a local resident", icon: Calendar },
              ].map((item) => (
                <div key={item.value} className="relative">
                  <RadioGroupItem value={item.value} id={item.value} className="peer sr-only" />
                  <Label
                    htmlFor={item.value}
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-white p-4 hover:bg-slate-50 hover:border-slate-200 peer-data-[state=checked]:border-royal-blue [&:has([data-state=checked])]:border-royal-blue cursor-pointer"
                  >
                    <item.icon className="mb-2 h-6 w-6 text-royal-blue" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-soft-black mb-2">Where would you like to stay?</h2>
              <p className="text-slate-gray">Select your preferred destinations in Sierra Leone</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Freetown", "Bo", "Kenema", "Makeni", "Koidu", "Bonthe", "Port Loko", "Lungi", "Kabala"].map(
                (destination) => (
                  <div key={destination} className="flex items-center space-x-2">
                    <Checkbox
                      id={`destination-${destination}`}
                      checked={preferences.preferredDestinations.includes(destination)}
                      onCheckedChange={() => toggleDestination(destination)}
                    />
                    <Label htmlFor={`destination-${destination}`} className="text-sm">
                      {destination}
                    </Label>
                  </div>
                ),
              )}
            </div>

            <div className="space-y-4 pt-4">
              <Label htmlFor="budget">Your budget per night (USD)</Label>
              <RadioGroup
                value={preferences.budget}
                onValueChange={(value) => updatePreference("budget", value)}
                className="grid grid-cols-3 gap-3"
              >
                <div className="relative">
                  <RadioGroupItem value="economy" id="economy" className="peer sr-only" />
                  <Label
                    htmlFor="economy"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-white p-2 hover:bg-slate-50 hover:border-slate-200 peer-data-[state=checked]:border-royal-blue [&:has([data-state=checked])]:border-royal-blue cursor-pointer"
                  >
                    <span className="text-sm font-medium">Economy</span>
                    <span className="text-xs text-slate-gray">$30-80</span>
                  </Label>
                </div>
                <div className="relative">
                  <RadioGroupItem value="standard" id="standard" className="peer sr-only" />
                  <Label
                    htmlFor="standard"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-white p-2 hover:bg-slate-50 hover:border-slate-200 peer-data-[state=checked]:border-royal-blue [&:has([data-state=checked])]:border-royal-blue cursor-pointer"
                  >
                    <span className="text-sm font-medium">Standard</span>
                    <span className="text-xs text-slate-gray">$80-150</span>
                  </Label>
                </div>
                <div className="relative">
                  <RadioGroupItem value="luxury" id="luxury" className="peer sr-only" />
                  <Label
                    htmlFor="luxury"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-white p-2 hover:bg-slate-50 hover:border-slate-200 peer-data-[state=checked]:border-royal-blue [&:has([data-state=checked])]:border-royal-blue cursor-pointer"
                  >
                    <span className="text-sm font-medium">Luxury</span>
                    <span className="text-xs text-slate-gray">$150+</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-soft-black mb-2">What amenities matter to you?</h2>
              <p className="text-slate-gray">Select the amenities you prefer in your accommodations</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                "WiFi",
                "Pool",
                "Restaurant",
                "Spa",
                "Gym",
                "Beach Access",
                "Air Conditioning",
                "Airport Transfer",
                "Room Service",
                "Business Center",
              ].map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={preferences.amenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <Label htmlFor={`amenity-${amenity}`} className="text-sm">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4">
              <Label>Your travel style</Label>
              <RadioGroup
                value={preferences.travelStyle}
                onValueChange={(value) => updatePreference("travelStyle", value)}
                className="grid grid-cols-1 gap-3"
              >
                {[
                  { value: "luxury", label: "Luxury - I prefer high-end accommodations with premium services" },
                  { value: "comfort", label: "Comfort - I like comfortable stays with good amenities" },
                  { value: "budget", label: "Budget - I'm looking for affordable options" },
                  { value: "adventure", label: "Adventure - I'm open to unique and authentic experiences" },
                ].map((style) => (
                  <div key={style.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={style.value} id={style.value} />
                    <Label htmlFor={style.value} className="text-sm">
                      {style.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-soft-black mb-2">Almost done!</h2>
              <p className="text-slate-gray">How would you like to receive updates and offers?</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="text-sm font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-xs text-slate-gray">Booking confirmations and travel tips</p>
                </div>
                <Checkbox
                  id="email-notifications"
                  checked={preferences.notificationPreferences.email}
                  onCheckedChange={(checked) => updateNotificationPreference("email", checked as boolean)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications" className="text-sm font-medium">
                    SMS Notifications
                  </Label>
                  <p className="text-xs text-slate-gray">Urgent updates and reminders</p>
                </div>
                <Checkbox
                  id="sms-notifications"
                  checked={preferences.notificationPreferences.sms}
                  onCheckedChange={(checked) => updateNotificationPreference("sms", checked as boolean)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications" className="text-sm font-medium">
                    Push Notifications
                  </Label>
                  <p className="text-xs text-slate-gray">App notifications for deals and updates</p>
                </div>
                <Checkbox
                  id="push-notifications"
                  checked={preferences.notificationPreferences.push}
                  onCheckedChange={(checked) => updateNotificationPreference("push", checked as boolean)}
                />
              </div>
            </div>

            <div className="pt-4 text-center">
              <p className="text-sm text-slate-gray">
                We'll use your preferences to personalize your experience. You can change these settings anytime in your
                profile.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  step > index + 1
                    ? "bg-royal-blue text-white"
                    : step === index + 1
                      ? "bg-royal-blue text-white"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {step > index + 1 ? <Check className="h-5 w-5" /> : index + 1}
              </div>
            ))}
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full">
            <div
              className="bg-royal-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <div>
            {step > 1 ? (
              <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            ) : (
              <Button variant="outline" onClick={handleSkip}>
                Skip
              </Button>
            )}
          </div>
          <Button onClick={handleNext} disabled={isLoading} className="bg-royal-blue hover:bg-royal-blue/90">
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Processing...
              </>
            ) : step === totalSteps ? (
              "Complete"
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
