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
      price: Sequelize.DECIMAL,
      description: Sequelize.STRING,
      quantity: Sequelize.STRING,
      brand: Sequelize.STRING,
      original: Sequelize.STRING,
      piecenumber: Sequelize.STRING,
      carBrand: Sequelize.STRING,
      carModel: Sequelize.STRING,
      carYear: Sequelize.STRING,
      image: Sequelize.STRING,
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
      deletedAt: { type: Sequelize.DATE },
      // Id de usuario que tiene el producto -- NOFUNCIONA
      
      // Tabla de relaciones 1:N -- TIRA ERROR (constrain de FK)
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'categories'
          },
          key: 'id'
        },
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        allowNull: false
      }
      
    })
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
