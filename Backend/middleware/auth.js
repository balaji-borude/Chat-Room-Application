/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');

require("dotenv").config();

// auth middlleware
exports.auth= async(req,res,next)=>{
    try {
        console.log("Entering in Auth the middleware ");
        // get token from cookie or header
        const token = req.cookies?.token; //req.header("Authorization").replace("Bearer ","");
        // get token from cookie --> need cookie parser --> req.cookies?.token || 
        console.log("Token in middleware ==>",token );

        // adding validation to token 
        if(!token){
            res.status(401).json({
                success:false,
                message:"UnAuthorized: No token is Available  "
            })                                                
        };

        try {
            const JWT_SECRET = process.env.JWT_SECRET;
            console.log("printing JWT_SECRET==> ",JWT_SECRET);
            
            // decode the token 
            const decode =  jwt.verify(token, JWT_SECRET);
            console.log("Printing Decoded token ---->" , decode);

            console.log(decode);
            req.user = decode;  
           

        } catch (error) {
              return res.status(401).json({
                success:false,
                message:'Token is invalid',
                error:error
            });

        };

        next(); // going to next middleware or controller  
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in Authentication "
        })
    }
}