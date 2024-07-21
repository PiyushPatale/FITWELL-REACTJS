const User=require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


class UserServices{

    async createUser(reqData){
        try{
            let prevuser = await User.findOne({ email: reqData.email })
            if (prevuser) {
              return {error:true, msg:'Email Id already Registered.'}
            }
            const pass = reqData.password;
            const salt = bcrypt.genSaltSync(10);
            const secpass =  bcrypt.hashSync(pass, salt);
            let user = await User.create({
                name: reqData.name,
                email: reqData.email,
                password: secpass,
                age: reqData.age,
                gender: reqData.gender,
                weight: reqData.weight,
                height: reqData.height,
                image: reqData.image,
            })
            delete user.password;
            const data = {
                user: {
                    id: user._id,
                }
            }
            var authtoken = jwt.sign(data, process.env.JWT_SECRET);

            return {error:false, msg:'User Created Successfully!', data:user, authtoken:authtoken}
        }
        catch(error){
            return {error:true, msg:error.message};
        }
    }

    async userLogin(reqData){
        try{
            var email = reqData.email;
            var password = reqData.password;
            let user = await User.findOne({ email: email });
            if (!user) {
                return {error:true, msg:'Invalid Credentials'};
            }
            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return {error:true, msg:'Invalid Credentials'};
            }

            const data = {
                user: {
                    id: user.id,
                }
            }
            var authtoken = await jwt.sign(data, process.env.JWT_SECRET);
            
            const userDetails = {
                _id: user._id,
                name: user.name, 
                email: user.email,
                age: user.age,
                gender: user.gender,
                weight: user.weight,
                height: user.height,
                image: user.image, 
                DateOfJoin: user.DateOfJoin,
                expirydate:user.expirydate.toDateString(),
            }
            
            return {error:false, msg:'User LoggedIn Successfully!', data:userDetails, authtoken:authtoken};
        }
        catch(error){
            return {error:true, msg:error.message};
        }
    }

    

    async getAllUsers(){
        try{
            const users=await User.find().sort({_id:-1});
            if(!users){
                return {error:true, msg:'Internal Server Error'};
            }

            return {error:false, msg:'Users Fetched Successfully', data:users};
        }
        catch(error){
            return {error:true, msg:"Database Error"};
        }
    }

}
module.exports=new UserServices();