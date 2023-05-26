import { DatabaseConnection } from './database/database.connection';
import { runServer } from './server/server';

DatabaseConnection.connect()
    .then(() => runServer())
    .catch((error) => {
        console.log('Erro ao inicializar o servidor', error);
    });
