import 'dotenv/config';

export const appEnv = {
    port: process.env.PORT,
    db: process.env.DATABASE_URL,
};
