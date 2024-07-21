const mongoose=require('mongoose')
const { Schema } = mongoose;


const UserSchema= new Schema({
    name:{ 
        type:String,
        required:true, 
    },  
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    DateOfJoin:{
        type:Date,
        default:Date.now 
    },
    age:{
        type:Number, 
        required:true,
    },
    expirydate:{
        type:Date,
        default:Date.now()+30*24*60*60*1000,
    },
    gender:{  
        type:String, 
        required:true,
    },
    weight:{
        type:Number,
        required:true,
    },
    height:{
        type:Number,
        required:true,
    },
    image:{
        type:String, 
    },
})

const res = UserSchema.index({email:1},{unique:true});

let user=mongoose.model('user', UserSchema)

module.exports=user