//chatname
//group chat
//list of users
//reference to latest msg 
//admin
// Author Name : Hadiqa Khan
// Date of generation : 10 April 2022
// Date of last revision : -
// Version number: 1
const mongoose = require('mongoose');

   // purpose: This is the chat Model schema which we have used. 
   // expected output: Schema is maped to Mongo
const chatModel = mongoose.Schema(
    {
        chatName:{   type:String,trim:true   },
        isgroupChat: { type:Boolean,default: false },
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref :"User",
        },
    ],

    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
    }
    ,
    {
    timestamps:true,
    }
);
const Chat = mongoose.model("Chat",chatModel);
module.exports= Chat;

