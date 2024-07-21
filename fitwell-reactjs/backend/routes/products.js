const express=require('express')
const router=express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ProductServices = require('../services/ProductServices')
const upload = require('../middlewares/productMulter')
const fs = require('fs')
const path = require('path')
// const {getRedisCachedProducts} = require('../middlewares/redisMiddlewares/getCachedProducts.js')
// const redis = require('../utils/redis') 
require('dotenv').config()

/**
 * @swagger
 * tags:
 *   - name: products
 *     description: routes for all products
 * /api/product/getProducts:
 *   post:
 *     tags:
 *       - products
 *     summary: Get all products
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.post('/getProducts', async(req,res)=>{
        const response=await ProductServices.getProducts();
        if(!response.error){
            const parsedData = await JSON.stringify(response.data)
            // await redis.set('products', parsedData, 'EX', 3000);
        }
        return res.send(response)
})
// router.post('/getProducts', getRedisCachedProducts, async(req,res)=>{
//     if(req.cachedProducts !== null && req.cachedProducts !== undefined){
//         const response =  {
//             error: false, 
//             msg: 'Products Fetched Successfully', 
//             data: {
//                 LatestCategory:req.cachedProducts.LatestCategory,
//                 NutrientsCategory:req.cachedProducts.NutrientsCategory,
//                 ProteinCategory:req.cachedProducts.ProteinCategory,
//                 EnergyCategory:req.cachedProducts.EnergyCategory,
//                 RecoveryCategory:req.cachedProducts.RecoveryCategory,        
//             }
//         }

//         return res.send(response);
//     }
//     else{
//         const response=await ProductServices.getProducts();
//         if(!response.error){
//             const parsedData = await JSON.stringify(response.data)
//             await redis.set('products', parsedData, 'EX', 3000);
//         }
//         return res.send(response)
//     }
// })



/**
 * @swagger
 * /api/product/getProductsList:
 *   post:
 *     tags:
 *       - products
 *     summary: Get products list
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Products list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.post('/getProductsList', async(req,res)=>{
    const response=await ProductServices.getProductsList();
    return res.send(response)
})

/**
 * @swagger
 * /api/product/deleteProduct:
 *   post:
 *     tags:
 *       - products
 *     summary: Delete a product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.post('/deleteProduct', async(req,res)=>{
    const response=await ProductServices.deleteProduct(req.body);
    return res.send(response)
})

/**
 * @swagger
 * /api/product/getProductsSearchResult:
 *   post:
 *     tags:
 *       - products
 *     summary: Get products search result
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filter:
 *                 type: string
 *               search:
 *                 type: string
 *     responses:
 *       200:
 *         description: Products search result fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.post('/getProductsSearchResult', async(req,res)=>{
    const response=await ProductServices.getProductsSearchResult(req.body);
    return res.send(response)
})

/**
 * @swagger
 * /api/product/addProduct:
 *   post:
 *     tags:
 *       - products
 *     summary: Add a product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.post('/addProduct', upload.single('productImage'), async(req, res)=>{
    try{
        let fileName = req.file ? req.file.filename : '';
        if(!fileName || fileName === undefined || fileName === ''){
            return res.send({error:true, msg:'File Upload Error'});
        }
        req.body.img={
            data: fs.readFileSync(path.join(__dirname + '/../uploads/products/' + req.file.filename)),
            contentType: 'image/png'
        }
        
        const response = await ProductServices.addProduct(req.body);
        return res.send(response);
    }
    catch(error){
        console.log(error);
        return {error:true, msg:error.message}
    }
})

module.exports=router;
