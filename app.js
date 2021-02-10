// Requiero módulos
const path = require('path');
const express = require('express');
const app = express();
const methodOverride = require('method-override');

// Configuro el directorio de recursos estaticos
app.use(express.static('public'));
// Configuro EJS
app.set('view engine', 'ejs');
app.set('views','./src/views');

// Formularios
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Requiero los ruteadores
const main = require('./src/router/mainRouter');
const user = require('./src/router/userRouter');
const product = require('./src/router/productRouter');

// Vinculo el Modelo al Controlador
app.use('/', main);
app.use('/', user);
app.use('/', product);

// Levanto Servidor
app.listen(3000, () => { 

console.log("Reposto Online 🛠️ 🚘 🔥 en http://localhost:3000"); } );