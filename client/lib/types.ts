// Core types for the application
export interface Location {
  city: string
  country: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface RoomType {
  id: string
  name: string
  description: string
  price: number
  capacity: number
  amenities: string[]
  images: string[]
  available: boolean
  beds: {
    type: string
    count: number
  }[]
  size: number // in square meters
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  date: string
  helpful: number
  verified: boolean
}

export interface Hotel {
  id: string
  name: string
  description: string
  location: {
    city: string
    country: string
    address: string
  }
  images: string[]
  price: number
  rating: number
  amenities: string[]
  roomTypes: Array<{
    id: string
    name: string
    capacity: number
    price: number
  }>
  reviews: Array<{
    id: string
    rating: number
    comment: string
    author: string
  }>
  verified?: boolean
  featured?: boolean
}

export interface Booking {
  id: string
  hotelId: string
  userId: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  updatedAt: string
  specialRequests?: string
  guestInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  dateOfBirth?: string
  preferences: {
    currency: string
    language: string
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
  }
  verified: boolean
  createdAt: string
}

export interface SearchFilters {
  location: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
  priceRange: [number, number]
  amenities: string[]
  rating: number
  sortBy: string
  propertyType: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface PaymentMethod {
  id: string
  type: "orange_money" | "afri_money" | "card"
  name: string
  icon: string
  enabled: boolean
}

export interface PaymentRequest {
  bookingId: string
  amount: number
  paymentMethodId: string
  phoneNumber?: string
  returnUrl?: string
}

export interface PaymentResponse {
  success: boolean
  transactionId?: string
  ussdCode?: string
  redirectUrl?: string
  reference?: string
  error?: string
}
