'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING,
      price: Sequelize.STRING,
      price: Sequelize.DECIMAL,
      description: Sequelize.STRING,
      image: Sequelize.STRING,
      quantity: Sequelize.STRING,
      brand: Sequelize.STRING,
      original: Sequelize.STRING,
      piecenumber: Sequelize.STRING,
      carBrand: Sequelize.STRING,
      carModel: Sequelize.STRING,
      carYear: Sequelize.STRING,
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      owner: {
        type: Sequelize.STRING
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'categories'
          },
          key: 'id'
        },
        allowNull: false
      },
    })
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
