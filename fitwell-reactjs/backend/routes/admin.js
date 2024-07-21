const express=require('express')
const router=express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const AdminServices = require('../services/AdminServices')
require('dotenv').config()

/**
 * @swagger
 * tags:
 *   - name: admin
 *     description: Admin operations
 * /api/adminAuth/adminLogin:
 *   post:
 *     tags:
 *       - admin
 *     summary: Admin login
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
 *         description: Admin logged in successfully
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
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
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
 *                 data:
 *                   type: object
 */

router.post('/adminLogin', async(req, res)=>{
    const response= await AdminServices.adminLogin(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/adminAuth/createAdmin:
 *   post:
 *     tags:
 *       - admin
 *     summary: Create a new admin
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin created successfully
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
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
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
 *                 data:
 *                   type: object
 */
router.post('/createAdmin', async(req,res)=>{
    const response=await AdminServices.createAdmin(req.body);
    return res.send(response)
})

/**
 * @swagger
 * /api/adminAuth/getAllAdmins:
 *   get:
 *     tags:
 *       - admin
 *     summary: Get all admins
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Admins fetched successfully
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
 *                 data:
 *                   type: object
 */
router.get('/getAllAdmins', async(req,res)=>{
    const response=await AdminServices.getAllAdmins(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/adminAuth/getAllAdminTrainer:
 *   post:
 *     tags:
 *       - admin
 *     summary: Get all admin trainers
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Admin trainers fetched successfully
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
 *                 data:
 *                   type: object
 */
router.post('/getAllAdminTrainer', async(req,res)=>{
    const response=await AdminServices.getAllAdminTrainer(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/adminAuth/getAllAdminPayment:
 *   post:
 *     tags:
 *       - admin
 *     summary: Get all admin payments
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Admin payments fetched successfully
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
 *                   properties:
 *                     adminPayments:
 *                       type: array
 *                       items:
 *                         type: object
 *                     adminPaymentsHome:
 *                       type: array
 *                       items:
 *                         type: object
 *                     totalamount:
 *                       type: number
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
 *                 data:
 *                   type: object
 */
router.post('/getAllAdminPayment', async(req,res)=>{
    const response=await AdminServices.getAllAdminPayment(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/adminAuth/getAllAdminCustomer:
 *   post:
 *     tags:
 *       - admin
 *     summary: Get all admin customers
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Admin customers fetched successfully
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
 *                 data:
 *                   type: object
 */
router.post('/getAllAdminCustomer', async(req,res)=>{
    const response=await AdminServices.getAllAdminCustomer(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/adminAuth/getAllAdminFeedback:
 *   post:
 *     tags:
 *       - admin
 *     summary: Get all admin feedbacks
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Admin feedbacks fetched successfully
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
 *                 data:
 *                   type: object
 */
router.post('/getAllAdminFeedback', async(req,res)=>{ 
    const response=await AdminServices.getAllAdminFeedback(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/adminAuth/getAllAdminOrder:
 *   post:
 *     tags:
 *       - admin
 *     summary: Get all admin orders
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Admin orders fetched successfully
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
 *                   properties:
 *                     adminOrders:
 *                       type: array
 *                       items:
 *                         type: object
 *                     totalOrders:
 *                       type: number
 *                     adminOrdersHome:
 *                       type: array
 *                       items:
 *                         type: object
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
 *                 data:
 *                   type: object
 */
router.post('/getAllAdminOrder', async(req,res)=>{
    const response=await AdminServices.getAllAdminOrder(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/adminAuth/deleteTrainer/{id}:
 *   delete:
 *     tags:
 *       - admin
 *     summary: Delete a trainer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the trainer to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trainer deleted successfully
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
 *                 data:
 *                   type: object
 */
router.delete('/deleteTrainer/:id', async(req, res)=>{
    const trainerid = req.params.id;
    const response = await AdminServices.deleteTrainer({trainerid});
    return res.send(response);
})

/**
 * @swagger
 * /api/adminAuth/deleteCustomer:
 *   post:
 *     tags:
 *       - admin
 *     summary: Delete a customer
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
 *         description: Customer deleted successfully
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
 *                 data:
 *                   type: object
 */
router.post('/deleteCustomer', async(req, res)=>{
    const response = await AdminServices.deleteCustomer(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/adminAuth/deleteOrder:
 *   post:
 *     tags:
 *       - admin
 *     summary: Delete an order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
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
 *                 data:
 *                   type: object
 */
router.post('/deleteOrder', async(req, res)=>{
    const response = await AdminServices.deleteOrder(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/adminAuth/deleteFeedback:
 *   post:
 *     tags:
 *       - admin
 *     summary: Delete a feedback
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feedbackid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Feedback deleted successfully
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
 *                 data:
 *                   type: object
 */
router.post('/deleteFeedback', async(req, res)=>{
    const response = await AdminServices.deleteFeedback(req.body);
    return res.send(response);
})

module.exports=router;