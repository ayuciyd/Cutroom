import User from '../models/User.js';
import { isDbConnected } from '../config/db.js';
import { devUsersStore } from './authController.js';

export const getCurrentUser = async (req, res, next) => {
  try {
    const uid = req.firebaseUser?.uid;

    if (req.user) {
      return res.status(200).json({
        success: true,
        data: req.user,
      });
    }

    // Check devUsersStore
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
