 const express = require("express");
 const app = express(); // application create keli 

 app.use(express.json()); // middleware cha instance ghetla 

 require("dotenv").config();
 // dotenv file la acces karnyasathi

 // database conncetion la call karayche 
 require("./config/Database").connect(); // databse madhun connect method la call kel 

 // route la import kra 
   const route = require("./route/User");

 //  route la Mount karayche 
   app.use("/api/v1",route);

 const PORT = process.env.PORT;

 app.get("/", (req,res)=>{
   //res.send(`<h1> This is Home Page sir </h1>`)
    return res.json({
      success:true,
      message:"Your server is Up and Running one  "
    })
 })
 app.listen(PORT,()=>{
    //res.send("This is Home page")
    console.log(`App is Running on PORT ${PORT}`)
 })


