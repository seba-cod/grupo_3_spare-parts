'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('users', [{
        user_name:'pedro1',
        first_name:'jose',
        last_name:'perez',
        email:'prueba1@a.com',
        address:'calle siempre viva 1234',
        password:'$2y$10$OOlHuF/clX7zFWJ6BQ6sFOB5SOXGwu955hXZSdHOcFIvlgOQyX6sq',
        avatar:'',
        admin:'true'
      },
      {
        user_name:'rapaz2',
        first_name:'ramiro',
        last_name:'perez',
        email:'prueba2@a.com',
        address:'calle maso viva 1234',
        password:'$2y$10$G7Ir0TA/5.OMdP9UBfYrl.67CqsuzxMNwVppfxOxzaf55DBUjwp56',
        avatar:'',
        admin:'false'
      },
      {
        user_name:'vivirum3',
        first_name:'santiago',
        last_name:'perez esquivel',
        email:'prueba3@a.com',
        address:'calle muerta 1234',
        password:'$2y$10$KSxC/m9Y1.haFo9SG9iL5.bi/13R1Imr4aKggCh7QRzUZ/3mgTK8.',
        avatar:'',
        admin:'false'
      },
    ], {})

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', {});

  }
};