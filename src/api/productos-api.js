const db = require('../../database/models');


fetch(db.product.findAll)

.then(response => response.json())

.then(data => console.log(data));

    // app.get('/api/test', (req, res) => {
    // res.JSON({})
    // });
    


