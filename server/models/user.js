const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

mongoose.connect('mongodb://localhost/users')

let userSchema = new Schema({
    _id: ObjectId,
    userName: String,
    userPwd: String
})

let users = mongoose.model('users', userSchema)

module.exports = users

