import 'dotenv/config';
import app from './src/app.js';
import { connectRedis } from './src/config/redis.js';
import { connectMongo } from './src/config/mongo.js';
import { initializeSeats } from './src/modules/booking/booking.model.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
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

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error('Server startup error:', error);
    process.exit(1);
});

export default app;