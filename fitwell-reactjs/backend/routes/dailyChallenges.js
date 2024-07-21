const express=require('express')
const router=express.Router()
const ChallengeService = require('../services/ChallengeService');
require('dotenv').config()
const upload = require('../middlewares/challengesMulter')
const fs=require('fs')
const path = require('path')
// const redis = require('../utils/redis') 
// const {getRedisCachedChallenges} = require('../middlewares/redisMiddlewares/getCachedChallenges.js')

/**
 * @swagger
 * tags:
 *   - name: dailyChallenges
 *     description: routes for daily challenges
 * /api/challenge/getAllChallenges:
 *   post:
 *     tags:
 *       - dailyChallenges
 *     summary: Get all challenges
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Challenges fetched successfully
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
router.post('/getAllChallenges', async(req,res)=>{
    const response=await ChallengeService.getAllChallenges(req.body);
    if(!response.error){
      const parsedData = await JSON.stringify(response.data)
      // await redis.set('challenges', parsedData, 'EX', 3000);
    }
    return res.send(response);
})
// router.post('/getAllChallenges', getRedisCachedChallenges, async(req,res)=>{
//   if(req.cachedChallenges !== null && req.cachedChallenges !== undefined){
//     const response =  {
//         error: false, 
//         msg: 'Products Fetched Successfully', 
//         data: req.cachedChallenges
//     }
//     return res.send(response);
//   }
//   else{
//     const response=await ChallengeService.getAllChallenges(req.body);
//     if(!response.error){
//       const parsedData = await JSON.stringify(response.data)
//       await redis.set('challenges', parsedData, 'EX', 3000);
//     }
//     return res.send(response);
//   }
// })

/**
 * @swagger
 * /api/challenge/deleteChallenge:
 *   post:
 *     tags:
 *       - dailyChallenges
 *     summary: Delete a challenge
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               challengeId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Challenge deleted successfully
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
router.post('/deleteChallenge', async(req,res)=>{
  const response=await ChallengeService.deleteChallenge(req.body);
  return res.send(response);
})

/**
 * @swagger
 * /api/challenge/uploadChallenge:
 *   post:
 *     tags:
 *       - dailyChallenges
 *     summary: Upload a challenge
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               challengeImg:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Challenge uploaded successfully
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
router.post('/uploadChallenge',upload.single('challengeImg'), async(req, res)=>{
  try{
    let fileName = req.file ? req.file.filename : '';
    if(!fileName || fileName === undefined || fileName === ''){
        return res.send({error:true, msg:'File Upload Error'});
    }
    req.body.img={
      data: fs.readFileSync(path.join(__dirname + '/../uploads/challenges/' + fileName)),
      contentType: 'image/png'
    }
    // console.log(req.body);
    const response = await ChallengeService.addChallenge(req.body);
    console.log(response);
    return res.send(response);
  }
  catch(err){
    console.log(err);
    return {error:true, msg:err.message}
  }
})





module.exports=router;