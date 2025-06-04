import { Hotel } from "../models/Hotel";
import { Booking } from '../models/Booking';

interface RecommendationFactors {
  priceRange: number[];
  location: string;
  amenities: string[];
  rating: number;
}

export const generateRecommendations = async (userId: string) => {
  try {
    // Get user's booking history
    const userBookings = await Booking.find({ user: userId })
      .populate('hotel')
      .sort({ createdAt: -1 });

    // Extract user preferences
    const preferences: RecommendationFactors = {
      priceRange: [0, 0],
      location: '',
      amenities: [],
      rating: 0
    };

    if (userBookings.length > 0) {
      // Calculate average price range
      const prices = userBookings.map(booking => booking.totalPrice);
      preferences.priceRange = [
        Math.min(...prices) * 0.8,
        Math.max(...prices) * 1.2
      ];

      // Get most frequent location
      const locations = userBookings.map(booking => (booking.hotel as any).address.city);
      preferences.location = getMostFrequent(locations);

      // Collect preferred amenities
      const allAmenities = userBookings.flatMap(booking => (booking.hotel as any).amenities);
      preferences.amenities = getTopNFrequent(allAmenities, 5);

      // Calculate average preferred rating
      preferences.rating = userBookings.reduce((acc, booking) => 
        acc + (booking.hotel as any).rating, 0) / userBookings.length;
    }

    // Find hotels matching preferences
    const recommendedHotels = await Hotel.find({
      'address.city': preferences.location || { $exists: true },
      amenities: { $in: preferences.amenities },
      rating: { $gte: preferences.rating || 0 }
    }).limit(10);

    return recommendedHotels;
  } catch (error) {
    throw new Error('Failed to generate recommendations');
  }
};

// Helper functions
function getMostFrequent(arr: any[]) {
  return arr.sort((a, b) =>
    arr.filter(v => v === a).length - arr.filter(v => v === b).length
  ).pop();
}

function getTopNFrequent(arr: any[], n: number) {
  const frequency = arr.reduce((acc: any, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(frequency)
    .sort(([,a]: any, [,b]: any) => b - a)
    .slice(0, n)
    .map(([item]) => item);
}