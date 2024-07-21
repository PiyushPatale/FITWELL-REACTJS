const Workout = require('../models/HomeWorkout')


class WorkoutService{

    async getAllWorkouts(reqData){
        try{
            const workouts=await Workout.find().sort({_id:1});
            if(!workouts){
                return {error:true, msg:'Internal Server Error'};
            }

            return {error:false, msg:'Admins Fetched Successfully', data:workouts};
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }

    async addWorkout(reqData){
        try{
            if(!reqData.img){
                return {error:true, msg:'Image Parsing Error'};
            }

            const res = await Workout.create(reqData);

            if(!res){
                return {error:true, msg:'Internal Server Error'};
            }

            return {error:false, msg:'Workout added successfully', data:{}}
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }


    async deleteWorkout(reqData){
        try{
            const workoutid=reqData.workoutid;
            const workout= await Workout.findByIdAndDelete(workoutid);

            if(!workout){
                return {error:true, msg:'Internal Server Error'}
            }

            return {error:false, msg:'Workout Deleted Successfully', data:workout};
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }
    
}

module.exports=new WorkoutService();