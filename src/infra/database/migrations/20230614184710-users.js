'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.STRING(72),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: true,
        unique: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('users');
  },
};
