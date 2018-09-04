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

router.get('/sort', (req, res, next) => {
    let sortFlag = Number(req.query.sort)
    products.find({}).sort({'price': sortFlag}).exec((err, docs) => {
        if (err) {
            console.log(err)
        }
        if (docs.length > 0) {
            res.json({
                status: 1,
                message: 'sort success',
                data: docs
            })
        }
    })
})

router.get('/filter', (req, res, next) => {
    let min = req.query.min
    let max = req.query.max
    products.find({'price': {$gt: min, $lte: max}}).exec((err, docs) => {
        if (err) {
            console.log(err)
        }
        if (docs.length > 0) {
            res.json({
                status: 1,
                message: 'filter success',
                data: docs
            })
        } else {
            res.json({
                status: 0,
                message: '没有在当前价格范围内的商品',
                data: docs
            })
        }
    })
})

module.exports = router