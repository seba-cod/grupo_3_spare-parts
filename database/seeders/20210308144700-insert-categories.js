'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('categories', [{
        name: "categoria 1"
      },
      {
        name: "categoria 2"
      },
      {
        name: "categoria 3"
      },
      {
        name: "categoria 4"
      },
      {
        name: "categoria 5"
      },
      {
        name: "categoria 6"
      },
    ], {})

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});

  }
};