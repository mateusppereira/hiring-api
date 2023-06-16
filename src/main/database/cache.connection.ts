import redis, { Redis } from 'ioredis';
import { appEnv } from '../../app/envs/app.env';

export class RedisConnection {
    private static _connection: Redis;
    static initConnection() {
        if (!this._connection) {
            this._connection = new redis({ path: appEnv.dbRedis });
        }
    }

    static getConnection() {
        if (!this._connection) {
            throw new Error('Redisnot connection!');
        }

        return this._connection;
    }

    static async closeConnection() {
        if (this._connection) {
            await this._connection.quit();
        }
    }
}
