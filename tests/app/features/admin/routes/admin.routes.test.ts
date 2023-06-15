import { createServer } from './../../../../../src/main/config/express.config';

import { DatabaseConnection } from '../../../../../src/main/database/database.connection';
import request from 'supertest';
describe('teste das rotas Admin', () => {
    beforeAll(async () => {
        await DatabaseConnection.connect();
        // se tiver cache do redis tem que iniciar a conexão também
    });
    afterAll(async () => {
        await DatabaseConnection.disconnect();
        // se tiver cache do redis tem que terminar a conexão também
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const server = createServer();

    test('teste erro no post', async () => {
        const result = await request(server).post('/admin').send({});

        expect(result.statusCode).toBe(404);
    });
});
