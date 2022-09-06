const Product = require("../Schemas/ProductsSchema.js")

class Product_Manager {
    save = async (product) => {
        if (!product.name || !product.model || !product.faction || !product.description || !product.url || !product.price || !product.stock) return { status: "error", message: "data missing" }
        let exist = await Product.find({ name: product.name })
        if (exist.length != 0) return { status: "error", message: "product already added" }
        await Product.insertMany(product)
        return {status:'success',message:'product added'}
    }
}