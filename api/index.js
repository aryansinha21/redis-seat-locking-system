import 'dotenv/config';
import app from '../src/app.js';
import { connectRedis } from '../src/config/redis.js';
import { connectMongo } from '../src/config/mongo.js';
import { initializeSeats } from '../src/modules/booking/booking.model.js';

let initialized = false;

async function init() {
  if (initialized) return;

  console.log("🚀 Initializing serverless app...");

  try {
    await connectRedis();
    console.log("✅ Redis configured");
  } catch (e) {
    console.warn("Redis optional:", e.message);
  }

  await connectMongo();
  await initializeSeats();

  initialized = true;
  console.log("✅ App initialized");
}

export default async function handler(req, res) {
  try {
    await init();
    return app(req, res);
  } catch (error) {
    console.error("Initialization error:", error);
    res.status(500).json({ error: "Server initialization failed" });
  }
}
