const express = require('express')
const mongoose = require('mongoose')
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
                //查询新增地址是否为默认地址，若是，则修改，若不是，直接返回
                if (doc) {
                    if (address.isDefault === true) {
                        let len = doc.addressList.length
                        for (var i = 0;i < len;i++) {
                            if(doc.addressList[i].addressId !== address.addressId) {
                                doc.addressList[i].isDefault = false
                            }
                        }

                        doc.save((err, newDoc) => {
                            if (err) {
                                console.log(err)
                            } else {
                                res.json({
                                    status: 1,
                                    data: newDoc,
                                    message: 'add address success'
                                })
                            }
                        })
                    } else {
                        res.json({
                            status: 1,
                            data: doc,
                            message: 'success'
                        })
                    }
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
                'addressId': addressId
            }
        }
    }).then((result) => {
        users.findById(userId, '-userPwd', (err, doc) => {
            if (err) {
                console.log(err)
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
                    message: '用户数据为空'
                })
            }
        })
    })
})


router.post('/setDefault', (req, res, next) => {
    let addressId = req.body.addressId
    let userId = req.body.userId

    users.findById(userId, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            let len = doc.addressList.length
            for (var i = 0;i < len;i++) {
                if (addressId === doc.addressList[i].addressId) {
                    doc.addressList[i].isDefault = true
                } else {
                    doc.addressList[i].isDefault = false
                }
            }

            doc.save((err, newDoc) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json({
                        status: 1,
                        data: newDoc,
                        message: 'set default address success'
                    })
                }
            })
        }
    })
})

module.exports = router