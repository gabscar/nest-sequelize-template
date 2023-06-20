/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const config = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '12345',
  database: process.env.DB_NAME_DEVELOPMENT || 'sequelize',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DB_DIALECT || 'mysql',
  define: {
    underscored: true, // Enable camelCase to snake_case conversion
  },
};
module.exports = config;
