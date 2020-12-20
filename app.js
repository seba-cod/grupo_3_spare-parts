const path = require('path')
const express = require('express');
const app = express();

//configuro el directorio de recursos estaticos
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname ,'views/index.html'));
});

app.listen(3000, () => { 
    console.log("=====================");
    console.log("http://localhost:3000");
    console.log("=====================");
    }
);
