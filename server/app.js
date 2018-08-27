const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const app = express()
const login = require('./routes/login')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('/', (req, res, next) => {
    let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})

app.use('/api/user', login)

app.listen(8000, () => {
    console.log('server runnig at http://localhost:8000')
})


