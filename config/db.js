const mongoose = require("mongoose");

async function connectDB() {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error("MONGODB_URI is missing. Add it to your .env file.");
  }

  const conn = await mongoose.connect(mongoURI);

  console.log(`MongoDB connected: ${conn.connection.host}`);
}

module.exports = connectDB;