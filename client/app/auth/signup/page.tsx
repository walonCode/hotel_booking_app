"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthForm } from "@/components/auth/auth-form"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (data: any) => {
    setIsLoading(true)
    try {
      // Mock signup API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Signup data:", data)

      // Simulate successful signup
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "1",
          email: data.email,
          name: `${data.firstName} ${data.lastName}`,
        }),
      )

      router.push("/")
    } catch (error) {
      console.error("Signup failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthForm type="signup" onSubmit={handleSignup} isLoading={isLoading} />
      </div>
    </div>
  )
}
