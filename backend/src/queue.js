require('dotenv').config();
const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  lazyConnect: true,
  retryStrategy: (times) => {
    if (times > 3) return null;
    return Math.min(times * 500, 2000);
  }
});

redis.on('error', (err) => {
  console.error('Redis error:', err.message);
});

const QUEUE_NAME = 'task_queue';

const pushJob = async (payload) => {
  await redis.rpush(QUEUE_NAME, JSON.stringify(payload));
};

module.exports = { pushJob };