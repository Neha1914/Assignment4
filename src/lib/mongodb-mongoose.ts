import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

export async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB via Mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}