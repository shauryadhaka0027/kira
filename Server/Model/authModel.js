const mongoose=require("mongoose")

const authSchema=mongoose.Schema({
    email:{require:true,unique:true,type:String},
    password:{require:true,type:String},
     userName:{require:true,type:String}
})

const AuthModel=mongoose.model("user",authSchema)
module.exports={AuthModel}