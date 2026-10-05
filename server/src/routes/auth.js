import express from 'express';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { registerUser, registerSchema } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/register (requires Firebase token in Authorization header)
router.post('/register', protect, validate(registerSchema), registerUser);

export default router;
