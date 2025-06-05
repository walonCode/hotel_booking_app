import { Request, Response } from 'express';
import { Booking } from '../models/Booking';
import { Room } from '../models/Room';
import { Hotel } from '../models/Hotel';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalRevenue = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email')
      .populate('room', 'name type');

    res.json({
      totalBookings,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentBookings
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const bookingsCount = await Booking.countDocuments();
    const revenue = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const topCities = await Hotel.aggregate([
      { $group: { _id: '$address.city', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      bookingsCount,
      revenue: revenue[0]?.total || 0,
      topCities
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

export const updateRoomPricing = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const { price } = req.body;

    const room = await Room.findByIdAndUpdate(
      roomId,
      { price },
      { new: true }
    );

    if (!room) {
      res.status(404).json({ error: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update room pricing' });
  }
};

// export const handleFraudAlert = async (req: Request, res: Response) => {
//   try {
//     const { bookingId, reason } = req.body;
//     const booking = await Booking.findById(bookingId);

//     if (!booking) {
//       return res.status(404).json({ error: 'Booking not found' });
//     }

//     // Add fraud flag to booking
//     booking.fraudFlag = true;
//     booking.fraudReason = reason;
//     await booking.save();

//     // TODO: Implement notification system for admins

//     res.json({ message: 'Fraud alert recorded successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to handle fraud alert' });
//   }
// };