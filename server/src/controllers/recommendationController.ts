import { Request, Response } from 'express';
import { Hotel } from '../models/Hotel';
import { Booking } from '../models/Booking';
import { AIService } from '../services/aiService';

// Get AI-powered recommendations
export const getAIRecommendations = async (req: Request, res: Response) => {
  try {
    const { preferences, budget, location } = req.body;

    // Get user's booking history
    const userBookings = await Booking.find({ user: req.user?.id })
      .populate('hotel')
      .sort({ createdAt: -1 });

    // Analyze user preferences using AI
    const aiAnalysis = await AIService.analyzeUserPreferences(userBookings);

    // Get AI recommendations
    const aiRecommendations = await AIService.getAIRecommendations({
      userPreferences: preferences,
      budget: Number(budget),
      location,
      previousBookings: aiAnalysis
    });

    // Get matching hotels from database
    const hotels = await Hotel.find({
      price: { $lte: budget * 1.2 }
      // Add more filters based on AI analysis
    }).limit(5);

    // Generate personalized descriptions for each hotel
    const personalizedResults = await Promise.all(
      hotels.map(async (hotel) => {
        const description = await AIService.generatePersonalizedDescription(
          hotel,
          preferences
        );

        return {
          ...hotel.toObject(),
          aiDescription: description
        };
      })
    );

    res.json({
      analysis: aiAnalysis,
      recommendations: aiRecommendations,
      hotels: personalizedResults
    });
  } catch (error) {
    console.error('AI Recommendation Error:', error);
    res.status(500).json({ message: 'Failed to get AI recommendations' });
  }
};