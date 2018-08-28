const express = require('express')
const router = express.Router()
const products = require('../models/products')

router.get('/', (req, res, next) => {
    products.find({}, (err, docs) => {
        res.json({
            status: 1,
            products: docs,
            message: 'success'
        })
    })
})

module.exports = router