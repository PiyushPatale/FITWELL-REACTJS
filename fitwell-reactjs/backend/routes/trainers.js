const express=require('express')
const router=express.Router()

const TrainerService = require('../services/TrainerService')
require('dotenv').config()

/**
 * @swagger
 * tags:
 *   - name: trainers
 *     description: routes for all orders
 * /api/trainer/createTrainer:
 *   post:
 *     tags:
 *       - trainers
 *     summary: Create a trainer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Trainer added successfully
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
router.post('/createTrainer', async(req, res)=>{
    // console.log("backend : welcome", req.body);
    const response=await TrainerService.createTrainer(req.body);
    return res.send(response); 
})

/**
 * @swagger
 * /api/trainer/deleteTrainer:
 *   post:
 *     tags:
 *       - trainers
 *     summary: Delete a trainer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainerid:
 *                 type: string
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
 */
router.post('/deleteTrainer', async(req, res)=>{
    const response=await TrainerService.deleteTrainer(req.body);
    return res.send(response); 
})

/**
 * @swagger
 * /api/trainer/getAllTrainers:
 *   post:
 *     tags:
 *       - trainers
 *     summary: Get all trainers
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Trainers fetched successfully
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
router.post('/getAllTrainers', async(req,res)=>{
    const response=await TrainerService.getAllTrainers(req.body);
    return res.send(response);
})

/**
 * @swagger
 * /api/trainer/updateTrainer:
 *   put:
 *     tags:
 *       - trainers
 *     summary: Update Trainer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 format: mongo-id
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               gender:
 *                 type: string
 *               salary:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Trainer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the update was successful
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the update
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there was an error
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue
 */
router.put('/updateTrainer', async(req, res)=>{
    // console.log(req.body);
    const response=await TrainerService.updateTrainer(req.body);
    return res.send(response); 
})


module.exports=router;