'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    const password = await bcrypt.hash('User@123', 10);
    await queryInterface.bulkInsert('users', [
      {
        id: '8cafed52-eabd-41be-84ad-aa229570ae8c',
        name: 'user 1',
        email: 'user1@email.com',
        password: password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5bd0b916-3e63-4845-bbf0-95d25bf7836e',
        name: 'user 2',
        email: 'user2@email.com',
        password: password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: 'user1@email.com',
    });
    await queryInterface.bulkDelete('users', {
      email: 'user3@email.com',
    });
  },
};
