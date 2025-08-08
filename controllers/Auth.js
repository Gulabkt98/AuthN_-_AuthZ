const bcrypt=require("bcrypt");
//for passwart encription 
//import model for interaction with mongoDB;
const User= require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// business logic for signup
 exports.signup = async (req,res)=>{
    try{
        // get data from req
        const {name,email,password,role}= req.body
        const existemail = await User.findOne({email});

        if(existemail){
          return  res.status(400).json({
                success:false,
                message:"This email user is already exist",
            })
        }
        
        //secure password 
        let hashpassword;
        try{
            hashpassword= await bcrypt.hash(password,10);

        }
        catch(err){
            res.status(500).json({
                success:false,
                message:"error while hash password",
            })

        }
        // create user and insert data in database 
        const user = User.create({
            name,email,password:hashpassword,role
        })

        return res.status(200).json({
            success:true,
            message:"user sign up sucessfully",
        })

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
          success:false,
          message:"error while user sign up",
        })


    }
}

// login page handler  
 exports.login = async (req,res)=>{
    try{
        // take data from  req
        const {email,password} =req.body;
         
        // check fill all data
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"please fill all data"
            })
        } 

        // check user had registred
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"user not registered"
            })
        }
         //  verify password and  generate jwt token
          const  payload={
            email:user.email,
            id: user._id,
            role:user.role

         }

         if(await bcrypt.compare(password,user.password)){
            // password matched create token
            let token = jwt.sign(payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h",
                                });

            let userr = user.toObject();                   
             userr.token=token;
             delete userr.password;


             const options ={
                expiresIn: new Date( Date.now()+3 * 24 * 60 * 60 * 1000 ),
                httpOnly:true,
             }
             
             res.cookie("aman",token,options).status(200).json({
                success:true,  
                token,
                user:userr,
                message:"user logged in successfully"
             })


         }  
         else{
            // password not matched
            return res.status(403).json({
                success:false,
                message:"password is Incorrect",
            })

         }     


    }
    catch(err){
         console.error(err);
        return res.status(500).json({
            success:false,
            message:"Error while login "
        })

    }
 }
