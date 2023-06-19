/* eslint-disable @typescript-eslint/no-var-requires */
import { Sequelize } from 'sequelize-typescript';
const sequelizeConfig = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '12345',
  database: process.env.DB_NAME_DEVELOPMENT || 'sequelize',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DB_DIALECT || 'mysql',
};
export const sequelize = new Sequelize(sequelizeConfig as any);

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      // sequelize.addModels([Post]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
