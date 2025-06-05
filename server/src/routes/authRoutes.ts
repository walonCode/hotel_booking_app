import express from 'express';
import { register, login } from '../controllers/authController';
import { userRegistrationSchema, userLoginSchema } from '../validators/schemas';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;