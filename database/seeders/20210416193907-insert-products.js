'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products',[{
      
      name:'Rueda auto',
      price:'22000',
      description:'Rodado para autos de carrera',
      quantity:'4',
      brand:'Pirelli',
      image:'/public/images/repuestos2.jpg',
      original:'SI',
      piecenumber:'12354655',
      carBrand:'VWwagen',
      carModel:'JETTA',
      carYear:'2002',
      categoryId:'2',
      userId:'1',
},

{
  name:'Motor V6 ',
  price:'750000',
  description:'Rodado para autos de carrera',
  quantity:'4',
  brand:'Pirelli',
  image:'/public/images/motor.jpg',
  original:'SI',
  piecenumber:'12354655',
  carBrand:'FORD',
  carModel:'MUSTANG',
  carYear:'2000',
  categoryId:'3',
  userId:'2',

},

{
      name:'Espejo Retrovisor',
      price:'1500',
      description:'Rodado para autos de carrera',
      quantity:'4',
      brand:'Pirelli',
      image:'/public/images/retrovisor.jpg',
      original:'SI',
      piecenumber:'12354655',
      carBrand:'VWwagen',
      carModel:'JETTA',
      carYear:'2002',
      categoryId:'1',
      userId:'3',

}])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null,{});
  }
};
