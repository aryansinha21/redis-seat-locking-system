import 'dotenv/config';
import app from './src/app.js';
import { connectRedis } from './src/config/redis.js';
import { connectMongo } from './src/config/mongo.js';
import { initializeSeats } from './src/modules/booking/booking.model.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectRedis();
    } catch (error) {
        console.error('Failed to connect to Redis:', error.message);
        console.log('Starting server without Redis...');
    }

    try {
        await connectMongo();
        await initializeSeats();
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        console.log('Starting server without MongoDB...');
    }

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

startServer();