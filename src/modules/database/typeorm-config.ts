import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? '',
  port: +(process.env.DB_PORT ?? 0),
  username: process.env.DB_USERNAME ?? '',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_DATABASE ?? '',
  migrationsTableName: 'Migrations',
  migrations: ['./**/migrations/*.ts'],
});
