import { Request, Response } from 'express';
import { Hotel } from "../models/Hotel";
import { AuthRequest } from '../middleware/auth';

// Get all hotels
export const getHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().populate('owner', 'name email');
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single hotel
export const getHotel = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('reviews.user', 'name');

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create hotel
export const createHotel = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, address, amenities } = req.body;

    const hotel = await Hotel.create({
      owner: req.user._id,
      name,
      description,
      address,
      amenities
    });

    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update hotel
export const updateHotel = async (req: AuthRequest, res: Response) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    if (hotel.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedHotel);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete hotel
export const deleteHotel = async (req: AuthRequest, res: Response) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    if (hotel.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await hotel.deleteOne();
    res.json({ message: 'Hotel removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add review
export const addReview = async (req: AuthRequest, res: Response) => {
  try {
    const { rating, comment } = req.body;
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    const review = {
      user: req.user._id,
      rating,
      comment
    };

    hotel.reviews.push(review);

    // Calculate average rating
    const totalRating = hotel.reviews.reduce((acc, item) => (item.rating || 0) + acc, 0);
    hotel.rating = totalRating / hotel.reviews.length;

    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};