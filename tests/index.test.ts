import request from 'supertest';
import { createServer } from '../src/main/config/express.config';
import { DatabaseConnection } from '../src/main/database';

const app = createServer();

describe('[GET] /health-check', () => {
  let result: any;
  beforeEach(async () => {
    result = await request(app).get('/health-check')
  });

  it('should return success', () => {
    const { status } = result;
    expect(status).toEqual(200);
  });

  it('should return message OK', async () => {
    const { body } = result;
    expect(body).toEqual({ message: 'Ok' });
  });
});

