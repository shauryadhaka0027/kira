const express=require("express")
const authRouter=express.Router();
const bcrypt=require('bcrypt');
const { AuthModel } = require("../Model/authModel");
const jwt=require("jsonwebtoken")
require('dotenv').config()
const acces_token_key=process.env.access_token


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
authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await AuthModel.findOne({ email });
        if (data) {
            bcrypt.compare(password, data.password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ UserId: data.id, user: data.userName }, acces_token_key, { expiresIn: "5h" });
                    res.cookie('token', token, {
                        httpOnly: true,
                        sameSite: 'none',
                        secure:true
                    });
                    console.log(req.cookies["token"])
                    res.status(200).send({ "msg": "Login successfully", "token": token });
                } else {
                    res.status(401).send({ "msg": "Incorrect email or password" }); 
                }
            })
        } else {
            res.status(401).send({ "msg": "Incorrect email or password" }); 
        }
    } catch (error) {
        res.status(500).send({ "msg": "Internal server error" }); 
    }
});

authRouter.get("/search",async(req,res)=>{
    const {email}=req.query

    try {
        let data=await AuthModel.find({email})
        res.send({"msg":data})
    } catch (error) {
        return res.status(400).json({ message: error });
    }

})
authRouter.get("/",async(req,res)=>{
    

    try {
        let data=await AuthModel.find()
        res.send({"msg":data})
    } catch (error) {
        return res.status(400).json({ message: error });
    }

})



module.exports={authRouter}