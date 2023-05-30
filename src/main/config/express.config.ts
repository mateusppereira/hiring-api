import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export const createServer = () => {
    const app: Express = express();

    app.use(cors(), express.json(), cookieParser());

    return app;
};
