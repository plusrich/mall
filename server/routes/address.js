const express = require('express')
const router = express.Router()
const users = require('../models/user')

router.get('/get', (req, res, next) => {
    let id = req.query.id
    console.log(req.query)
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

module.exports = router