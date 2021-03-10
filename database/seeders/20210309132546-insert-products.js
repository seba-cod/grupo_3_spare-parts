'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('products', [{
      name: 'Ruedas',
      price: 1233,
      description: 'asda',
    }], {})

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('People', null, {})

  }
};