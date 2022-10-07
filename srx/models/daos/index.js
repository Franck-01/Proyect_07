const MongoProductDao = require('./mongo_guia/mongo_Products')

let productDao

const db = 'mongo'

switch (db) {
  case 'mongo':
    productDao = new MongoProductDao()
    break
  default:
    break
}

module.exports = {productDao}
