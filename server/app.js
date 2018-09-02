const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const app = express()
const login = require('./routes/login')
const products = require('./routes/products')
const address = require('./routes/address')

let allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(path.resolve(__dirname, '../dist')))

app.use(allowCrossDomain)

app.get('/', (req, res, next) => {
    let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})

app.use('/api/user', login)
app.use('/api/goods', products)
app.use('/api/address', address)

app.listen(8000, () => {
    console.log('server runnig at http://localhost:8000')
})


