import 'dotenv/config';
import Redis from 'ioredis';

const RedisTest = class teste extends Redis {
  private mem : {[key: string]: string | null} = {};

  constructor() {
    super();
  }

  connect(_opts: any): Promise<void> {
    return Promise.resolve();
  }

  get(key: string, _callback: any): Promise<string | null> {
    return Promise.resolve(this.mem[key]);
  }

  set(key: string, value: string): Promise<"OK"> {
    this.mem[key] = value;
    return Promise.resolve("OK");
  }

  del(...keys: any[]): Promise<number> {
    this.mem[keys[0]] = null;
    return Promise.resolve(0);
  }
}

export const redisConfig = process.env.NODE_ENV === 'test'
? new RedisTest()
: new Redis({
  port: 11231,
  host: process.env.REDIS_HOST,
  username: 'default',
  password: process.env.REDIS_PASSWORD,
  lazyConnect: true,
});
