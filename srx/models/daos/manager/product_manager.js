const Product = require("../Schemas/ProductsSchema.js")

class Product_Manager {
    save = async (product) => {
        if (!product.name || !product.model || !product.faction || !product.description || !product.url || !product.price || !product.stock) return { status: "error", message: "data missing" }
        let exist = await Product.find({ name: product.name })
        if (exist.length != 0) return { status: "error", message: "product already added" }
        await Product.insertMany(product)
        return {status:'success',message:'product added'}
    }
    getAll = async () => {
        let payload = await Product.find({}, { _v: 0 })
        return {status:"success", payload: payload}
    }
    getById = async (id) => {
        if (!id) return { status: "error", message: "ID nedded" }
        try {
            let result = await Product.find({ _id: id })
            return {status:'succes',payload:result}
        } catch (error) {
            return {status:'error',error:'ID not found'}
        }
    }
    uploadById = async (id, updateProduct) => {
        if (!id) return { status: "error", error: "ID nedded" }
        if (!updateProduct.name || !updateProduct.model || !updateProduct.faction || !updateProduct.description || !updateProduct.url || !updateProduct.price || !updateProduct.stock) return { status: "error", message: "data missing" }
        try {
            let result = await Product.updateOne({ _id: id }, { $set: updatedProduct })
            return {status:"success", payload:result}
        } catch (error) {
            return {status:"error", error:error}
        }
    }
    delete = async (id) => {
        if (!id) return { status: "error", error: "ID nedded" }
        try {
            let result = await Product.deleteOne({ _id: id })
            return {status:"success", payload:result}
        } catch (error) {
            return {status:"error", error:error}
        }
    }
}
module.exports= {Product_Manager}