import { Redis } from '@upstash/redis';

let redisClient = null;
let isConnected = false;

const createRedisClient = () => {
    try {
        const url = process.env.UPSTASH_REDIS_REST_URL;
        const token = process.env.UPSTASH_REDIS_REST_TOKEN;

        if (!url || !token) {
            console.warn('Upstash Redis credentials not provided, Redis will be unavailable');
            return null;
        }

        const client = new Redis({
            url: url,
            token: token,
        });

        console.log('✅ Upstash Redis client created');
        isConnected = true;
        return client;
    } catch (error) {
        console.warn('Failed to create Upstash Redis client:', error.message);
        isConnected = false;
        return null;
    }
};

const connectRedis = async () => {
    try {
        if (!redisClient) redisClient = createRedisClient();
        // Upstash is always connected via REST
    } catch (error) {
        console.warn('Redis optional:', error.message);
        isConnected = false;
    }
};

const getRedisClient = () => redisClient;
const isRedisConnected = () => isConnected;

export { getRedisClient, isRedisConnected, connectRedis };