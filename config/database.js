const mongoose = require("mongoose");
 require("dotenv").config();

   const  connectdb =()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(
       console.log("DB connected is sucessfull"),
    )
    .catch((err)=>{
         console.log("DB is not connected"),
         console.error(err),
         process.exit(1)
         
    })    
 }
module.exports=connectdb;