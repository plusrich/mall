const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

mongoose.connect('mongodb://localhost:27017/shop')

const productSchema = new Schema({
    _id: ObjectId,
    productId: Number,
    productNam: String,
    price: Number,
    productImage: String
})

let products = mongoose.model('products', productSchema)

module.exports = products