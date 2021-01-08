const path = require('path')
const express = require('express');
const app = express();

//configuro el directorio de recursos estaticos
app.use(express.static('public'));

app.listen(3000, () => { 
    console.log("=====================");
    console.log("=====================");
    console.log("http://localhost:3000");
    console.log("=====================");
    console.log("=====================");
    }
);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname ,'./views/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname ,'./views/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname ,'./views/register.html'));
});

app.get('/product-detail', (req, res) => {
    res.sendFile(path.resolve(__dirname ,'./views/productDetail.html'));
});


