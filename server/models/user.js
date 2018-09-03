const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

mongoose.connect('mongodb://localhost:27017/shop')

const userSchema = new Schema({
    _id: ObjectId,
    userName: String,
    userPwd: String,
    addressList: [
        {
            recipient: '',
            location: '',
            phone: '',
            addressId: ObjectId,
            isDefault: Boolean
        }
    ]
})

let users = mongoose.model('users', userSchema)

module.exports = users

