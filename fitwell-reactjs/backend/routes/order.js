const express=require('express')
const router=express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const OrderService = require('../services/OrderService')
const AdminServices = require('../services/AdminServices')
require('dotenv').config()

/**
 * @swagger
 * tags:
 *   - name: order
 *     description: routes for all orders
 * /api/order/createOrder:
 *   post:
 *     tags:
 *       - order
 *     summary: Create an order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *               name:
 *                 type: string
 *               img:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order created successfully
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
router.post('/createOrder', async(req,res)=>{ 
    const response=await OrderService.createOrder(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/order/deleteOrder:
 *   post:
 *     tags:
 *       - order
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
router.post('/deleteOrder', async(req,res)=>{
    const response=await OrderService.deleteOrder(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/order/getUserOrders:
 *   post:
 *     tags:
 *       - order
 *     summary: Get user orders
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
 *         description: Orders fetched successfully
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
router.post('/getUserOrders', async(req,res)=>{
    const response = await OrderService.getUserOrders(req.body);
    return res.send(response)
})


module.exports=router