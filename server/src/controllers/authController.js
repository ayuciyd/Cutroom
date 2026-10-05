import { z } from 'zod';
import User from '../models/User.js';
import { isDbConnected } from '../config/db.js';

// In-memory fallback store when DB is disconnected in dev
export const devUsersStore = new Map();

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['creator', 'actor', 'crew', 'writer', 'investor', 'equipment_provider', 'distributor', 'admin']),
  headline: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
});

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, role, headline, bio, location } = req.body;
    const firebaseUid = req.firebaseUser.uid;

    if (isDbConnected) {
      try {
        let existingUser = await User.findOne({ firebaseUid });
        if (existingUser) {
          return res.status(200).json({
            success: true,
            data: existingUser,
            message: 'User profile already exists',
          });
        }

        const existingEmail = await User.findOne({ email: email.toLowerCase() });
        if (existingEmail) {
          return res.status(400).json({
            success: false,
            data: null,
            error: { message: 'User with this email already exists' },
          });
        }

        const newUser = await User.create({
          firebaseUid,
          email: email.toLowerCase(),
          name,
          role,
          headline: headline || '',
          bio: bio || '',
          location: location || '',
        });

        return res.status(201).json({
          success: true,
          data: newUser,
        });
      } catch (dbErr) {
        console.warn('[MongoDB Query Error]: Fallback to devUsersStore', dbErr.message);
      }
    }

    // Dev Fallback Store
    const userDoc = {
      _id: `dev-user-${Date.now()}`,
      firebaseUid,
      email: email.toLowerCase(),
      name,
      role,
      headline: headline || '',
      bio: bio || '',
      location: location || '',
      skills: [],
      experience: [],
      portfolio: [],
      available: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    devUsersStore.set(firebaseUid, userDoc);

    res.status(201).json({
      success: true,
      data: userDoc,
    });
  } catch (error) {
    next(error);
  }
};
