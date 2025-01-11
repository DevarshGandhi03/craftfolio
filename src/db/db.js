import mongoose from "mongoose";

const connection = {};

const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Database is already connected");
      return;
    }

    const response = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = response.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    console.log("error Occoured");
    process.exit(1);
  }
};
