// Author Name : Hadiqa Khan
// Date of generation : 21 May 2022
// Date of last revision : 22-May-2022
// Version number: 2
const nodemailer = require("nodemailer");
  // purpose: The nodemailer transporter var is used for sending email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "metachat.404@gmail.com",
    pass: "meta123456789",
  },
});

module.exports=transporter;