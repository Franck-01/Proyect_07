const mongoose = require('mongoose')

const cartCollection = 'carts_models'
const cartSchema = new mongoose.Schema({
  name: {type: String,required: true},
  email: { type: String, required: true },
  timestamp: { type: Date, required: true },
  items: {type: Array, required: true}
})

const Cart = mongoose.model(cartCollection, cartSchema)

module.exports = Cart
