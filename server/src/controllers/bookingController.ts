import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Booking, BookingStatus } from '../models/Booking';
import { Room } from "../models/Room";

// Create booking
export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { roomId, checkIn, checkOut, guests } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check room availability
    const existingBooking = await Booking.findOne({
      room: roomId,
      status: { $ne: BookingStatus.CANCELLED },
      $or: [
        {
          checkIn: { $lte: checkOut },
          checkOut: { $gte: checkIn }
        }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Room not available for these dates' });
    }

    // Calculate total price
    const nights = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = room.price * nights;

    const booking = await Booking.create({
      user: req.user._id,
      room: roomId,
      hotel: room.hotel,
      checkIn,
      checkOut,
      guests,
      totalPrice
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user bookings
export const getUserBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('room')
      .populate('hotel', 'name');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel booking
export const cancelBooking = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    booking.status = BookingStatus.CANCELLED;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};