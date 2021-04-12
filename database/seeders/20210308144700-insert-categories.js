'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('categories', [{
        name: "Interior"
      },
      {
        name: "Exterior"
      },
      {
        name: "Motor"
      },
      {
        name: "Accesorios"
      },
    ], {})

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});

  }
};