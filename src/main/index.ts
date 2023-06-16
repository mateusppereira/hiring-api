import { DatabaseConnection, RedisConnection } from './database';
import { runServer } from './server/express.server';

DatabaseConnection.connect()
    .then(() => {
        RedisConnection.initConnection();
        runServer();
    })
    .catch((error) => {
        console.log('Erro ao inicializar o servidor', error);
    });
