// Author Name : Hadiqa khan
// Date of generation : 1 April 2022
// Date of last revision : -
// Version number: 1
const mongoose = require("mongoose");
 // purpose: connect the database 
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};
module.exports = connectDB;
