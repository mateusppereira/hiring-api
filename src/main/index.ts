import { DatabaseConnection } from './database/database.connection';
import { runServer } from './server/express.server';

DatabaseConnection.connect()
    .then(() => runServer())
    .catch((error) => {
        console.log('Erro ao inicializar o servidor', error);
    });
