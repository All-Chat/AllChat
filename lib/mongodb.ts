import mongoose from "mongoose";
import { config } from "dotenv";

if (!process.env.MONGODB_URI) {
  config({ path: ".env.local" });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI missing in .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      dbName: process.env.DB_NAME || "allchat",
      serverSelectionTimeoutMS: 30000,
    });
  }

  cached.conn = await cached.promise;

  console.log(
    "✅ MongoDB connected:",
    cached.conn.connection.name
  );

  return cached.conn;
}
