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
      owner: {
        type: Sequelize.STRING,
        references: {
          //Tabla pivot para los productos que tenga un usuario
          model: {
            tableName: 'userProducts'
          },
          key: 'id_product'
        },
        allowNull: false
      },
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
    })
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
