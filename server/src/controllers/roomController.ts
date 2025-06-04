import { Request, Response } from 'express';
import { Room } from "../models/Room"
import { AuthRequest } from '../middleware/auth';
import { Hotel } from "../models/Hotel";

// Get rooms by hotel
export const getRoomsByHotel = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find({ hotel: req.params.hotelId });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create room
export const createRoom = async (req: AuthRequest, res: Response) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    if (hotel.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const room = await Room.create({
      ...req.body,
      hotel: req.params.hotelId
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update room
export const updateRoom = async (req: AuthRequest, res: Response) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const hotel = await Hotel.findById(room.hotel);
    if (hotel?.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete room
export const deleteRoom = async (req: AuthRequest, res: Response) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const hotel = await Hotel.findById(room.hotel);
    if (hotel?.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await room.deleteOne();
    res.json({ message: 'Room removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};