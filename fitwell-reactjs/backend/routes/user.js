const express=require('express')
const router=express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserServices = require('../services/UserServices')
require('dotenv').config()
const multer = require('multer')
const upload= require('../middlewares/multer.js')
const cloudinary = require('../utils/cloudinary.js')

/**
 * @swagger
 * tags:
 *   - name: user
 *     description: routes for all users
 * /api/userAuth/userLogin:
 *   post:
 *     tags:
 *       - user
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
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
 *                 authtoken:
 *                   type: string
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
router.post('/userLogin', async(req, res)=>{
    const response= await UserServices.userLogin(req.body);
    return res.send(response);
})


router.post('/updateDate', async(req, res)=>{
    const response= await UserServices.updateDate(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/userAuth/createUser:
 *   post:
 *     tags:
 *       - user
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: number
 *               gender:
 *                 type: string
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User created successfully
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
 *                 authtoken:
 *                   type: string
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
router.post('/createUser', upload.single('image'), async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);  
      req.body.image = result.secure_url;  
      const response = await UserServices.createUser(req.body);
      return res.send(response);
    } catch (error) {
      console.error('Error uploading image and creating user:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  });

/**
 * @swagger
 * /api/userAuth/getAllUsers:
 *   get:
 *     tags:
 *       - user
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Users fetched successfully
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
router.get('/getAllUsers', async(req,res)=>{
    const response=await UserServices.getAllUsers(); 
    return res.send(response);
})

router.use((err, req, res, next) =>{
    if (err instanceof multer.MulterError) {
        // Multer error occurred
        console.error(err.stack);
        res.status(400).send('Multer error: ' + err.message);
      } else {
        // Other types of errors
        console.error(err.stack);
        res.status(500).send('Something broke!');
      }
})


module.exports=router;