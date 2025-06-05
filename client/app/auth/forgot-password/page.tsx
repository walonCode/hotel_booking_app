"use client"

import { useState } from "react"
import { AuthForm } from "@/components/auth/auth-form"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleForgotPassword = async (data: any) => {
    setIsLoading(true)
    try {
      // Mock forgot password API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Forgot password data:", data)
      setEmailSent(true)
    } catch (error) {
      console.error("Forgot password failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-emerald-green mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-soft-black mb-2">Check Your Email</h2>
            <p className="text-slate-gray mb-6">
              We've sent a password reset link to your email address. Please check your inbox and follow the
              instructions.
            </p>
            <p className="text-sm text-slate-gray">Didn't receive the email? Check your spam folder or try again.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthForm type="forgot-password" onSubmit={handleForgotPassword} isLoading={isLoading} />
      </div>
    </div>
  )
}
