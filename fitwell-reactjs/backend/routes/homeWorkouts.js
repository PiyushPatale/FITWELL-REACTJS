const express=require('express')
const router=express.Router()
const WorkoutService = require('../services/WorkoutService')
require('dotenv').config()
const upload = require('../middlewares/workoutMulter')
const fs=require('fs')
const path = require('path')
// const redis = require('../utils/redis') 
// const {getRedisCachedWorkouts} = require('../middlewares/redisMiddlewares/getCachedWorkouts.js')

/**
 * @swagger
 * tags:
 *   - name: homeWorkouts
 *     description: routes for home workouts
 * /api/workout/getAllWorkouts:
 *   post:
 *     tags:
 *       - homeWorkouts
 *     summary: Get all workouts
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Workouts fetched successfully
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
router.post('/getAllWorkouts', async(req,res)=>{
    const response=await WorkoutService.getAllWorkouts(req.body);
    if(!response.error){
      const parsedData = await JSON.stringify(response.data)
      // await redis.set('workouts', parsedData, 'EX', 3000);
    }
    return res.send(response);
})
// router.post('/getAllWorkouts',getRedisCachedWorkouts, async(req,res)=>{
//   if(req.cachedWorkouts !== null && req.cachedWorkouts !== undefined){
//     const response =  {
//         error: false, 
//         msg: 'Products Fetched Successfully', 
//         data: req.cachedWorkouts
//     }
//     return res.send(response);
//   }
//   else{
//     const response=await WorkoutService.getAllWorkouts(req.body);
//     if(!response.error){
//       const parsedData = await JSON.stringify(response.data)
//       await redis.set('workouts', parsedData, 'EX', 3000);
//     }
//     return res.send(response);
//   }
// })

/**
 * @swagger
 * /api/workout/deleteWorkouts:
 *   post:
 *     tags:
 *       - homeWorkouts
 *     summary: Get all workouts
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Workouts fetched successfully
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
router.post('/deleteWorkout', async(req,res)=>{
  const response=await WorkoutService.deleteWorkout(req.body);
  return res.send(response);
})

/**
 * @swagger
 * /api/workout/uploadWorkouts:
 *   post:
 *     tags:
 *       - homeWorkouts
 *     summary: Upload workouts
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               workoutImg:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Workouts uploaded successfully
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
router.post('/uploadWorkouts',upload.array('workoutImg',5), async(req, res)=>{
  try{
    if(!req.files || req.files === undefined){
      return res.send({error:true, msg:'File Upload Error'});
    }
    req.body.img= {
      img0: {
          data: fs.readFileSync(path.join(__dirname + '/../uploads/workouts/' + req.files[0].filename)),
          contentType: 'image/png'
      }, 
      img1: {
          data: fs.readFileSync(path.join(__dirname + '/../uploads/workouts/' + req.files[1].filename)),
          contentType: 'image/png'
      },
      img2: {
          data: fs.readFileSync(path.join(__dirname + '/../uploads/workouts/' + req.files[2].filename)),
          contentType: 'image/png'
      },
      img3: {
          data: fs.readFileSync(path.join(__dirname + '/../uploads/workouts/' + req.files[3].filename)),
          contentType: 'image/png'
      },
      img4: {
          data: fs.readFileSync(path.join(__dirname + '/../uploads/workouts/' + req.files[4].filename)),
          contentType: 'image/png'
      }
  }
  }
  catch(err){
    console.log(err);
    return {error:true, msg:err.message}
  }
})


module.exports=router;