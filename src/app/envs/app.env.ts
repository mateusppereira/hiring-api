import 'dotenv/config';

export const appEnv = {
    port: process.env.PORT,
    db: process.env.DATABASE_URL,
    secret: process.env.JWT_SECRET_KEY,
    dbRedis: process.env.CACHE_URL,
};
