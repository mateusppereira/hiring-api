"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const express_config_1 = require("../../src/main/config/express.config");
const database_1 = require("../../src/main/database");
const cache_1 = require("../../src/main/cache");
const app = (0, express_config_1.createServer)();
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.DatabaseConnection.connect();
    yield cache_1.CacheConnection.connect();
}));
describe('[POST] /users', () => {
    let result;
    const token = jsonwebtoken_1.default.sign(JSON.stringify({ uuid: (0, uuid_1.v4)(), name: 'teste', email: 'email@email.com', tipo: 'admin' }), process.env.MY_SECRET_KEY_JWT);
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        result = yield (0, supertest_1.default)(app)
            .post('/users')
            .set('Authorization', token)
            .send({
            name: 'mateus pereira',
            email: 'mateus@email.com',
            senha: 'mateus1234',
            tipo: 'admin',
            nomeEmpresa: 'growdev',
        });
    }));
    it('should return success', () => {
        const { status } = result;
        expect(status).toEqual(201);
    });
    it('should return user created', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = result;
        expect(body).toEqual({
            uuid: expect.any(String),
            name: 'mateus pereira',
            email: 'mateus@email.com',
            senha: 'mateus1234',
            tipo: 'admin',
            nomeEmpresa: 'growdev',
        });
    }));
});
