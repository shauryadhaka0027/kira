const express=require('express');
const { connection } = require('./config/db');
const app=express();
require("dotenv").config()
 const {authRouter}=require("./Route/authRoute");
const {productRouter}=require("./Route/productRoute")
const cookieParser = require('cookie-parser');
 const {blacklist}=require("./blacklist")
const cors=require("cors");




app.use(cors({
    origin: ["http://127.0.0.1:5173"],
    methods:["GET","POST","DELETE","PATCH"],
    credentials: true
  }));
  
app.use(express.json())
app.use(cookieParser());
app.use("/user",authRouter)
app.use("/product",productRouter)
const PORT=process.env.PORT

app.get("/",(req,res)=>{
    res.send({"msg":"homepage"})
})
app.get('/test', (req, res) => {
    console.log(req.cookies);
    res.send('Check console for cookies');
});

app.get("/logout",async(req,res)=>{
       const token = req.cookies["token"] ||  req.headers.authorization
       try {
           blacklist.push(token)
           res.send({"msg":"user is logout"})
       } catch (error) {
           res.send({"msg":error})
       }
   })

app.listen(PORT,async()=>{

try {
    await connection
    console.log("db is conncted")
    console.log("server is connected")
} catch (error) {
    res.status(400).send({"msg":error})
}
})