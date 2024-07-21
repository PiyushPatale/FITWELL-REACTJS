const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
    },  
    description:{
        type:String, 
        default:"Healthy Gym Product",
    },
    price:{
        type:Number,
    },
    category:{
        type:String,
    },
    img:
    {
        data: Buffer,
        contentType: String,
    }
   
})

productSchema.index({name:'text'});
productSchema.index({category:1});

let product = mongoose.model('product',productSchema);
module.exports= product;
