const db = require('../../database/models')

const STATUS_SUCCESS = 'success'
const STATUS_ERROR = 'error'
const STATUS_NOT_FOUND = 'not_found'

module.exports = {
    products: (req, res) => {
        db.products.findAll()
            .then(products => {
                res.json(products)
            })
            .catch(error => {
                res.status(500).json({
                        status: STATUS_ERROR,
                        error,
                    })
            })
        
    },
    productdetail: (req, res) => {
        const { id } = req.params

        db.products.findByPk(id, {
            include: 'categories'
        })
            .then(product => {
                
                if (!product) {
                    return res.status(404)
                    .json({
                        status: STATUS_NOT_FOUND
                    })
                    
                }

                res.status(200)
                    .json({
                        data: product,
                        status: STATUS_SUCCESS
                    })
            })
            .catch(error => {
                res
                    .status(500)
                    .json({
                        status: STATUS_ERROR,
                        error
                    })
            })
    },
    createproduct: (req, res) => {
        const body = req.body
        
        db.products.create(body)
            .then(product => {
                res.status(201)
                    .json({
                        data: product,
                        status: STATUS_SUCCESS
                    })
            })
            .catch(error => {
                res
                    .status(500).json({
                        status: STATUS_ERROR,
                        error
                    })
            })
    },
    update: (req, res)=> {
        const body = req.body

        db.products.update(body, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {

                db.Product.findByPk(req.params.id)
                    .then(product => {
                        res.status(201)
                            .json({
                                data: product,
                                status: STATUS_SUCCESS
                            })
                })

            })  
    },
    delete:(req, res) => {
        db.products.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.status(200)
                    .json({
                        status: STATUS_SUCCESS
                    })
            })
            .catch(error => {
                res.status(500)
                .json({
                    status: STATUS_ERROR,
                    error
                })
        })
}
}

         


