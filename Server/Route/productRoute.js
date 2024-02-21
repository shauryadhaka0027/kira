const express=require("express");
const { ProductModel } = require("../Model/productModel");
const productRouter=express.Router();
const {auth}=require("../Middleware/auth.middleware")


productRouter.post("/create",auth,async(req,res)=>{
try {
    const data= new ProductModel(req.body)
    await data.save()
    res.status(200).send({"msg":"product is create"})
} catch (error) {
    res.status(400).send({"msg":error})
}
})
productRouter.get("/",auth,async(req,res)=>{
    try {
        const data= await ProductModel.find();
        res.send(data)
    } catch (error) {
        res.send({"Msg":error})
    }
})
productRouter.get('/search',auth, async (req, res) => {
    try {
      const { UserId } = req.query;
      if (!UserId) {
        return res.status(400).json({ message: 'UserId parameter is required' });
      }
  
      const products = await ProductModel.find({ UserId });
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
productRouter.patch("/update/:id",auth,async(req,res)=>{
    const {id}=req.params
  try {
    const data= await ProductModel.findByIdAndUpdate(id,req.body)
    res.send({"msg":`product has been updated by Id ${id}`})
  } catch (error) {
    
  }
})
productRouter.delete("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params
try {
    await ProductModel.findByIdAndDelete(id)
    res.send({"msg":`product has been deleted by Id ${id}`})
} catch (error) {
    
    res.send({"msg":error})
}
})


module.exports={productRouter}