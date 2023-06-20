/* eslint-disable @typescript-eslint/no-var-requires */
import { Sequelize } from 'sequelize-typescript';
import { config } from './sequelize.database.config';

export const sequelize = new Sequelize(config);
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
