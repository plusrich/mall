const express = require('express')
const router = express.Router()
const users = require('../models/user')

router.get('/get', (req, res, next) => {
    let id = req.query.id
    //console.log(req.query)
    users.findById(id, '-userPwd', (err, doc) => {
        if (err) {
            res.json({
                status: -1,
                message: err
            })
        }
        if (doc) {
            res.json({
                status: 1,
                data: doc,
                message: 'success'
            })
        } else {
            res.json({
                status: 0,
                data: doc,
                message: 'user not have any address, please add one'
            })
        }
    })
})

router.post('/add', (req, res, next) => {
    let address = req.body.address
    let id = req.body.id
    
    //添加address到document中
    users.updateOne({'_id': id}, {
        '$addToSet': {
            'addressList': address
        }
    }).then((result) => {
        if (result) {
            //返回新的addressList
            users.findById(id, '-userPwd', (err, doc) => {
                if (err) {
                    res.json({
                        status: -1,
                        message: err
                    })
                }
                if (doc) {
                    console.log('return data')
                    res.json({
                        status: 1,
                        data: doc,
                        message: 'success'
                    })
                } else {
                    res.json({
                        status: 0,
                        data: doc,
                        message: 'user not have any address, please add one'
                    })
                }
            })
        }
    })
})


router.post('/delete', (req, res, next) => {
    let addressId = req.body.addressId
    let userId = req.body.userId
    users.updateOne({'_id': userId}, {
        $pull: {
            'addressList': {
                '_id': addressId
            }
        }
    }, (err, doc) => {
        if (err) {
            res.json({
                status: -1,
                message: err
            })
        }
        if (doc) {
            res.json({
                status: 1,
                data: doc,
                message: 'success'
            })
        } else {
            res.json({
                status: 0,
                data: doc,
                message: '空对象'
            })
        }
    })
})

module.exports = router