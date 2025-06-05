import type { ApiResponse } from "./types"

interface SearchFilters {
  [key: string]: any
}

interface PaymentRequest {
  amount: number
  currency: string
  paymentMethod: string
}

class ApiClient {
  private baseUrl: string
  private apiKey?: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
    this.apiKey = process.env.NEXT_PUBLIC_API_KEY
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`
    }

    // Add auth token if available
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("API request failed:", error)
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: error instanceof Error ? error.message : "Network request failed",
        },
      }
    }
  }

  // Hotels
  async getHotels(filters?: Partial<SearchFilters>) {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            params.append(key, value.join(","))
          } else {
            params.append(key, value.toString())
          }
        }
      })
    }

    return this.request(`/hotels?${params.toString()}`)
  }

  async getHotel(id: string) {
    return this.request(`/hotels/${id}`)
  }

  async searchHotels(query: string) {
    return this.request(`/hotels/search?q=${encodeURIComponent(query)}`)
  }

  // Bookings
  async createBooking(bookingData: any) {
    return this.request("/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    })
  }

  async getBookings(userId?: string) {
    const endpoint = userId ? `/bookings?userId=${userId}` : "/bookings"
    return this.request(endpoint)
  }

  async getBooking(id: string) {
    return this.request(`/bookings/${id}`)
  }

  async cancelBooking(id: string) {
    return this.request(`/bookings/${id}/cancel`, {
      method: "POST",
    })
  }

  // Payments
  async initiatePayment(paymentData: PaymentRequest) {
    return this.request("/payments/initiate", {
      method: "POST",
      body: JSON.stringify(paymentData),
    })
  }

  async verifyPayment(transactionId: string) {
    return this.request(`/payments/verify/${transactionId}`)
  }

  async getPaymentMethods() {
    return this.request("/payments/methods")
  }

  // User
  async getProfile() {
    return this.request("/user/profile")
  }

  async updateProfile(profileData: any) {
    return this.request("/user/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    })
  }

  // Auth
  async login(credentials: { email: string; password: string }) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async register(userData: any) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    })
  }

  async refreshToken() {
    return this.request("/auth/refresh", {
      method: "POST",
    })
  }

  // Reviews
  async getReviews(hotelId: string) {
    return this.request(`/hotels/${hotelId}/reviews`)
  }

  async createReview(hotelId: string, reviewData: any) {
    return this.request(`/hotels/${hotelId}/reviews`, {
      method: "POST",
      body: JSON.stringify(reviewData),
    })
  }
}

export const apiClient = new ApiClient()
