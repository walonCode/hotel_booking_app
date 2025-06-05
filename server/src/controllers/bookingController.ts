import { Response,Request } from 'express';
import { Booking, BookingStatus } from '../models/Booking';
import { Room } from "../models/Room";

// Create booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { roomId, checkIn, checkOut, guests } = req.body;

    const room = await Room.findById(roomId);
    // In createBooking function
    if (!room) {
      res.status(404).json({ message: 'Room not found' });
      return;
    }
    const existingBooking = await Booking.findOne({roomId})

    if (existingBooking) {
      res.status(400).json({ message: 'Room not available for these dates' });
      return;
    }

    // Calculate total price
    const nights = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = room.price * nights;

    const booking = await Booking.create({
      user: req?.user?.id,
      room: roomId,
      hotel: room.hotel,
      checkIn,
      checkOut,
      guests,
      totalPrice
    });

    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    if (booking.user.toString() !== req.user?.id.toString()) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user bookings
export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.user?.id as string })
      .populate('room')
      .populate('hotel', 'name');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel booking
export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user?.id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    booking.status = BookingStatus.CANCELLED;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};