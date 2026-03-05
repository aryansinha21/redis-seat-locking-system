import { v4 as uuidv4 } from 'uuid';
import { getRedisClient, isRedisConnected } from '../config/redis.js';

const acquireLock = async (key, ttl = 10) => {
    try {
        const redisClient = getRedisClient();
        if (!isRedisConnected() || !redisClient) {
            return uuidv4();
        }
        
        const lockValue = uuidv4();
        const result = await redisClient.set(key, lockValue, {
            NX: true,
            EX: ttl
        });

        if (!result) return null;
        return lockValue;
    } catch (error) {
        console.warn('Lock acquisition skipped:', error.message);
        return uuidv4();
    }
};

const releaseLock = async (key, lockValue) => {
    try {
        const redisClient = getRedisClient();
        if (!isRedisConnected() || !redisClient) return;
        
        const storedValue = await redisClient.get(key);
        if (storedValue === lockValue) {
            await redisClient.del(key);
        }
    } catch (error) {
        console.warn('Lock release failed:', error.message);
    }
};

export { acquireLock, releaseLock };