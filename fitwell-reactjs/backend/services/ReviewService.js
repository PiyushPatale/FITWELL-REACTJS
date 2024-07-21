const Review=require('../models/review');

class ReviewService{
    async getAllReviews(){
        try{
            const reviews=await Review.find().sort({id:-1}).limit(10);
            if(!reviews){
                return {error:true, msg:'Internal Server Error'};
            }
            return {error:false, msg:'Reviews Fetched Successfully', data:reviews};
        }
        catch(error){
            return {error:true, msg:error.message};
        }
    }
}


module.exports=new ReviewService();