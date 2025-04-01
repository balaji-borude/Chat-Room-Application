const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth middlleware
exports.auth= async(req,res)=>{
    try {
        // get token from cookie or header
        const token = req.cookies.token || req.header("Authorization").replace("Bearer ","");

        if(!token){
            res.status(401).json({
                success:false,
                message:"UnAuthorized: No token is Available  "
            })                                                
        };

        try {
            const JWT_SECRET = process.env.JWT_SCRET
            // decode the token 
            const decode  = jwt.verify(token,JWT_SECRET);
            req.user = decode;
        } catch (error) {
              return res.status(401).json({
                success:false,
                message:'Token is invalid',
                error:error
            });

        };
        next();

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in Authentication "
        })
    }
}