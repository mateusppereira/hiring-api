import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from '../../app/shared/database/entites/user.entity';
import { CreateUsersTable1684974494369 } from '../../app/shared/database/migrations/1684974494369-CreateUsersTable';

export const config: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: true,
  ssl: { rejectUnauthorized: false },
  schema: 'hiring',
  entities: [UserEntity],
  migrations: [CreateUsersTable1684974494369],
};

export const dataSource = new DataSource(config);