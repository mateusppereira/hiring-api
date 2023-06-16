import { createServer } from './../../../../../src/main/config/express.config';

import { DatabaseConnection } from '../../../../../src/main/database/database.connection';
import request from 'supertest';
import { randomUUID } from 'node:crypto';
describe('teste das rotas Admin', () => {
    let server: Express.Application | undefined = undefined;
    beforeAll(async () => {
        await DatabaseConnection.connect();
        // se tiver cache do redis tem que iniciar a conexão também
        server = createServer();
    });
    afterAll(async () => {
        await DatabaseConnection.disconnect();
        // se tiver cache do redis tem que terminar a conexão também
        server = undefined;
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('teste erro no post', async () => {
        const result = await request(server).post('/admin').send({});

        expect(result.statusCode).toBe(400);
    });

    test('deve retornar 400 se já existir usuario cadastrado no db', async () => {
        const result = await request(server).post('/admin').send({
            name: 'BossMaster',
            email: 'superboss@gmail.com',
            password: 'pass',
            companyName: 'UOL',
        });

        console.log(result);

        expect(result.statusCode).toEqual(400);
        expect(result.ok).toBeFalsy();
        expect(result.body.message).toBe(`User BossMaster já está cadastrado`);
    });
    test('deve retornar 201 se cadastro for sucesso', async () => {
        const result = await request(server)
            .post('/admin')
            .send({
                name: `BossMaster-${randomUUID()}`,
                email: 'superboss@gmail.com.' + randomUUID(),
                password: 'pass-' + randomUUID(),
                companyName: 'UOL',
            });

        console.log(result);

        expect(result.statusCode).toEqual(201);
        expect(result.ok).toBeTruthy();
        // expect(result.body.data).toBe(`User BossMaster já está cadastrado`);
    });
    test('deve retornar 200 ao listar usuarios', async () => {
        await request(server)
            .get('/admin')
            .expect((response) => {
                console.log(response.body.data);
                expect(response.status).toEqual(200);
            });

        // expect(result.body.data).toBe(`User BossMaster já está cadastrado`);
    });
});
