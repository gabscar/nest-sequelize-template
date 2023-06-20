/* eslint-disable @typescript-eslint/no-var-requires */
import { SequelizeOptions } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types/sequelize';

export const config: SequelizeOptions = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '12345',
  database: process.env.DB_NAME_DEVELOPMENT || 'sequelize',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  dialect: (process.env.DB_DIALECT as Dialect) || 'mysql',
};
