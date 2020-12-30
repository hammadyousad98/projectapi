const express = require("express");
let router = express.Router();
const validateproduct = require("../../middlewares/validateproduct");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");
var {Product} = require("../../models/product");
//get products
router.get("/", async (req,res)=>{
    console.log(req.user);
    let page = Number(req.query.page? req.query.page:1);
    let perpage = Number(req.query.perpage? req.query.perpage:10);
    let skipRecords = perpage*(page-1);
    let products = await Product.find().skip(skipRecords).limit(perpage);
    let total= await Product.countDocuments();
    return res.send({total,products});
});
//get single products
router.get("/:id", async (req,res)=>{
    try{
    let product = await Product.findById(req.params.id);
    if(!product)
    {
        return res.status(400).send("ID not found");
    }
    return res.send(product);
    } catch (err){
        return res.status(400).send("Invalid Product Id");
    }
});
//update a single record
router.put("/:id",validateproduct,auth,admin,async (req,res)=>{
    let product = await Product.findById(req.params.id);
    product.name = req.body.name;
    product.price = req.body.price;
    product.pid = req.body.pid;
    product.Link = req.body.Link;
    await product.save();
    return res.send(product);
});
//delete a single record
router.delete("/:id",auth,admin,async (req,res)=>{
    let product = await Product.findByIdAndDelete(req.params.id);
    return res.send(product);
});
//insert a record
router.post("/",validateproduct,auth,async (req,res)=>{
    let product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.pid = req.body.pid;
    product.Link=req.body.Link;
    await product.save();
    return res.send(product);
});


module.exports=router;