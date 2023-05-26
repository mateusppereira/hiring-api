import { appEnv } from '../../app/envs/app.env';
import { createServer } from '../config/express.config';
import { makeRoutes } from './express.routes';

export const runServer = () => {
    const app = createServer();
    makeRoutes(app);
    app.listen(appEnv.port, () => console.log(`API running at http://localhost:${appEnv.port}`));
};
