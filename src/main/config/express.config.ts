import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { makeRoutes } from '../server/express.routes';

export const createServer = () => {
    const app: Express = express();

    app.use(cors(), express.json(), cookieParser());
    makeRoutes(app);
    return app;
};
