import express from 'express';
import { register, login } from '../controllers/authController';
import { validate } from '../middleware/validate';
import { userRegistrationSchema, userLoginSchema } from '../validators/schemas';

const router = express.Router();

router.post('/register', validate(userRegistrationSchema), register);
router.post('/login', validate(userLoginSchema), login);

export default router;