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
            _id: ObjectId,
            recipient: '',
            location: '',
            phone: '',
            isDefault: Boolean,
            addressId: String,
        }
    ],
    orderList: [
        {
            _id: ObjectId,
            date: String,
            goods: [
                {
                    checked: Boolean,
                    price: Number,
                    productId: Number,
                    productImage: String,
                    productName: String,
                    quantity: Number,
                    subtotal: Number,
                    _id: ObjectId
                }
            ],
            totalPrice: Number,
            user: {
                id: String,
                name: String
            },
            address: {
                recipient: String,
                location: String,
                phone: Number,
                isDefault: Boolean,
                addressId: String
            }
        }
    ]
})

let users = mongoose.model('users', userSchema)

module.exports = users

