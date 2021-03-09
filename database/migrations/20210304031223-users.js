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
      }
    } ) },
      //foreign key usage // NI LO TOQUE
      // category: {
      //   type: Sequelize.STRING,
      //   references: {
      //     model: 'categories',
      //     key: 'categorie_id'
      // }
      down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
      }
};