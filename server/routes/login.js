const express = require('express')
const router = express.Router()
const users = require('../models/user')

router.post('/', (req, res, next) => {
    let user = req.body.user
    let pwd = req.body.pwd
    users.findOne({userName: user, userPwd: pwd}, (err, doc) => {
        if (err) {
            res.json({
                status: -1,
                message: err
            })
        } else {
            if (doc) {
                res.json({
                    status: 1,
                    user: doc,
                    message: 'login success'
                })
            } else {
                res.json({
                    status: 0,
                    user: doc,
                    messgae: 'user name or password not correct'
                })
            }
        }
    })
})

module.exports = router