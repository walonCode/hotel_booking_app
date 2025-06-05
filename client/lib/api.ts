// Mock API functions to simulate backend interactions

// Types
export type Hotel = {
  id: string
  name: string
  description: string
  location: {
    city: string
    country: string
    address: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  price: number
  rating: number
  images: string[]
  amenities: string[]
  roomTypes: RoomType[]
  reviews: Review[]
  verified?: boolean
  featured?: boolean
}

export type RoomType = {
  id: string
  name: string
  description: string
  price: number
  capacity: number
  amenities: string[]
  images: string[]
  available: boolean
}

export type Review = {
  id: string
  userId?: string
  userName?: string
  rating: number
  comment: string
  date?: string
  author?: string
}

export type Booking = {
  id: string
  hotelId: string
  hotelName: string
  roomId: string
  roomName: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: "confirmed" | "pending" | "cancelled"
  paymentStatus: "paid" | "pending" | "failed"
}

export type User = {
  id: string
  name: string
  email: string
  avatar?: string
  bookings: Booking[]
}

export type PaymentMethod = "orange_money" | "afri_money"

export type PaymentInitiateResponse = {
  success: boolean
  ussdCode?: string
  reference?: string
  error?: string
}

export type SearchFilters = {
  location: string
  priceRange: [number, number]
  rating: number
  amenities: string[]
}

// Mock data for Sierra Leone hotels
const mockHotels: Hotel[] = [
  {
    id: "1",
    name: "Radisson Blu Mammy Yoko Hotel",
    description: "Luxury beachfront hotel in Aberdeen with stunning ocean views and world-class amenities.",
    location: {
      city: "Freetown",
      country: "Sierra Leone",
      address: "Aberdeen Beach, Freetown",
    },
    images: ["/placeholder.svg?height=400&width=600"],
    price: 180,
    rating: 4.5,
    amenities: ["Free WiFi", "Pool", "Restaurant", "Parking", "Beach Access"],
    roomTypes: [
      {
        id: "1",
        name: "Standard Room",
        description: "",
        capacity: 2,
        price: 180,
        amenities: [],
        images: [],
        available: true,
      },
      {
        id: "2",
        name: "Ocean View Suite",
        description: "",
        capacity: 4,
        price: 280,
        amenities: [],
        images: [],
        available: true,
      },
    ],
    reviews: [{ id: "1", rating: 5, comment: "Excellent service and beautiful location", author: "John D." }],
    verified: true,
    featured: true,
  },
  {
    id: "2",
    name: "Country Lodge Hotel",
    description: "Comfortable accommodation in the heart of Freetown with modern facilities.",
    location: {
      city: "Freetown",
      country: "Sierra Leone",
      address: "Hill Station Road, Freetown",
    },
    images: ["/placeholder.svg?height=400&width=600"],
    price: 120,
    rating: 4.2,
    amenities: ["Free WiFi", "Restaurant", "Parking", "Business Center"],
    roomTypes: [
      {
        id: "3",
        name: "Standard Room",
        description: "",
        capacity: 2,
        price: 120,
        amenities: [],
        images: [],
        available: true,
      },
      {
        id: "4",
        name: "Executive Suite",
        description: "",
        capacity: 3,
        price: 180,
        amenities: [],
        images: [],
        available: true,
      },
    ],
    reviews: [{ id: "2", rating: 4, comment: "Great location and friendly staff", author: "Sarah M." }],
    verified: true,
  },
  {
    id: "3",
    name: "Bo Heritage Hotel",
    description: "Historic hotel in Bo with traditional Sierra Leonean charm and modern comfort.",
    location: {
      city: "Bo",
      country: "Sierra Leone",
      address: "Damballa Road, Bo",
    },
    images: ["/placeholder.svg?height=400&width=600"],
    price: 85,
    rating: 4.0,
    amenities: ["Free WiFi", "Restaurant", "Cultural Tours"],
    roomTypes: [
      {
        id: "5",
        name: "Heritage Room",
        description: "",
        capacity: 2,
        price: 85,
        amenities: [],
        images: [],
        available: true,
      },
      {
        id: "6",
        name: "Family Room",
        description: "",
        capacity: 4,
        price: 140,
        amenities: [],
        images: [],
        available: true,
      },
    ],
    reviews: [{ id: "3", rating: 4, comment: "Authentic experience with great hospitality", author: "Ahmed K." }],
    verified: true,
  },
]

export async function getHotels(filters?: Partial<SearchFilters>): Promise<Hotel[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  let filteredHotels = [...mockHotels]

  if (filters?.location) {
    const location = filters.location.toLowerCase()
    filteredHotels = filteredHotels.filter(
      (hotel) =>
        hotel.location.city.toLowerCase().includes(location) ||
        hotel.location.country.toLowerCase().includes(location) ||
        hotel.name.toLowerCase().includes(location),
    )
  }

  if (filters?.priceRange) {
    const [min, max] = filters.priceRange
    filteredHotels = filteredHotels.filter((hotel) => hotel.price >= min && hotel.price <= max)
  }

  if (filters?.rating) {
    filteredHotels = filteredHotels.filter((hotel) => hotel.rating >= filters.rating)
  }

  if (filters?.amenities && filters.amenities.length > 0) {
    filteredHotels = filteredHotels.filter((hotel) =>
      filters.amenities!.some((amenity) => hotel.amenities.includes(amenity)),
    )
  }

  return filteredHotels
}

export async function getHotelById(id: string): Promise<Hotel | null> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockHotels.find((hotel) => hotel.id === id) || null
}

export async function getRoomsByHotelId(hotelId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const hotel = mockHotels.find((h) => h.id === hotelId)

  if (!hotel) {
    throw new Error("Hotel not found")
  }

  return hotel.roomTypes
}

export async function createBooking(bookingData: {
  hotelId: string
  roomId: string
  checkIn: string
  checkOut: string
  guests: number
  userId: string
}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const hotel = mockHotels.find((h) => h.id === bookingData.hotelId)
  if (!hotel) {
    throw new Error("Hotel not found")
  }

  const room = hotel.roomTypes.find((r) => r.id === bookingData.roomId)
  if (!room) {
    throw new Error("Room not found")
  }

  // Calculate number of nights
  const checkIn = new Date(bookingData.checkIn)
  const checkOut = new Date(bookingData.checkOut)
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))

  const totalPrice = room.price * nights

  const booking: Booking = {
    id: `b${Date.now()}`,
    hotelId: hotel.id,
    hotelName: hotel.name,
    roomId: room.id,
    roomName: room.name,
    checkIn: bookingData.checkIn,
    checkOut: bookingData.checkOut,
    guests: bookingData.guests,
    totalPrice,
    status: "pending",
    paymentStatus: "pending",
  }

  return booking
}

export async function getUserProfile(userId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  // In a real app, we would fetch the user by ID
  // For now, just return our mock user
  const mockUser: User = {
    id: "user1",
    name: "Abdul Rahman",
    email: "abdul.rahman@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
    bookings: [
      {
        id: "b1",
        hotelId: "1",
        hotelName: "Radisson Blu Mammy Yoko Hotel",
        roomId: "1",
        roomName: "Standard Room",
        checkIn: "2023-07-15",
        checkOut: "2023-07-20",
        guests: 2,
        totalPrice: 900,
        status: "confirmed",
        paymentStatus: "paid",
      },
      {
        id: "b2",
        hotelId: "3",
        hotelName: "Bo Heritage Hotel",
        roomId: "5",
        roomName: "Heritage Room",
        checkIn: "2023-12-24",
        checkOut: "2023-12-28",
        guests: 2,
        totalPrice: 320,
        status: "confirmed",
        paymentStatus: "paid",
      },
      {
        id: "b3",
        hotelId: "2",
        hotelName: "Country Lodge Hotel",
        roomId: "3",
        roomName: "Standard Room",
        checkIn: "2024-03-10",
        checkOut: "2024-03-15",
        guests: 1,
        totalPrice: 600,
        status: "pending",
        paymentStatus: "pending",
      },
    ],
  }
  return mockUser
}

export async function initiatePayment(data: {
  bookingId: string
  amount: number
  paymentMethod: PaymentMethod
  phoneNumber: string
}): Promise<PaymentInitiateResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulate successful payment initiation for Sierra Leone mobile money
  return {
    success: true,
    ussdCode: data.paymentMethod === "orange_money" ? "*144*4*6*1#" : "*555*1*1#",
    reference: `SL-REF-${Date.now()}`,
  }
}

export async function verifyPayment(reference: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate successful payment verification (90% success rate)
  const isSuccessful = Math.random() > 0.1

  return {
    success: isSuccessful,
    status: isSuccessful ? "paid" : "failed",
    message: isSuccessful ? "Payment successful" : "Payment failed",
  }
}

export async function sendChatMessage(message: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const botResponses = [
    "I can help you find the perfect accommodation in Sierra Leone. Which city are you planning to visit?",
    "We have excellent options in Freetown, Bo, Kenema, and other cities. Are you looking for any specific amenities?",
    "Based on your preferences, I'd recommend checking out Radisson Blu Mammy Yoko or Country Lodge Hotel in Freetown!",
    "You can use our search filters to find accommodations by location, price, and amenities across Sierra Leone.",
    "For the best rates in Sierra Leone, I recommend booking directly through our platform. We support Orange Money and Afri Money payments.",
  ]

  return {
    message: botResponses[Math.floor(Math.random() * botResponses.length)],
    timestamp: new Date().toISOString(),
  }
}
