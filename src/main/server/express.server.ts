import { appEnv } from '../../app/envs/app.env';
import { createServer } from '../config/express.config';

export const runServer = () => {
    const app = createServer();
    app.get('/', (req, res) =>
        res.send(`<div style="min-height: 100vh; display: grid; place-items: center">
<h1>hiring-api</h1>
<h4>Api de Vagas - Material de estudo da GrowDev</h4>
<div>
    <a href="https://github.com/Ljames666/hiring-api" target="_blank" rel="noopener noreferrer">
        repo</a
    >
</div>
</div>`)
    );
    app.listen(appEnv.port, () => console.log(`API running at http://localhost:${appEnv.port}`));
};
