import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq();

interface AIRecommendationParams {
  userPreferences: string;
  budget: number;
  location: string;
  previousBookings: string | null;
}

export class AIService {
  private static async generatePrompt(params: AIRecommendationParams): Promise<string >{
    return `As an AI hotel recommendation system, analyze the following user preferences and provide hotel recommendations:
      User Preferences: ${params.userPreferences}
      Budget: $${params.budget}
      Location: ${params.location}
      Previous Bookings: ${params.previousBookings || 'None'}
      
      Provide recommendations in the following format:
      1. Hotel name
      2. Why this hotel matches the user's preferences
      3. Special features that align with user preferences
      4. Price comparison with budget
      5. Location benefits`;
  }

  static async getAIRecommendations(params: AIRecommendationParams) {
    try {
      const prompt = await this.generatePrompt(params);

      const completion = await groq.chat.completions.create({
        messages: [{
          role: 'user',
          content: prompt
        }],
        model: 'mixtral-8x7b-32768',
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 0.9
      });

      return completion.choices[0]?.message?.content;
    } catch (error) {
      console.error('AI Recommendation Error:', error);
      throw new Error('Failed to generate AI recommendations');
    }
  }

  static async analyzeUserPreferences(userHistory: any[]) {
    try {
      const historyPrompt = `Analyze the following user booking history and extract key preferences:
        ${JSON.stringify(userHistory, null, 2)}
        
        Provide analysis in the following areas:
        1. Preferred price range
        2. Location patterns
        3. Amenity preferences
        4. Booking patterns
        5. Special requirements`;

      const completion = await groq.chat.completions.create({
        messages: [{
          role: 'user',
          content: historyPrompt
        }],
        model: 'mixtral-8x7b-32768',
        temperature: 0.5,
        max_tokens: 512
      });

      return completion.choices[0]?.message?.content;
    } catch (error) {
      console.error('AI Analysis Error:', error);
      throw new Error('Failed to analyze user preferences');
    }
  }

  static async generatePersonalizedDescription(hotel: any, userPreferences: string) {
    try {
      const prompt = `Create a personalized hotel description based on these user preferences:
        ${userPreferences}
        
        Hotel details:
        ${JSON.stringify(hotel, null, 2)}
        
        Generate a personalized description highlighting how this hotel matches the user's preferences.`;

      const completion = await groq.chat.completions.create({
        messages: [{
          role: 'user',
          content: prompt
        }],
        model: 'mixtral-8x7b-32768',
        temperature: 0.7,
        max_tokens: 512
      });

      return completion.choices[0]?.message?.content;
    } catch (error) {
      console.error('AI Description Error:', error);
      throw new Error('Failed to generate personalized description');
    }
  }
}