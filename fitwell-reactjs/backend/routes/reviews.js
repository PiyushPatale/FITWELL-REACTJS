const express=require('express')
const router=express.Router()
const ReviewService = require('../services//ReviewService')
require('dotenv').config()

/**
 * @swagger
 * tags:
 *   - name: reviews
 *     description: routes for all reviews
 * /api/review/getAllReviews:
 *   post:
 *     tags:
 *       - reviews
 *     summary: Get all reviews
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Reviews fetched successfully
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
 */
router.post('/getAllReviews', async(req,res)=>{
    const response=await ReviewService.getAllReviews();
    return res.send(response);
})


module.exports=router