import mongoose from 'mongoose';

export const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log("Error while traying to connect to the database", error);
  }
};
