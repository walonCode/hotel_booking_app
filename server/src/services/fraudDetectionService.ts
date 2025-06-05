import { Booking } from '../models/Booking';
import { User } from '../models/User';

interface FraudCheckResult {
  isSuspicious: boolean;
  reason?: string;
  riskScore: number;
}

export const checkForFraud = async (bookingData: any): Promise<FraudCheckResult> => {
  const riskFactors: string[] = [];
  let riskScore = 0;

  // Check user history
  const userHistory = await getUserBookingHistory(bookingData.userId);
  
  // Multiple bookings in short time
  if (userHistory.recentBookingsCount > 3) {
    riskFactors.push('Multiple bookings in 24 hours');
    riskScore += 30;
  }

  // Payment pattern check
  if (await hasUnusualPaymentPattern(bookingData.userId)) {
    riskFactors.push('Unusual payment pattern');
    riskScore += 25;
  }

  // Location mismatch
  if (await hasLocationMismatch(bookingData)) {
    riskFactors.push('Location mismatch');
    riskScore += 20;
  }

  return {
    isSuspicious: riskScore >= 50,
    reason: riskFactors.join(', '),
    riskScore
  };
};

async function getUserBookingHistory(userId: string) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  const recentBookingsCount = await Booking.countDocuments({
    user: userId,
    createdAt: { $gte: twentyFourHoursAgo }
  });

  return { recentBookingsCount };
}

async function hasUnusualPaymentPattern(userId: string): Promise<boolean> {
  const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 }).limit(5);
  
  // Check for rapid successive bookings with high values
  let unusualPattern = false;
  for (let i = 1; i < bookings.length; i++) {
    const timeDiff = bookings[i-1].createdAt.getTime() - bookings[i].createdAt.getTime();
    if (timeDiff < 3600000 && bookings[i].totalPrice > 1000) { // 1 hour and $1000
      unusualPattern = true;
      break;
    }
  }
  
  return unusualPattern;
}

async function hasLocationMismatch(bookingData: any): Promise<boolean> {
  // Compare user's typical booking locations with current booking
  // This is a simplified version - you would typically use more sophisticated location checking
  const userBookings = await Booking.find({ user: bookingData.userId })
    .populate('room')
    .limit(5);

  if (userBookings.length < 2) return false;

  // Check if current booking location is significantly different from previous patterns
  // This is a simplified check - you would typically use proper geocoding and distance calculations
  const previousLocations = new Set(userBookings.map(booking => booking.room.hotel.toString()));
  return !previousLocations.has(bookingData.hotelId);
}