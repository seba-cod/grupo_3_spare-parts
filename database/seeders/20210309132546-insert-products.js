'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('products', [{
      name: 'Ruedas',
      price: 1233,
      description: 'Ruedas x2125',
      quantity: "15",
      brand: "Pirelli",
      original: "si",
      piecenumber: "AA654asD",
      carBrand: "BMW",
      carModel: "325d",
      carYear: "2014",
      image: "user-1615420410225img"
    },
      {
      name: 'Frenos',
      price: 1233,
      description: 'Frenos Brembo Porsche atr',
      quantity: "2",
      brand: "Brembo",
      original: "si",
      piecenumber: "68765Soppopi2",
      carBrand: "Porsche",
      carModel: "911 Carrera",
      carYear: "2010",
      image: "user-1615420410225img"
      }], {})

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('People', null, {})

  }
};

