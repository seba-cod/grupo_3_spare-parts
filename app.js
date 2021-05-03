/*  ------------------------------------------------- REQUIRES -------------------------------------------------- */
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookie = require('cookie-parser');
const cors = require('cors');
const favicon = require('serve-favicon');
// TODO eliminar ese favicón, se mantiene el mismo que en primera carga
// REQ. DE RUTAS
const main = require('./src/router/mainRouter');
const user = require('./src/router/userRouter');
const product = require('./src/router/productRouter');
const api = require('./src/router/apiRouter')
const cart = require('./src/router/cartRouter')


/*  -------------------------------------------- TEMPLATE ENGINE ------------------------------------------------ */
app.set('view engine', 'ejs');
app.set('views', './src/views');

/*  ---------------------------------------- MIDDLEWARES DE APLICACION ------------------------------------------ */

// CFG. DIRECTORIO ESTATICO
app.use(express.static('public'));
// CORS
app.use(cors())
// FAVICON
app.use(favicon('./public/images/favicon.ico'));

// REQ MIDDLEWARE USERS
const isLogged = require('./src/middleware/userLogged');
// const admin = require ('./src/middleware/authAdm');

// SESSION
app.use(session({
    secret: 'Spare Parts',
    resave: false,
    saveUninitialized: false
}));
// COOKIES
app.use(cookie());
app.use(isLogged);
// app.use(admin);

// FORMS
app.use(express.urlencoded({ 
    extended: false
}));
app.use(express.json());
app.use(methodOverride('_method'));



/*  -------------------------------------------------- RUTAS ---------------------------------------------------- */
app.use('/', main);
app.use('/user', user);
app.use('/product', product);
app.use('/api', api);
app.use('/cart', cart);


/*  ------------------------------------------- SERVIDOR ESCUCHANDO ---------------------------------------------- */
app.listen(3010, () => {
    console.log("Reposto Online 🛠️ 🚘 🔥 en http://localhost:3010");
});