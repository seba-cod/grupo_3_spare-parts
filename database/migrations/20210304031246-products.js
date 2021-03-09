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
      attr3: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      }
    } ) },
      //foreign key usage // NI LO TOQUE
      // category: {
      //   type: Sequelize.STRING,
      //   references: {
      //     model: 'categories',
      //     key: 'categorie_id'
      //   }
      down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('products');
      }
    };z