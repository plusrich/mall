const express = require('express')
const router = express.Router()
const users = require('../models/user')

router.post('/add', (req, res, next) => {
    let order = req.body.order
    let userId = req.body.userId
    users.updateOne({'_id': userId}, {
        $push: {
            'orderList': order
        }
    }).then((result) => {
        if (result) {
            res.json({
                status: 1,
                message: '添加订单成功'
            })
        }
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router