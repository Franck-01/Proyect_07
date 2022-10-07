const mongoose = require('mongoose')

const messageCollection = 'messages_models'
const messageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  return: {type: Array, required: false}
})

const Chat = mongoose.model(messageCollection, messageSchema)

module.exports = Chat
