const express=require("express")
const authRouter=express.Router();
const bcrypt=require('bcrypt');
const { AuthModel } = require("../Model/authModel");
const jwt=require("jsonwebtoken")
require('dotenv').config()
const acces_token_key=process.env.acces_token_key


authRouter.post("/signup",async(req,res)=>{
    const {userName,email,password}=req.body
    try {
      bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
            res.send({"msg":err})
        }else{
            const data=new AuthModel({email,password:hash,userName})
            await data.save()
            res.send({msg:"new user is created "})
        }
      })  
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

authRouter.post("/login",async(req,res)=>{
   const {email,password}=req.body;
   try {
    const data= await AuthModel.findOne({email});
    if(data){
        bcrypt.compare(password,data.password,async(err,result)=>{
            if(result){
                const token=jwt.sign({UserId:data.id,user:data.userName},acces_token_key,{expiresIn:"5h"})
                res.cookie("token", token,{
                    maxAge: 1000 * 60 * 60 *8 , 
                   
                    sameSite: 'none',
                    httpOnly:true
                });
                res.status(200).send({"msg":"Login succesfully","token":token})
            }else{
                res.send({"msg":"password not match"})
            }
        })
    }
   } catch (error) {
    res.send({"msg":error})
   }
})



module.exports={authRouter}