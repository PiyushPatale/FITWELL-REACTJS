const ContactUs=require('../models/contactform')
const PaymentSchema=require('../models/payments')
const UserSchema=require('../models/User')
const ReviewSchema=require('../models/review')
const CartSchema=require('../models/Cart')
const OrderSchema=require('../models/Order')
class UserActionServices{

    //submitting contact form :User login NOT required
    async contactUs(reqData){
        try{
            const name=reqData.name;
            const email=reqData.email;
            const phone=reqData.phone;
            const subject=reqData.subject;
            const message=reqData.message;
            // const date=req.body.name; 
            const data=await ContactUs.create({
                name:name,
                email:email, 
                phone:phone,
                subject:subject,
                message:message, 
            })
             
            if(!data){
                return {error:true, msg:'Internal Server Error'};
            }

            return {error:false, msg:'Form Submitted Successfully', data:data}
            
        }
        catch(err){
           return {error:true, msg:err.message}
        }
    }

    //Submitting review. User Login required
    async putReview(reqData){
        try{
            const comment=reqData.comment;
            const id=reqData._id;
            const image=reqData.image;
            const name=reqData.name;
            let review=await ReviewSchema.create({
                user:id,
                comment:comment,
                image:image,
                name:name,
            })
            if(!review){
                return {error:true, msg:'Internal Server Error'};
            }
            return {error:false, msg:'Review Submitted Successfully', data:review};
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }

    //Product add to card: User Login required
    async addToCart(reqData){
        try{
            const productid=reqData.productid;
            const userid=reqData.userid;
            let product=await CartSchema.create({
                user:userid,
                product:productid
            })
    
           if(!product){
            return {error:true, msg:'Internal Server Error'};
           }

           return {error:false, msg:'Added to Cart Successfully!', data:product};
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }
       
    //Checkouting User Cart: User Login required
    async checkoutcart(reqData){
        try{

            //Here this products should enter into order schema.
            const userid=reqData.userid;
            const finalamount=reqData.finalamount;
            const productIds=reqData.data;
            const address=reqData.address;

            if(userid === undefined || productIds === undefined || productIds.length == 0 || finalamount === undefined){
                return {error:true, msg:'Insufficient Data'};
            }

            productIds.forEach(async(id) => {
                await OrderSchema.create({ 
                   user:userid,
                   product:id,
                   amount:finalamount,
                   address:address
               })
            });

            const cartRes = await CartSchema.deleteMany({user:userid})
            if(!cartRes){
                return {error:true, mdg:'Internal Server Error'};
            }
            
            const newPayment=await PaymentSchema.create({
                user:userid,
                amount:finalamount,
            });

            if(!newPayment){
                return {error:true, mdg:'Internal Server Error'};
            }

            return {error:false, msg:'Cart Checkout Successfully', data:newPayment};
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }


    //Update Profile Updation: User Login Required
    async updateProfile(reqData){
        try{
            const id=reqData._id;
            const name=reqData.name;
            const age=reqData.age;
            const weight=reqData.weight;
            const height=reqData.height;
            const image=reqData.image;

            const user=await UserSchema.findById(id);
            if(!user){
                return {error:true, msg:'User Not Exist'};
            }
            console.log(image);
            const updated=await UserSchema.findByIdAndUpdate(id, {
                name:name, 
                age:age, 
                weight:weight,
                height:height,
                image:image
            }, {new:true}).select("-password")
            
            // console.log(updated);
            if(!updated){
                return {error:true, msg:'Internal Server Error'}
            }
            return {error:false, msg:'User Updated Successfully', data:updated};
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }

    //Getting Particular User Payments
    async getUserPayments(reqData){
        try{
            const id=reqData._id;
            const res=await PaymentSchema.find({user:id});
            if(!res){
                return {error:true, msg:'Internal Server Error'}
            }
            return {error:false, msg:'Payments Fetched Successfully', data:res};
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }

    async getUserCartProducts(reqData){
        try{
            const id=reqData.userid;
            
            const products=await CartSchema.find({
                user:id
            }).populate({
                path:'product',
                select:'_id name category price img description'
            });

            if(!products){
                return {error:true, msg:'Internal Server Error'}
            }

            return {error:false, msg:'Cart Products fetched Successfully!', data:products};
        }
        catch(error){
            return {error:true, msg:error.message}
        }
    }
}

module.exports=new UserActionServices();