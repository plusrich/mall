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
    users.update({'_id': id}, {
        '$addToSet': {
            'addressList': address
        }
    }, (err, doc) => {
        if (err) {
            console.log(err)
        }
    })

    //返回新的addressList
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

router.post('/delete', (req, res, next) => {
    let addressId = req.body.addressId
    let userId = req.body.userId
    users.update({'_id': userId}, {
        $pull: {
            'addressList': {
                'addressId': addressId
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