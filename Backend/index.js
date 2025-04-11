/* eslint-disable no-undef */

 const express = require("express");
 const app = express(); // application create keli 
 require("dotenv").config(); // dotenv file la acces karnyasathi
 const cookieParser = require('cookie-parser');

 const http = require("http");  // Import HTTP module (needed for Socket.IO)
 const { initializeSocket } = require("./config/Socket");  // Import Socket.IO setup
 
 const server = http.createServer(app);  // Create HTTP server for Express

 app.use(express.json()); // middleware cha instance ghetla 
 app.use(cookieParser()); // middleware for cookie parser 

 // database conncetion la call karayche 
 require("./config/Database").connect(); // databse madhun connect method la call kel 
 
  // route la import kra 
   const userRoute = require("./route/User");
   // room route 
   const roomRoute = require("./route/Room")
  // message Route
  const messageRoute = require("./route/Message");

 //  route la Mount karayche 
  app.use("/api/v1",userRoute);

  // room route 
  app.use("/api/v1/rooms",roomRoute);
  
  // Message Route
  app.use("/api/v1/message",messageRoute)

 const PORT = process.env.PORT;

  // Initialize Socket.IO
  initializeSocket(server);

 app.get("/", (req,res)=>{
   //res.send(`<h1> This is Home Page sir </h1>`)
    return res.json({
      success:true,
      message:"Your server is Up and Running one  "
    })
 });


// Start server and WebSocket together
server.listen(PORT, () => {
  console.log(`Server and WebSocket Both Are running on PORT ${PORT}`);
});

