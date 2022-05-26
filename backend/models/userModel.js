// Author Name : Hadiqa Khan
// Date of generation : 11 April 2022
// Date of last revision : -
// Version number: 1
const mongoose = require("mongoose");
   // purpose: This is the User Model schema which we have used. Bcrypt is also used 
   //to store the password in encrypted form to Database
   // expected output: Schema is maped to Mongo
const bcrypt = require("bcryptjs")
const UserSchema=mongoose.Schema(
    {
        name: { type:String, required:true},
        email : {type:String,required:true , unique:true},
        password : {type:String,required:true },
        picture : {
            type:String,
          
            default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
    },
    {
        timestamps:true,
    }

);
UserSchema.methods.matchPassword= async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password)
}
UserSchema.pre('save', async function(next){
    if(!this.isModified)
    {   
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})
const User=mongoose.model("User",UserSchema);
module.exports = User;