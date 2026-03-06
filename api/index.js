import 'dotenv/config';
import app from '../src/app.js';
import { connectRedis } from '../src/config/redis.js';
import { connectMongo } from '../src/config/mongo.js';
import { initializeSeats } from '../src/modules/booking/booking.model.js';

let initialized = false;

const initializeApp = async () => {
    if (initialized) return;
    initialized = true;

    console.log('🚀 Initializing serverless app...');

    try {
        await connectRedis();
        console.log('✅ Redis configured (Upstash)');
    } catch (error) {
        console.warn('⚠️  Redis connection failed (optional):', error.message);
    }

    try {
        await connectMongo();
        await initializeSeats();
        console.log('✅ MongoDB initialized');
    } catch (error) {
        console.error('❌ MongoDB failed:', error.message);
    }
};

// Initialize on first request
app.use((req, res, next) => {
    initializeApp().then(() => next()).catch((error) => {
        console.error('Initialization error:', error);
        res.status(500).json({ error: 'Initialization failed' });
    });
});

export default app;