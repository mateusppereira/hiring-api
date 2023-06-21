
/*
1. GET vagas/:uuid -> 200 + { vaga }

2. GET vagas/:uuid -> 404 + { }

3. GET vagas/:uuid -> 401 + { <unauthorized> }
*/

import jwt from 'jsonwebtoken';
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { createServer } from "../../src/main/config/express.config";
import { DatabaseConnection } from '../../src/main/database';
import { CacheConnection } from '../../src/main/cache';

const app = createServer();

beforeEach(async () => {
  await DatabaseConnection.connect();
  await CacheConnection.connect();
});

describe('[GET] /vagas/:uuid', () => {
  let result: any;

  describe('when request is authenticated and uuid exists', () => {
    const uuidVaga = uuidv4();

    beforeEach(async () => {
      const token = jwt.sign(
        JSON.stringify({ uuid: uuidv4(), name: 'teste', email: 'email@email.com', tipo: 'admin' }),
        process.env.MY_SECRET_KEY_JWT as string,
      );

      await DatabaseConnection.client.manager.query(`
        INSERT INTO vagas (vaga_uuid, vaga_recrutador_uuid, vaga_descricao, vaga_nome_empresa, vaga_data_limite, vaga_ativo, vaga_max_candidatos)
        VALUES ('${uuidVaga}', '${uuidv4()}', 'vaga de teste', 'Growdev', '2030-10-10T23:59:59', true, 10);
      `);

      result = await request(app)
        .get(`/vagas/${uuidVaga}`)
        .set('Authorization', token)
        .send()
    });

    it('should return success', () => {
      const { status } = result;
      expect(status).toEqual(200);
    });

    it('should return vaga', () => {
      const { body } = result;
      expect(body).toEqual({
        uuid: uuidVaga,
        descricao: 'vaga de teste',
        nomeEmpresa: 'Growdev',
        ativo: true,
        dataLimite: '2030-10-10T23:59:59',
        recrutadorUuid: expect.any(String),
        maxCandidatos: 10,
      });
    });
  });

  describe('when request is authenticated and uuid NOT exists', () => {
    const uuidVaga = uuidv4();

    beforeEach(async () => {
      const token = jwt.sign(
        JSON.stringify({ uuid: uuidv4(), name: 'teste', email: 'email@email.com', tipo: 'admin' }),
        process.env.MY_SECRET_KEY_JWT as string,
      );

      result = await request(app)
        .get(`/vagas/${uuidVaga}`)
        .set('Authorization', token)
        .send()
    });

    it('should return not found', () => {
      const { status } = result;
      expect(status).toEqual(404);
    });

    it('should return not found message', () => {
      const { body } = result;
      expect(body).toEqual({ message: 'Vaga não encontrada' });
    });
  });

  describe('when request is NOT authenticated', () => {
    const uuidVaga = uuidv4();

    beforeEach(async () => {
      const token = jwt.sign(
        JSON.stringify({ uuid: uuidv4(), name: 'teste', email: 'email@email.com', tipo: 'admin' }),
        'uma-secret-key-invalida',
      );

      result = await request(app)
        .get(`/vagas/${uuidVaga}`)
        .set('Authorization', token)
        .send()
    });

    it('should return unauthorized', () => {
      const { status } = result;
      expect(status).toEqual(404);
    });
  });
});
