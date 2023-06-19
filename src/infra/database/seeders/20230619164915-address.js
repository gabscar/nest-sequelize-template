'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('addresses', [
      {
        id: '8cafed52-eabd-41be-84ad-aa229570ae8a',
        city: 'Iporá',
        state: 'Goiás',
        zip: '000001',
        number: '0',
        street: 'Rua dos bobos',
        created_at: new Date(),
        updated_at: new Date(),
        complement: null,
        neighborhood: 'Exemplo Bairro',
        userId: '8cafed52-eabd-41be-84ad-aa229570ae8c',
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('addresses', {
      id: '8cafed52-eabd-41be-84ad-aa229570ae8a',
    });
  },
};
