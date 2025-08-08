const express= require("express");
 const router =express.Router();


 //import controller
 const {login ,signup} =require("../controllers/Auth");
const { isStudent,auth,isAdmin } = require("../middlewares/auth");



 // define routes
 router.post("/login",login);
 router.post("/signup",signup);

 //testing procted route for single middleware
 router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to procted route for test"
    })
 })

 //Protected Route
 router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for students",
    });
 })

 router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to procted route for the Admin",
    });
 })


 //exports routes
 module.exports=router;
 