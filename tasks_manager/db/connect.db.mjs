import mongoose from "mongoose";

// Dorine2004NodeExpressCourse this is mys db password

export const connection = async (url) => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log("Error while traying to connect to the database", error);
  }
};
