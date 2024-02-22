const express = require("express");
const { ProductModel } = require("../Model/productModel");
const productRouter = express.Router();
const { auth } = require("../Middleware/auth.middleware");

productRouter.post("/create", auth, async (req, res) => {
  try {
    const data = new ProductModel(req.body);
    await data.save();
    res.status(200).send({ "msg": "Product created successfully" });
  } catch (error) {
    res.status(400).send({ "error": error.message });
  }
});

productRouter.get("/",auth, async (req, res) => {
  try {
    const data = await ProductModel.find();
    res.send(data);
  } catch (error) {
    res.status(500).send({ "error": "Internal server error" });
  }
});

productRouter.get('/search', auth, async (req, res) => {
  try {
    const { _id } = req.query;
    if (!_id) {
      return res.status(400).json({ "error": 'UserId parameter is required' });
    }

    const products = await ProductModel.find({ _id });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ "error": "Internal server error" });
  }
});

productRouter.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ProductModel.findByIdAndUpdate(id, req.body);
    if (!data) {
      return res.status(404).send({ "error": "Product not found" });
    }
    res.send({ "msg": `Product updated successfully for Id ${id}` });
  } catch (error) {
    res.status(400).send({ "error": error.message });
  }
});

productRouter.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).send({ "error": "Product not found" });
    }
    res.send({ "msg": `Product deleted successfully for Id ${id}` });
  } catch (error) {
    res.status(400).send({ "error": error.message });
  }
});

module.exports = { productRouter };
