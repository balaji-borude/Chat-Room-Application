/* eslint-disable no-undef */
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


// Insted of these what else We can do is this ----> 
// exports.connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL);
//     console.log("Database is Connected successfully");
//   } catch (error) {
//     console.log("Issue in Database connection");
//     console.log(error);
//     process.exit(1);
//   }
// };
