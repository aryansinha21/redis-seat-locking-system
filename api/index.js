import 'dotenv/config';
import app from '../src/app.js';
import { connectRedis } from '../src/config/redis.js';
import { connectMongo } from '../src/config/mongo.js';
import { initializeSeats } from '../src/modules/booking/booking.model.js';

(async () => {
    console.log('🚀 Initializing server...');

    try {
        await connectRedis();
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
})();

export default app;