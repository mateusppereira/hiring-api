import request from 'supertest';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { createServer } from '../../src/main/config/express.config';
import { DatabaseConnection } from '../../src/main/database';
import { CacheConnection } from '../../src/main/cache';

const app = createServer();

beforeEach(async () => {
  await DatabaseConnection.connect();
  await CacheConnection.connect();
});

describe('[POST] /users', () => {
  let result: any;
  const token = jwt.sign(
    JSON.stringify({ uuid: uuidv4(), name: 'teste', email: 'email@email.com', tipo: 'admin' }),
    process.env.MY_SECRET_KEY_JWT as string,
  );

  beforeEach(async () => {
    result = await request(app)
      .post('/users')
      .set('Authorization', token)
      .send({
        name: 'mateus pereira',
        email: 'mateus@email.com',
        senha: 'mateus1234',
        tipo: 'admin',
        nomeEmpresa: 'growdev',
      })
  });

  it('should return success', () => {
    const { status } = result;
    expect(status).toEqual(201);
  });

  it('should return user created', async () => {
    const { body } = result;
    expect(body).toEqual({
      uuid: expect.any(String),
      name: 'mateus pereira',
      email: 'mateus@email.com',
      senha: 'mateus1234',
      tipo: 'admin',
      nomeEmpresa: 'growdev',
    });
  });
});

