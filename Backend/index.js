/* eslint-disable no-undef */

 const express = require("express");
 const app = express(); // application create keli 
 require("dotenv").config(); // dotenv file la acces karnyasathi

 const http = require("http");  // Import HTTP module (needed for Socket.IO)
 const { initializeSocket } = require("./config/Socket");  // Import Socket.IO setup
 
 const server = http.createServer(app);  // Create HTTP server for Express

 app.use(express.json()); // middleware cha instance ghetla 


 // database conncetion la call karayche 
 require("./config/Database").connect(); // databse madhun connect method la call kel 

 // route la import kra 
   const route = require("./route/User");

 //  route la Mount karayche 
   app.use("/api/v1",route);

 const PORT = process.env.PORT;

  // Initialize Socket.IO
  initializeSocket(server);

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


