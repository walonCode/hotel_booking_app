import express from 'express';
import { protect } from '../middleware/auth';
import { getAIRecommendations } from '../controllers/recommendationController';

const router = express.Router();

router.post('/ai-recommendations', protect, getAIRecommendations);

export default router;