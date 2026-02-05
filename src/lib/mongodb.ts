import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;
if (!MONGO_URI) throw new Error("❌ MONGO_URI is missing");

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {

  var mongoose: MongooseCache;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, { bufferCommands: false });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
