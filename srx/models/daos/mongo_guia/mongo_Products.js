const MongoContainer = require('./container_mongo')
const Product = require("../Schemas/ProductsSchema");

class MongoProductDao {
    productManager = new MongoContainer(Product);

     getAll = async () => {
        return await this.productManager.getAll();
    }
    save = async (body) => {
        return await this.productManager.save(body);
    }
    getById = async (id)=>{
        return await this.productManager.getById(id);
    }
    delete = async (id) => {
        return await this.productManager.delete(id);
    }
    UploadById = async (id,body) => {
        return await this.productManager.UploadById(id,body);
    }
}
module.exports = MongoProductDao