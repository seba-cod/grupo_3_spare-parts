// Requiero módulos
const path = require('path');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require ('express-session');
const auth = require ('./src/middleware/auth');
const cookieParser = require('cookie-parser');

// Configuro el directorio de recursos estaticos
app.use(express.static('public'));
// Configuro EJS
app.set('view engine', 'ejs');
app.set('views','./src/views');

//Seciones y cookies
app.use(session({
    secret: 'Spare Parts',
    resave: false, // no vuelve a guardar si no hay cambios
    saveUninitialized: true, // guarda sessiones aunque todavía no haya datos
}));
//requiero middelware
app.use(auth);

//Cookie parser
app.use(cookieParser());

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