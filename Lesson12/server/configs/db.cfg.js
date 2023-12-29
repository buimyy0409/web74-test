const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const MONGO_URI = process.env.MONGO_URI;

const client = new MongoClient(MONGO_URI);

async function connectDB() {
  try {
    // await client.connect(MONGO_URI);
    await mongoose.connect(MONGO_URI);

    return "Connect dB OK";
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { connectDB };