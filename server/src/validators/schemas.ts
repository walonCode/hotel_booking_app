import { z } from 'zod';

// User validation schemas
export const userRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['user', 'hotel_owner', 'admin']).optional()
});

export const userLoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string()
});

// Hotel validation schemas
export const hotelSchema = z.object({
  name: z.string().min(2, 'Hotel name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipCode: z.string()
  }),
  images: z.array(z.string().url('Invalid image URL')).optional(),
  amenities: z.array(z.string()).optional()
});

// Room validation schemas
export const roomSchema = z.object({
  name: z.string().min(2, 'Room name must be at least 2 characters'),
  type: z.string(),
  price: z.number().positive('Price must be positive'),
  capacity: z.number().int().positive('Capacity must be a positive integer'),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string().url('Invalid image URL')).optional()
});

// Booking validation schemas
export const bookingSchema = z.object({
  roomId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid room ID'),
  checkIn: z.string().datetime('Invalid check-in date'),
  checkOut: z.string().datetime('Invalid check-out date'),
  guests: z.number().int().positive('Number of guests must be positive')
}).refine(data => {
  const checkIn = new Date(data.checkIn);
  const checkOut = new Date(data.checkOut);
  return checkOut > checkIn;
}, {
  message: 'Check-out date must be after check-in date',
  path: ['checkOut']
});

// Review validation schema
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  comment: z.string().min(5, 'Comment must be at least 5 characters')
});