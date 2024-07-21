const express=require('express')
const router=express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserActionServices = require('../services/UserActionServices')
require('dotenv').config()
const upload = require('../middlewares/multer.js')
const path =require('path')
const cloudinary = require('../utils/cloudinary.js')

/**
 * @swagger
 * tags:
 *   - name: userActions
 *     description: routes for all userActions
 * /api/userActions/contactus:
 *   post:
 *     tags:
 *       - userActions
 *     summary: Submit a contact form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Form submitted successfully
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
 *       default:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */
router.post('/contactus', async(req,res)=>{
    const response=await UserActionServices.contactUs(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/userActions/putReview:
 *   post:
 *     tags:
 *       - userActions
 *     summary: Submit a review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               _id:
 *                 type: string
 *               image:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review submitted successfully
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
 *       default:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */
router.post('/putReview', async(req,res)=>{
    const response=await UserActionServices.putReview(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/userActions/addtocart:
 *   post:
 *     tags:
 *       - userActions
 *     summary: Add a product to the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productid:
 *                 type: string
 *               userid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product added to cart successfully
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
 *       default:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */
router.post('/addtocart', async(req,res)=>{
    const response=await UserActionServices.addToCart(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/userActions/checkoutcart:
 *   post:
 *     tags:
 *       - userActions
 *     summary: Checkout the user's cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *               finalamount:
 *                 type: number
 *               data:
 *                 type: array
 *                 items:
 *                   type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cart checked out successfully
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
 *       default:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */
router.post('/checkoutcart', async(req,res)=>{
    const response=await UserActionServices.checkoutcart(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/userActions/updateprofile:
 *   post:
 *     tags:
 *       - userActions
 *     summary: Update the user's profile
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
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
 *       default:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */
router.post('/updateprofile', upload.single('image'), async (req, res) => {
    try {
      if(req.file !== undefined && req.file !== null && req.file.path !== null && req.file.path !== undefined){
        const result = await cloudinary.uploader.upload(req.file.path);  
        req.body.image = result.secure_url;
      }  
      const response = await UserActionServices.updateProfile(req.body);
      return res.send(response);
    } catch (error) {
      console.error('Error uploading image and updating profile:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
});

//getting particular user payments
/**
 * @swagger
 * /api/userActions/get-user-payments:
 *   post:
 *     tags:
 *       - userActions
 *     summary: Get a user's payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payments fetched successfully
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
 *                   type: array
 *                   items:
 *                     type: object
 *       default:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */
router.post('/get-user-payments', async(req,res)=>{
    const response=await UserActionServices.getUserPayments(req.body);
    return res.send(response);
})

//getting particular user cart products
/**
 * @swagger
 * /api/userActions/get-user-cart-products:
 *   post:
 *     tags:
 *       - userActions
 *     summary: Get a user's cart products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cart products fetched successfully
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
 *                   type: array
 *                   items:
 *                     type: object
 *       default:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */
router.post('/get-user-cart-products', async(req,res)=>{
    const response=await UserActionServices.getUserCartProducts(req.body);
    return res.send(response);
})

module.exports=router;