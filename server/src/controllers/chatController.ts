import { Request, Response } from 'express';
import { ChatHistory, IChatHistory } from '../models/ChatHistory';
import { User } from '../models/User'; // Assuming you have a User model
// import { getGptResponse } from '../services/aiService'; // Assuming you have an AI service

export const handleChat = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // from authenticateUser middleware
    const { message, sessionId } = req.body; // sessionId can be used to maintain context across multiple requests

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
    }

    // Find or create chat history for the user
    let chatHistory = await ChatHistory.findOne({ user: userId });
    if (!chatHistory) {
      chatHistory = new ChatHistory({ user: userId, messages: [] });
    }

    // Add user message to history
    chatHistory.messages.push({ sender: 'user', text: message, timestamp: new Date() });

    // TODO: Integrate with GPT-based response from aiService
    // const aiResponseText = await getGptResponse(message, chatHistory.messages, sessionId);
    const aiResponseText = `Echo: ${message}`; // Placeholder AI response

    // Add AI response to history
    chatHistory.messages.push({ sender: 'ai', text: aiResponseText, timestamp: new Date() });

    await chatHistory.save();

    res.status(200).json({ response: aiResponseText, chatHistory });
  } catch (error) {
    console.error('Chat handling error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
};