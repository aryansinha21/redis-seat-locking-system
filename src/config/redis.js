import { Redis } from '@upstash/redis';

let redisClient = null;
let isConnected = false;

const createRedisClient = () => {
    try {
        const url = process.env.UPSTASH_REDIS_REST_URL;
        const token = process.env.UPSTASH_REDIS_REST_TOKEN;

        if (!url || !token) {
            console.warn('⚠️  Upstash Redis credentials not provided. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN');
            return null;
        }

        const client = new Redis({
            url: url,
            token: token,
        });

        console.log('✅ Upstash Redis client initialized');
        isConnected = true;
        return client;
    } catch (error) {
        console.warn('⚠️  Failed to create Upstash Redis client:', error.message);
        isConnected = false;
        return null;
    }
};

const connectRedis = async () => {
    try {
        if (!redisClient) {
            redisClient = createRedisClient();
        }
        // Upstash Redis REST API is always available (no persistent connection needed)
        if (redisClient) {
            // Test connection with a simple ping
            try {
                await redisClient.ping();
                console.log('✅ Upstash Redis connection verified');
            } catch (e) {
                console.warn('⚠️  Upstash Redis ping failed:', e.message);
            }
        }
    } catch (error) {
        console.warn('⚠️  Redis optional:', error.message);
        isConnected = false;
    }
};

const getRedisClient = () => redisClient;
const isRedisConnected = () => isConnected;

export { getRedisClient, isRedisConnected, connectRedis };