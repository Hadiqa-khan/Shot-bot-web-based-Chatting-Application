// Author Name : Hadiqa khan
// Date of generation : 6 April 2022
// Date of last revision : 7-April-2022
// Version number: 2
//Input: this function will take the request and response from the body of page
// purpose: THis function will tackle the error 
// expected output: Error showed and error handler called
const notFound= (req,res,next) =>{
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(400)
    next(error);
}
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production " ? null : err.stack,
    });
}
module.exports= {notFound,errorHandler};