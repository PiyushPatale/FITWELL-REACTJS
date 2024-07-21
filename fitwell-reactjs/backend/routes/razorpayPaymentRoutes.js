const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const razorpayPayments = require('../models/razorpayPayments');
const connectDB = require('../db');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: "rzp_test_m7AmqAwlafnIao",
  key_secret: "pn3p3BQhQBoVM0fYcCH7qZYp",
});

connectDB();

/**
 * @swagger
 * tags:
 *   - name: razorPayPayments
 *     description: routes for razorPay Payments
 * /api/payments/create-order:
 *   post:
 *     tags:
 *       - razorPayPayments
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order_id:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/create-order', async (req, res) => {
  try {
    // console.log('Request body:', req.body);

    const { amount, currency } = req.body;

    const options = {
      amount,
      currency,
      receipt: 'receipt#1',
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    // console.log(order)

    const newOrder = new razorpayPayments({
      orderId: order.id,
      amount,
      currency
    });
    
    await newOrder.save();
    res.json({ order_id: order.id });
  } catch (error) {
    console.error('Error creating payment order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
