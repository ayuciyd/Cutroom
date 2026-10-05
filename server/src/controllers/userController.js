import User from '../models/User.js';
import { isDbConnected } from '../config/db.js';
import { devUsersStore } from './authController.js';

// GET /api/users/me
export const getCurrentUser = async (req, res, next) => {
  try {
    const uid = req.firebaseUser?.uid;

    if (req.user) {
      return res.status(200).json({
        success: true,
        data: req.user,
      });
    }

    if (uid && devUsersStore.has(uid)) {
      return res.status(200).json({
        success: true,
        data: devUsersStore.get(uid),
      });
    }

    if (isDbConnected && uid) {
      try {
        const mongoUser = await User.findOne({ firebaseUid: uid });
        if (mongoUser) {
          return res.status(200).json({
            success: true,
            data: mongoUser,
          });
        }
      } catch (e) {
        // ignore
      }
    }

    return res.status(404).json({
      success: false,
      data: null,
      error: { message: 'User profile not found. Please complete registration.' },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/users/me
export const updateProfile = async (req, res, next) => {
  try {
    const uid = req.firebaseUser?.uid;
    const { 
      name, 
      headline, 
      bio, 
      location, 
      avatarUrl, 
      skills, 
      experience, 
      portfolio, 
      available 
    } = req.body;

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (headline !== undefined) updateFields.headline = headline;
    if (bio !== undefined) updateFields.bio = bio;
    if (location !== undefined) updateFields.location = location;
    if (avatarUrl !== undefined) updateFields.avatarUrl = avatarUrl;
    if (skills !== undefined) updateFields.skills = skills;
    if (experience !== undefined) updateFields.experience = experience;
    if (portfolio !== undefined) updateFields.portfolio = portfolio;
    if (available !== undefined) updateFields.available = available;

    if (isDbConnected && req.user?._id) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          { $set: updateFields },
          { new: true, runValidators: true }
        );

        return res.status(200).json({
          success: true,
          data: updatedUser,
        });
      } catch (dbErr) {
        console.warn('[MongoDB Update Error]: Fallback to devUsersStore', dbErr.message);
      }
    }

    // Dev Fallback Store update
    const currentDoc = devUsersStore.get(uid) || req.user || { firebaseUid: uid };
    const updatedDoc = {
      ...currentDoc,
      ...updateFields,
      updatedAt: new Date().toISOString(),
    };

    devUsersStore.set(uid, updatedDoc);

    res.status(200).json({
      success: true,
      data: updatedDoc,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id (Public profile)
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Search in MongoDB if connected
    if (isDbConnected) {
      try {
        const userDoc = await User.findById(id) || await User.findOne({ firebaseUid: id });
        if (userDoc) {
          return res.status(200).json({
            success: true,
            data: userDoc,
          });
        }
      } catch (e) {
        // ignore
      }
    }

    // Search in devUsersStore
    for (const [uid, userDoc] of devUsersStore.entries()) {
      if (userDoc._id === id || uid === id) {
        return res.status(200).json({
          success: true,
          data: userDoc,
        });
      }
    }

    // Return dummy demo profile if user ID matches demo
    return res.status(200).json({
      success: true,
      data: {
        _id: id,
        name: 'Demo Talent',
        role: 'actor',
        headline: 'Featured Actor & Voice Artist',
        bio: 'Experienced film and stage actor based in Chicago.',
        location: 'Chicago, IL',
        avatarUrl: '',
        skills: ['Acting', 'Voiceover', 'Improv', 'Stage Combat'],
        experience: [
          { title: 'Lead Actor in "The Night Watch"', company: 'Indie Feature', year: '2025', description: 'Starred as Detective Vance.' }
        ],
        portfolio: [
          { title: 'Actor Reel 2025', type: 'video', url: 'https://vimeo.com', thumbnailUrl: '' }
        ],
        available: true,
      },
    });
  } catch (error) {
    next(error);
  }
};
