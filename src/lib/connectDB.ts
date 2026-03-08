import mongoose from "mongoose"

const mongoDBUrl =
  process.env.MONGODB_URI ||
  "mongodb+srv://Beeynow20007:beeynow2007@cluster0.g4l5dsr.mongodb.net/Multicart"

if (!mongoDBUrl) throw new Error("DB error: MongoDB URI missing")

// Extend global to cache connection
const globalWithMongoose = global as typeof globalThis & {
  mongoose?: {
    conn: mongoose.Connection | null
    promise: Promise<mongoose.Connection> | null
  }
}

let cached = globalWithMongoose.mongoose

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null }
}

const connectDb = async (): Promise<mongoose.Connection> => {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoDBUrl, { serverSelectionTimeoutMS: 10000 })
      .then((mongoose) => {
        console.log("✅ MongoDB connected")
        return mongoose.connection
      })
  }

  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (error) {
    cached.promise = null
    console.error("❌ MongoDB connection error:", error)
    throw error
  }
}

export default connectDb