import mongoose from 'mongoose';

export let isDbConnected = false;

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/cutroom';
    
    // Set fast buffering timeout for dev responsiveness
    mongoose.set('bufferTimeoutMS', 2500);

    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 2500,
    });
    
    isDbConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    isDbConnected = false;
    console.warn(`[MongoDB] Atlas connection failed (${error.message}). Using in-memory database store for dev fallback.`);
    return null;
  }
};
