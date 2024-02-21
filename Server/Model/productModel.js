const mongoose=require('mongoose')
const productschema=mongoose.Schema({
    title:{require:true ,type:String},
    desc:{require:true ,type:String},
    img:{require:true ,type:String},
    price:{require:true ,type:String},
    UserId:String,
    user:String
    
})

const ProductModel=mongoose.model("Product",productschema)

module.exports={ProductModel}