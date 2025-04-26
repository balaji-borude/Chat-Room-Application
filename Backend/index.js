/* eslint-disable no-undef */
 const express = require("express");
 const app = express(); // application create keli 
 require("dotenv").config(); // dotenv file la acces karnyasathi
 const cookieParser = require('cookie-parser');

 const http = require("http");  // Import HTTP module (needed for Socket.IO)
  const cors = require("cors"); // Import CORS middleware for handling cross-origin requests
 const { initializeSocket } = require("./config/Socket");  // Import Socket.IO setup
 
 const server = http.createServer(app);  // Create HTTP server for Express

 app.use(express.json()); 
 app.use(cookieParser()); 

  app.use(cors());  


 // database conncetion la call karayche 
 require("./config/Database").connect(); 
 
  // route la import kele
  const userRoute = require("./route/User");
  const roomRoute = require("./route/Room")
  const messageRoute = require("./route/Message");

 //  route la Mount karayche 
  app.use("/api/v1",userRoute);
  app.use("/api/v1/rooms",roomRoute);
  app.use("/api/v1/message",messageRoute)

  const PORT = process.env.PORT;

  // Initialize Socket.IO
  initializeSocket(server);

 app.get("/", (req,res)=>{
   res.send(`<h1> This is Home Page sir </h1>`)
    return res.json({
      success:true,
      message:"Your server is Up and Running one  "
    })
 });


// Start server and WebSocket together
server.listen(PORT, () => {
  console.log(`Server and WebSocket Both Are running on PORT ${PORT}`);
});

