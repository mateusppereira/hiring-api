import request from 'supertest';
import { createServer } from './../../../../../src/main/config/express.config';
import redis, { Redis } from 'ioredis';
import { DatabaseConnection } from '../../../../../src/main/database/database.connection';
import { randomUUID } from 'node:crypto';
import { appEnv } from '../../../../../src/app/envs/app.env';

describe('teste das rotas Admin', () => {
    let server: Express.Application | undefined = undefined;
    // let redisConnection: Redis | null;
    beforeAll(async () => {
        await DatabaseConnection.connect();
        // redisConnection = new redis({ path: appEnv.dbRedis });
        server = createServer();
    });
    afterAll(async () => {
        await DatabaseConnection.disconnect();
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

        expect(result.statusCode).toEqual(201);
        expect(result.ok).toBeTruthy();
        // expect(result.body.data).toBe(`User BossMaster já está cadastrado`);
    });
    test('deve retornar 200 ao listar usuarios', async () => {
        const result = await request(server).get('/admin/all');

        expect(result.ok).toBeTruthy();
        expect(result.statusCode).toEqual(200);
        expect(result.error).toBeFalsy();
        expect(result.type).toEqual('application/json');
        expect(result.charset).toEqual('utf-8');
        expect(result.body.message).toEqual('Successfully created list of users!');
        expect(result.body.data).toBeDefined();
    });
});
