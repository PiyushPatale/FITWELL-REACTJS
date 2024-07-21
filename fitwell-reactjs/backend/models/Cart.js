const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const CarttSchema=new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require:true,
      },
    product:{
        type:Schema.Types.ObjectId,
        ref:'product',
        required:true,
    }, 
})

let cart=mongoose.model('cart',CarttSchema)

module.exports=cart
