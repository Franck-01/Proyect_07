const mongoose = require('mongoose')

const rolesVal = {
  values: ['admin', 'user'],
  message: "{VALUE} It's not valid"
}

const userCollection = 'users_models'
const userSchema = new mongoose.Schema({
  name: { type: String },
  mail: { type: String },
  phone: { type: Number },
  age: { type: Number },
  role: {type: String, default: 'user', enum: rolesVal},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastLogin: {type: Date, default: Date.now()}
})

const User = mongoose.model(userCollection, userSchema)

module.exports = User
