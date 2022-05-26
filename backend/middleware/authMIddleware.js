// Author Name : Hadiqa khan
// Date of generation : 5 April 2022
// Date of last revision : 10-May-2022
// Version number: 2
const jwt = require("jsonwebtoken")
const User=require("../models/userModel.js");
const asyncHandler = require('express-async-handler')
 // Input: this function will take the request and response from the body of page
   // purpose: This function will verfiy the user login by using JWT token
   // expected output: Authorization succesfful or throw error
const protect = asyncHandler(async(req,res,next)=>{

        let token;
         if(
             req.headers.authorization && 
             req.headers.authorization.startsWith("Bearer")

         )   
         {
             try {
                 token = req.headers.authorization.split(" ")[1];
                 const decoded = jwt.verify(token,process.env.JWT_SECRET);
                 req.user = await User.findById(decoded.id).select("-password"); 
                 next();
             }
             catch(error)
             {
                 res.status(401)
                throw new Error ("Not authorized , token failed");
             }
         }     
         if (!token)
         {
            res.status(401);
            throw new Error ("Not authorized , token failed");
         }
})
module.exports = {protect}
