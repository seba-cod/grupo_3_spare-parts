'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_name: Sequelize.STRING,
      first_name: Sequelize.STRING,
      last_name: Sequelize.DECIMAL,
      email: Sequelize.STRING,
      address: Sequelize.STRING,
      password: Sequelize.STRING,
      avatar: Sequelize.STRING,
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      //Tabla pivot que linkee al usuario a una tabla que contenga USUARIOS y PRODUCTOS
      products: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'userProducts'
          },
          key: 'id_product'
        },
        allowNull: false
      },

    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};