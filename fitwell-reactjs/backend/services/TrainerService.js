const Trainer=require('../models/Trainer')


class TrainerService{
    async createTrainer(req){
        // console.log("🚀 ~ TrainerService ~ createTrainer ~ req:", req)
        try{

            let trainer=await Trainer.create(req)
            // console.log("🚀 ~ TrainerService ~ createTrainer ~ trainer:", trainer)
            if(!trainer){
                return {error:true, msg:"Internal Server Error"}
            }

            return {error:false, msg:'Trainer Added Successfully', data:trainer}
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }
    
    async deleteTrainer(reqData){
        try{
            const trainerid=reqData.trainerid;
            const trainer=await Trainer.findById(trainerid);
            if(!trainer){
                return {error:true, msg:'Trainer Not Exist'}
            }
            let deleted=await Trainer.findByIdAndDelete(trainerid);
            return  {error:false, msg:'Trainer Deleted Successfully', data:deleted}
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }

    async getAllTrainers(reqData){
        try{
            const trainers=await Trainer.find().sort({_id:1}).limit(4);
            if(!trainers){
                return {error:true, msg:'Internal Server Error'};
            }

            return {error:false, msg:'Admins Fetched Successfully', data:trainers};
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }

    async updateTrainer(reqData){
        try{
            const trainerid=reqData._id;
            const trainer=await Trainer.findById(trainerid);
            if(!trainer){
                return {error:true, msg:'Trainer Not Exist'}
            }
            let updated=await Trainer.findByIdAndUpdate(trainerid, reqData, {new:true});
            return  {error:false, msg:'Trainer Updated Successfully', data:updated}
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }
    
}

module.exports=new TrainerService();