class MongoContainer {
    constructor(model) {
        this.model = model
    }
    async getAll() {
        try {
            return await this.model.find()
        } catch (err) {
            return err
        }
    }
    async getById(id) {
        try {
            return await this.model.find({_id:id})
        } catch (err) {
            return err
        }
    }
    async getBy(options){
		try{
			return this.model.findOne(options);
		}catch(err) {
            return err
        }
    }
	async save (user){
		try{
			let result = await this.model.create(user)
			return result?result.toObject() : null
		}catch(err) {
            return err
        }
	}
	async update(id,options){
		try{
			return await this.model.updateOne(id,options)
		}catch(err) {
            return err
        }
    }
    async UploadById(id,body){
		try{
            return await this.model.update({ _id: id }, {
                name: body.name,
                model: body.model,
                faction: body.faction,
                description: body.description,
                url: body.url,
                price: body.price,
                stock: body.stock
            });
		}catch(err) {
            return err
        }
    }
    async delete(id) {
		try{
			return await this.model.deleteOne({_id:id});
		}catch(err) {
            return err
        }
	}
}
module.exports = {MongoContainer}