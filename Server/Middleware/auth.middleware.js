const jwt =require("jsonwebtoken")
require("dotenv").config();
const acces_token_key=process.env.acces_token_key

const auth=(req,res,next)=>{
    const token =req.cookies["token"]
    console.log(token)
        if(token){
        jwt.verify(token,acces_token_key,(err,decode)=>{
            if(err){
                if (err.name === "TokenExpiredError") {
                    res.status(401).json({ "msg": "Token has expired" });
                } else {
                    res.status(401).json({ "msg": "Invalid token" });
                }
            }else{
                req.body.UserId=decode.UserId;
                req.body.user=decode.user
                console.log(decode,req.body)
                next()
            }
        })
    }
    else{
        res.send({"msg":"No token provided"})
    }
}
module.exports={auth}

