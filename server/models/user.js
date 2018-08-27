const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

mongoose.connect('mongodb://localhost:27017/mall')

let userSchema = new Schema({
    _id: ObjectId,
    userName: String,
    userPwd: String
})

let users = mongoose.model('users', userSchema)

module.exports = users

