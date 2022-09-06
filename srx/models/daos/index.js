const { MongoProductDao } = require('./mongo_guia/mongo_Products.js')

let productDAO

const db = 'mongo'

switch (db) {
  case 'mongo':
    productDAO = new MongoProductDao()
    break
  default:
    break
}

module.exports = {productDAO}
