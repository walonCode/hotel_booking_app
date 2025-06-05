"use client"

import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const router = useRouter()

  const handleComplete = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center p-4">
      <OnboardingWizard onComplete={handleComplete} />
    </div>
  )
}
