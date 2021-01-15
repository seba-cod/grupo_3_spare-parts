// Requiero libreria y framework
const path = require('path');
const express = require('express');
const app = express();

// Configuro el directorio de recursos estaticos
app.use(express.static(path.resolve('./public')));

// Configuro EJS
app.set('view engine', 'ejs');
app.set('views','./src/views');

// // Requiero las rutas al router
const main = require('./src/router/mainRouter');
const user = require('./src/router/userRouter');
const product = require('./src/router/productRouter');

// Vinculo el Modelo al Controlador
app.use('/', main);
app.use('/', user);
app.use('/', product);

// Levanto Servidor
app.listen(3000, () => { 
    console.log("=====================");
    console.log("=====================");
    console.log("http://localhost:3000");
    console.log("=====================");
    console.log("=====================");
    }
);