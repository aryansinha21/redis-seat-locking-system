import 'dotenv/config';
import app from './src/app.js';

// On Vercel (serverless) we'll export the app and let the platform handle
// listening. In local development we still want to start a server.
if (!process.env.VERCEL) {
    import('./src/config/redis.js').then(({ connectRedis }) => connectRedis())
        .catch((e) => console.warn('Redis init failed', e.message));
    import('./src/config/mongo.js').then(({ connectMongo }) => connectMongo())
        .catch((e) => console.error('Mongo init failed', e.message));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

export default app;