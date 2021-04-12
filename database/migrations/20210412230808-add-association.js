'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'products', {
      type: Sequelize.INTEGER,
      references:{
        model: 'userproduct',
        key: 'user'
      }

    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users' , 'products');
  }
};
