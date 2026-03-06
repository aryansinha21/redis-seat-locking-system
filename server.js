import 'dotenv/config';
import app from './src/app.js';
import { connectRedis } from './src/config/redis.js';
import { connectMongo } from './src/config/mongo.js';
import { initializeSeats } from './src/modules/booking/booking.model.js';

const startServer = async () => {
    console.log('🚀 Starting local server...');
    try {
        await connectRedis();
    } catch (e) {
        console.warn('Redis init failed during local start:', e.message);
    }

    try {
        await connectMongo();
        await initializeSeats();
    } catch (e) {
        console.error('Mongo init failed during local start:', e.message);
    }

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server listening on port ${PORT}`);
    });
};

startServer().catch((err) => {
    console.error('Failed to start local server:', err);
    process.exit(1);
});