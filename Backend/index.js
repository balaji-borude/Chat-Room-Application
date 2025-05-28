/* eslint-disable no-undef */
 const express = require("express");
 const app = express(); // application create keli \
 
 const { createServer } = require('node:http');
 const server = createServer(app); // Create HTTP server for Express --> this is for websocket

 require("dotenv").config();
 const cookieParser = require('cookie-parser');
  const cors = require("cors"); // Import CORS middleware for handling cross-origin requests
 
  // database conncetion la call karayche 
  require("./config/Database").connect(); 
 
  // Middlewares 
 app.use(cookieParser()); 

 app.use(express.json())
  // app.use(cors());
  app.use(cors({
  origin: "http://localhost:5173", // backend only get request from this origin ONLY 
  credentials: true
}));
  
// socket.io che connection la call kele 
const { initSocket } = require('./config/Socket');
initSocket(server);


  // route la import kele
  const userRoute = require("./route/User");
  const roomRoute = require("./route/Room")
  const messageRoute = require("./route/Message");

 //  route la Mount karayche 
  app.use("/api/v1",userRoute);
  app.use("/api/v1/rooms",roomRoute);
  app.use("/api/v1/message",messageRoute)

  const PORT = process.env.PORT;

  app.get("/", (req,res)=>{
    // res.send(`<h1> This is Home Page --> Server and Socket is Running  </h1>`)
      return res.json({
        success:true,
        message:"Your server is Up and Running on  "
      })
  });


  // Start server and WebSocket together
  server.listen(PORT, () => {
    console.log(`Server and WebSocket Both Are running on PORT ${PORT}`);
  });

