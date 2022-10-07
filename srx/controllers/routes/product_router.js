const express= require('express');
const router = express.Router();
const {Product_Manager} = require("../../models/daos/manager/product_manager")
const { productDao } = require("../../models/daos/index.js");
const { passportCall,  isAuthenticated, isAdmin } = require("../middlewares/middlewares")

router.get('/',async (req,res) =>{
    await productDao.getAll()
    .then(products => res.render('product.ejs', { products:products }))
    console.log(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
router.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    const product = await productDao.getById(id);
    res.json({
		product,
		message: 'success',
	});
})
router.post('/',isAdmin,async (req,res) =>{   
    let body =req.body;
    let product = await productDao.save(body)
    res.json({
        product,
        message: "Product Created"
    })
    console.log(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
router.put('/:id',isAdmin,async (req, res) => {
    let body =req.body;
    let id = parseInt(req.params.id)
    let product = await productDao.uploadById(id, body)
    res.json({
        product,
        message: 'Updated product',
    });
    console.log(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
router.delete('/:id',isAdmin,async (req, res) => {
    let id = parseInt(req.params.id)
    let product=await productDao.delete(id)
    res.json({
        product,
        message:"Product Delete"
    })
    console.log(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
router.get('/:category',async (req,res) =>{
        let productos = await productDao.getAll();
        let factionSec = productos.some(producto=>producto.faction === req.params.category);
        let IdSecure= productos.some(producto=>producto.id === req.params.category);
        if(factionSec ){
        let productCategory = productos.filter(element => {
            if(element.faction === req.params.category){
                return element;
            }
        })
        res.render('product.ejs',{products:productCategory})
        }else if(IdSecure){
            let productId = productos.filter(element => {
                if(element.id === req.params.category){
                    return element;
                }
            })
            res.render('product.ejs',{products:productId})
        }else{
            res.send({status:'error',message:'no existe dicha categoria'})
        }
    console.log(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})

module.exports = router;