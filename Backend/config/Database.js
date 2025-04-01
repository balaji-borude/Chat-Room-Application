const mongoose = require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database is Connected succesfully");
    })
    .catch((error)=>{
        console.log("issue in Database connection");
        console.log(error);
        process.exit(1)
    })
};
