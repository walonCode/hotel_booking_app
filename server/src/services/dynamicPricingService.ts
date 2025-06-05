import { Room } from '../models/Room';
import { Booking } from '../models/Booking';

interface PricingFactors {
  basePrice: number;
  demand: number;
  seasonality: number;
  location: string;
}

export const calculateDynamicPrice = async (roomId: string): Promise<number> => {
  try {
    const room = await Room.findById(roomId);
    if (!room) throw new Error('Room not found');

    const factors: PricingFactors = {
      basePrice: room.price,
      demand: await calculateDemand(roomId),
      seasonality: calculateSeasonality(),
      location: room.hotel.toString()
    };

    const dynamicPrice = applyPricingAlgorithm(factors);
    return dynamicPrice;
  } catch (error) {
    throw new Error('Failed to calculate dynamic price');
  }
};

const calculateDemand = async (roomId: string): Promise<number> => {
  const recentBookings = await Booking.countDocuments({
    room: roomId,
    createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
  });
  return recentBookings / 30; // Average bookings per day
};

const calculateSeasonality = (): number => {
  const month = new Date().getMonth();
  // Simple seasonality factor based on month (can be made more sophisticated)
  const seasonalityFactors = {
    high: [11, 0, 1, 6, 7], // Dec, Jan, Feb, Jul, Aug
    medium: [2, 3, 8, 9], // Mar, Apr, Sep, Oct
    low: [4, 5, 10] // May, Jun, Nov
  };

  if (seasonalityFactors.high.includes(month)) return 1.3;
  if (seasonalityFactors.medium.includes(month)) return 1.1;
  return 0.9;
};

const applyPricingAlgorithm = (factors: PricingFactors): number => {
  const { basePrice, demand, seasonality } = factors;
  const demandMultiplier = 1 + (demand * 0.1); // 10% increase per booking/day
  return Math.round(basePrice * demandMultiplier * seasonality);
};