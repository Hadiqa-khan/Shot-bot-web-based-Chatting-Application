// Author Name : Hadiqa Khan
// Date of generation : 11 April 2022
// Date of last revision : -
// Version number: 1
const mongoose = require('mongoose');
   // purpose: This is the Message Model schema which we have used. 
   // expected output: Schema is maped to Mongo
const messageModel = mongoose.Schema(
    {
        sender:{ type:mongoose.Schema.Types.ObjectId, ref : "User"},
        content: { type:String,trim:true},
        chat: {type:mongoose.Schema.Types.ObjectId, ref:"Chat"},
    },
    {
        timestamps:true,
    }

);
const Message=mongoose.model("Message",messageModel);
module.exports= Message;