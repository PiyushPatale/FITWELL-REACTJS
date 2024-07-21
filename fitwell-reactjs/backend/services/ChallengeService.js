const Challenge = require('../models/Challenges')


class ChallengeService{

    async getAllChallenges(reqData){
        try{
            const challenges=await Challenge.find().sort({_id:1});
            if(!challenges){
                return {error:true, msg:'Internal Server Error'};
            }

            return {error:false, msg:'Admins Fetched Successfully', data:challenges};
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }

    async addChallenge(reqData){
        try{
            // console.log(reqData);
            if(!reqData.img){
                return {error:true, msg:'Image Parsing Error'};
            }

            const res = await Challenge.create(reqData);

            if(!res){
                return {error:true, msg:'Internal Server Error'};
            }

            return {error:false, msg:'Challenge added successfully', data:{}}
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }


    async deleteChallenge(reqData){
        try{
            const challengeid=reqData.challengeid;
            const challenge= await Challenge.findByIdAndDelete(challengeid);

            if(!challenge){
                return {error:true, msg:'Internal Server Error'}
            }

            const data = await Challenge.find();

            return {error:false, msg:'Challenge Deleted Successfully', data:data};
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }
    
}

module.exports=new ChallengeService();