import { createClient } from 'redis';

let redisClient = null;
let isConnected = false;

const createRedisClient = () => {
    try {
        const client = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
            socket: { reconnectStrategy: (retries) => Math.min(retries * 50, 500) }
        });

        client.on('error', (err) => {
            console.warn('Redis connection failed:', err.message);
            isConnected = false;
        });

        client.on('connect', () => {
            console.log('✅ Redis Connected');
            isConnected = true;
        });

        return client;
    } catch (error) {
        console.warn('Failed to create Redis client:', error.message);
        return null;
    }
};

const connectRedis = async () => {
    try {
        if (!redisClient) redisClient = createRedisClient();
        if (redisClient) {
            await redisClient.connect();
            isConnected = true;
        }
    } catch (error) {
        console.warn('Redis optional:', error.message);
        isConnected = false;
    }
};

const getRedisClient = () => redisClient;
const isRedisConnected = () => isConnected;

export { getRedisClient, isRedisConnected, connectRedis };