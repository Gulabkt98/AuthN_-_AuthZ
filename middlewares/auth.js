// auth isStudent,isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

//middleware for authentication
exports.auth = (req,res,next)=>{
    try{
        ///fetch token from req body
        //we can find token by any other way
        const  token = req.body.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token is missing ",
            })
        }

        // verify the token
        try{
            const decode= jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            });
        }
        next();


    }
    catch(error){
         return res.status(401).json({
            success:false,
            message:"Error while auth"
         });
    }
}

//protected route for student
exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role!="Student"){
            return res.status(401).json({
                success:false,
                message:"This is a procted route for student",
            })
        }
        next();

    }
    catch(error){
          return res.status(500).json({
            success:false,
            message:"USer role is not matching",
          })
    }
}

//Admin middleware
exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a procted route for student",
            })
        }
        next();

    }
    catch(error){
          return res.status(500).json({
            success:false,
            message:"USer role is not matching",
          })
    }
}