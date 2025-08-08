  const express =require("express");
  const app = express();

  //
  require("dotenv").config();
  const PORT =process.env.PORT || 4000;
  
  //middlware
  app.use(express.json());

  //import routes and mount
  const user= require("./routes/user");
  app.use("/api/v1",user);

  //connect with databse
  const connectdb  = require("./config/database");
  connectdb();

  //activate server
  app.listen(PORT,()=>{
    console.log(`server started sucessfully :${PORT}`);
  })
  