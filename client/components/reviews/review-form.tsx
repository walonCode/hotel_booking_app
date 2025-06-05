"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Star } from "lucide-react"
import { api } from "@/lib/api"

interface ReviewFormProps {
  hotelId: string
  onReviewSubmitted: () => void
}

export function ReviewForm({ hotelId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    if (comment.trim().length < 10) {
      setError("Please provide a comment (minimum 10 characters)")
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      await api.createReview({
        hotelId,
        customerName: "John Doe", // In a real app, get from auth
        rating,
        comment,
      })

      setRating(0)
      setComment("")
      onReviewSubmitted()
    } catch (error) {
      console.error("Failed to submit review:", error)
      setError("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-soft-black mb-2">Your Rating</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= (hoverRating || rating) ? "fill-warm-gold text-warm-gold" : "text-slate-300"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-slate-gray">
            {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-soft-black mb-2">
          Your Review
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience at this hotel..."
          rows={4}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" disabled={isSubmitting} className="bg-royal-blue hover:bg-royal-blue/90">
        {isSubmitting ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </Button>
    </form>
  )
}
