const mongoose = require('mongoose')

const orderCollection = 'order_models'
const orderSchema = new mongoose.Schema({
  items: { type: Array, required: true },
  numberOrder: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  status: { type: String, required: true },
  email: {type: String, required: true}
})
const Order = mongoose.model(orderCollection, orderSchema)

module.exports = Order
