// Mock API functions for the booking platform

export interface Hotel {
  id: string
  name: string
  description: string
  location: string
  city: string
  rating: number
  reviewCount: number
  pricePerNight: number
  images: string[]
  amenities: string[]
  roomTypes: RoomType[]
  coordinates: { lat: number; lng: number }
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
}

export interface Booking {
  id: string
  hotelId: string
  hotelName: string
  roomType: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: "confirmed" | "pending" | "cancelled"
  customerName: string
  customerEmail: string
}

export interface Review {
  id: string
  hotelId: string
  customerName: string
  rating: number
  comment: string
  date: string
}

// Mock data
const mockHotels: Hotel[] = [
  {
    id: "1",
    name: "Freetown Grand Hotel",
    description: "Luxury hotel in the heart of Freetown with stunning ocean views and world-class amenities.",
    location: "Aberdeen, Freetown",
    city: "Freetown",
    rating: 4.8,
    reviewCount: 124,
    pricePerNight: 150,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    amenities: ["WiFi", "Pool", "Restaurant", "Spa", "Gym", "Beach Access"],
    coordinates: { lat: 8.4657, lng: -13.2317 },
    roomTypes: [
      {
        id: "1-1",
        name: "Deluxe Ocean View",
        description: "Spacious room with panoramic ocean views",
        price: 150,
        capacity: 2,
        amenities: ["Ocean View", "King Bed", "Mini Bar", "Balcony"],
        images: ["/placeholder.svg?height=300&width=400"],
        available: true,
      },
      {
        id: "1-2",
        name: "Executive Suite",
        description: "Luxurious suite with separate living area",
        price: 250,
        capacity: 4,
        amenities: ["Ocean View", "Living Room", "Kitchenette", "Balcony"],
        images: ["/placeholder.svg?height=300&width=400"],
        available: true,
      },
    ],
  },
  {
    id: "2",
    name: "Bo Heritage Lodge",
    description: "Charming eco-friendly lodge showcasing Sierra Leone's natural beauty and cultural heritage.",
    location: "Bo Town Center",
    city: "Bo",
    rating: 4.5,
    reviewCount: 89,
    pricePerNight: 80,
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    amenities: ["WiFi", "Restaurant", "Garden", "Cultural Tours", "Local Cuisine"],
    coordinates: { lat: 7.9644, lng: -11.7383 },
    roomTypes: [
      {
        id: "2-1",
        name: "Traditional Room",
        description: "Authentic room with local craftsmanship",
        price: 80,
        capacity: 2,
        amenities: ["Garden View", "Queen Bed", "Local Art", "Fan"],
        images: ["/placeholder.svg?height=300&width=400"],
        available: true,
      },
    ],
  },
  {
    id: "3",
    name: "Kenema Guesthouse",
    description: "Comfortable guesthouse perfect for business travelers and tourists exploring the Eastern Province.",
    location: "Kenema City Center",
    city: "Kenema",
    rating: 4.2,
    reviewCount: 56,
    pricePerNight: 60,
    images: ["/placeholder.svg?height=400&width=600"],
    amenities: ["WiFi", "Restaurant", "Conference Room", "Laundry", "Airport Transfer"],
    coordinates: { lat: 7.8767, lng: -11.19 },
    roomTypes: [
      {
        id: "3-1",
        name: "Standard Room",
        description: "Clean and comfortable standard accommodation",
        price: 60,
        capacity: 2,
        amenities: ["City View", "Double Bed", "Desk", "AC"],
        images: ["/placeholder.svg?height=300&width=400"],
        available: true,
      },
    ],
  },
  {
    id: "4",
    name: "Makeni Business Hotel",
    description: "Modern business hotel with excellent facilities for corporate travelers and conferences.",
    location: "Makeni Central",
    city: "Makeni",
    rating: 4.3,
    reviewCount: 72,
    pricePerNight: 90,
    images: ["/placeholder.svg?height=400&width=600"],
    amenities: ["WiFi", "Business Center", "Conference Rooms", "Restaurant", "Gym"],
    coordinates: { lat: 8.8833, lng: -12.05 },
    roomTypes: [
      {
        id: "4-1",
        name: "Business Room",
        description: "Professional room with work facilities",
        price: 90,
        capacity: 2,
        amenities: ["City View", "Work Desk", "High-Speed WiFi", "AC"],
        images: ["/placeholder.svg?height=300&width=400"],
        available: true,
      },
    ],
  },
]

const mockBookings: Booking[] = [
  {
    id: "b1",
    hotelId: "1",
    hotelName: "Freetown Grand Hotel",
    roomType: "Deluxe Ocean View",
    checkIn: "2024-07-15",
    checkOut: "2024-07-18",
    guests: 2,
    totalPrice: 450,
    status: "confirmed",
    customerName: "John Doe",
    customerEmail: "john@example.com",
  },
  {
    id: "b2",
    hotelId: "2",
    hotelName: "Bo Heritage Lodge",
    roomType: "Traditional Room",
    checkIn: "2024-08-01",
    checkOut: "2024-08-03",
    guests: 2,
    totalPrice: 160,
    status: "pending",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
  },
]

const mockReviews: Review[] = [
  {
    id: "r1",
    hotelId: "1",
    customerName: "Alice Johnson",
    rating: 5,
    comment:
      "Absolutely stunning hotel with incredible ocean views. The staff was exceptional and the amenities were top-notch.",
    date: "2024-06-15",
  },
  {
    id: "r2",
    hotelId: "1",
    customerName: "Bob Wilson",
    rating: 4,
    comment: "Great location and beautiful rooms. The restaurant food was delicious. Highly recommend!",
    date: "2024-06-10",
  },
  {
    id: "r3",
    hotelId: "2",
    customerName: "Carol Brown",
    rating: 5,
    comment: "Loved the authentic cultural experience. The lodge perfectly showcases Sierra Leone's heritage.",
    date: "2024-05-20",
  },
]

// API functions with simulated delays
export const api = {
  // Hotels
  async getHotels(filters?: {
    city?: string
    minPrice?: number
    maxPrice?: number
    rating?: number
    amenities?: string[]
  }): Promise<Hotel[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filteredHotels = [...mockHotels]

    if (filters) {
      if (filters.city) {
        filteredHotels = filteredHotels.filter((hotel) =>
          hotel.city.toLowerCase().includes(filters.city!.toLowerCase()),
        )
      }
      if (filters.minPrice) {
        filteredHotels = filteredHotels.filter((hotel) => hotel.pricePerNight >= filters.minPrice!)
      }
      if (filters.maxPrice) {
        filteredHotels = filteredHotels.filter((hotel) => hotel.pricePerNight <= filters.maxPrice!)
      }
      if (filters.rating) {
        filteredHotels = filteredHotels.filter((hotel) => hotel.rating >= filters.rating!)
      }
      if (filters.amenities && filters.amenities.length > 0) {
        filteredHotels = filteredHotels.filter((hotel) =>
          filters.amenities!.some((amenity) => hotel.amenities.includes(amenity)),
        )
      }
    }

    return filteredHotels
  },

  async getHotelById(id: string): Promise<Hotel | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockHotels.find((hotel) => hotel.id === id) || null
  },

  async getRecommendedHotels(userId?: string): Promise<Hotel[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    // AI-powered recommendations (mock)
    return mockHotels.slice(0, 3)
  },

  // Bookings
  async createBooking(booking: Omit<Booking, "id" | "status">): Promise<Booking> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const newBooking: Booking = {
      ...booking,
      id: `b${Date.now()}`,
      status: "confirmed",
    }
    mockBookings.push(newBooking)
    return newBooking
  },

  async getBookings(userId?: string): Promise<Booking[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return mockBookings
  },

  async getBookingById(id: string): Promise<Booking | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockBookings.find((booking) => booking.id === id) || null
  },

  // Reviews
  async getReviews(hotelId: string): Promise<Review[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockReviews.filter((review) => review.hotelId === hotelId)
  },

  async createReview(review: Omit<Review, "id" | "date">): Promise<Review> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newReview: Review = {
      ...review,
      id: `r${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    }
    mockReviews.push(newReview)
    return newReview
  },

  // AI Features
  async getAIRecommendations(preferences: {
    budget?: number
    location?: string
    amenities?: string[]
  }): Promise<Hotel[]> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    // Mock AI recommendations based on preferences
    return mockHotels
      .filter((hotel) => {
        if (preferences.budget && hotel.pricePerNight > preferences.budget) return false
        if (preferences.location && !hotel.location.toLowerCase().includes(preferences.location.toLowerCase()))
          return false
        return true
      })
      .slice(0, 4)
  },

  async getChatbotResponse(message: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const responses = {
      greeting: "Hello! Welcome to Sierra Leone's premier hotel booking platform. How can I assist you today?",
      booking:
        "I'd be happy to help you with your booking. What dates are you looking for and which city would you like to stay in?",
      recommendations:
        "Based on your preferences, I recommend checking out our featured hotels in Freetown, Bo, and Kenema. Would you like me to show you some options?",
      default:
        "I'm here to help with hotel bookings, recommendations, and any questions about accommodations in Sierra Leone. What would you like to know?",
    }

    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return responses.greeting
    } else if (lowerMessage.includes("book") || lowerMessage.includes("reservation")) {
      return responses.booking
    } else if (lowerMessage.includes("recommend") || lowerMessage.includes("suggest")) {
      return responses.recommendations
    } else {
      return responses.default
    }
  },
}
