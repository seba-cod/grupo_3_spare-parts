'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('users', [{
        user_name:'pedro1',
        first_name:'jose',
        last_name:'perez',
        email:'asda@asdad.com',
        address:'calle siempre viva 1234',
        password:'111111',
        avatar:'',
        admin:'false'
      },
      {
        user_name:'rapaz2',
        first_name:'ramiro',
        last_name:'perez',
        email:'asda@asdad.com',
        address:'calle siempre viva 1234',
        password:'222222',
        avatar:'',
        admin:'false'
      },
      {
        user_name:'vivirum3',
        first_name:'santiago',
        last_name:'perez esquivel',
        email:'asda@asdad.com',
        address:'calle siempre viva 1234',
        password:'333333',
        avatar:'',
        admin:'false'
      },
    ], {})

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', {});

  }
};