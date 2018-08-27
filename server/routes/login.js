const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.post('/', (req, res, next) => {
    let user = req.body.user
    let pwd = req.body.pwd
})

module.exports = router