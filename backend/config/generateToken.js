// Author Name : Hadiqa khan
// Date of generation : 1 April 2022
// Date of last revision : -
// Version number: 1
const jwt = require('jsonwebtoken')
 //Input: Id of the user which is uato generated such as 617a077e18c25468bc7c4dd
   // purpose: generates a encrypted token for each user against its identity
   // expected output: jwt token
 const generateToken = (id) =>{
     return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: "30d"},)
 };
 module.exports = generateToken