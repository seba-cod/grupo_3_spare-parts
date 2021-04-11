// Requiero módulos
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookie = require('cookie-parser');

const favicon = require('serve-favicon');

app.use(favicon('./public/images/favicon.ico'));

// Configuro EJS
app.set('view engine', 'ejs');
app.set('views', './src/views');
// Configuro el directorio de recursos estaticos
app.use(express.static('public'));

// Middlewares de aplicacion
const isLogged = require('./src/middleware/userLogged');
// const admin = require ('./src/middleware/admin');

// Configuro Session
app.use(session({
    secret: 'Spare Parts',
    resave: false,
    saveUninitialized: false
}));
//Cookie parser
app.use(cookie());
app.use(isLogged);
// app.use(admin);

// Formularios
app.use(express.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));

// Requiero los ruteadores
const main = require('./src/router/mainRouter');
const user = require('./src/router/userRouter');
const product = require('./src/router/productRouter');

// Vinculo el Modelo al Controlador
app.use('/', main);
app.use('/user', user);
app.use('/product', product);

// Levanto Servidor
app.listen(3000, () => {

    console.log("Reposto Online 🛠️ 🚘 🔥 en http://localhost:3000");

});