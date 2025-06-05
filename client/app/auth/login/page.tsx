"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthForm } from "@/components/auth/auth-form"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (data: any) => {
    setIsLoading(true)
    try {
      // Mock login API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Login data:", data)

      // Simulate successful login
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "1",
          email: data.email,
          name: "John Doe",
        }),
      )

      router.push("/")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthForm type="login" onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </div>
  )
}
