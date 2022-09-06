const express= require('express');
const router = express.Router();
const { productDAO } = require("../../models/daos/index.js");
const Product = require("../../models/daos/Schemas/ProductsSchema")
const { passportCall,  isAuthenticated, isAdmin } = require("../middlewares/middlewares")

router.get('/',isAuthenticated,async (req,res) =>{
    if (req.user != undefined) {
        await productDAO.getAll()
        .then(products => res.render('product.ejs', { products:products }))
    } else {
        res.render("login.ejs")
    }
    console.log(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
router.get('/:id',isAuthenticated,async (req,res) =>{
    let id = parseInt(req.params.id)
    let product = await productDAO.getById(id)
    res.json({
        product,
    })
    console.log(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
router.post('/',isAdmin,async (req,res) =>{   
    let body =req.body;
    const product = await productDAO.save(body);
    res.json({
        product,
        message: "Product Created"
    })
    console.log(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
router.put('/:id',isAdmin,async (req,res)=>{
    let id = req.params.id
    let product = req.body
    await productDAO.UploadById(id, product)
    res.json({
        product,
        message: 'Updated product',
    });
    console.log(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
router.delete('/:id', isAdmin, async (req, res) => {
    let id = req.params.id
    let product=await productDAO.delete(id)
    res.json({
        product,
        message:"Product Delete"
    })
    console.log(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
router.get('/admin',async (req,res)=>{
    res.render('admin.ejs')
    console.log(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
/*router.get('/:category',isAuthenticated,async (req,res) =>{
    if(req.user!=undefined){
        let productos = await productDAO.getAll();
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
    }else{
        res.render('login')
    }
    console.log(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})*/

module.exports = router;