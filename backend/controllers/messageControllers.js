// Author Name : Hadiqa khan
// Date of generation : 5 April 2022
// Date of last revision : 12-May-2022
// Version number: 3
const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel")
const User = require("../models/userModel")
const sendMessage = asyncHandler (async(req,res)=> {
 const {content,chatId} = req.body;
 console.log(req.body);
 if (!content || !chatId)
 {
     console.log("Invalid Data Passed into requrst")
     return res.sendStatus(400);
 }

  var newMessage= {
      sender:req.user._id,
      content: content,
      chat: chatId,

  };
  try{
    var message = await Message.create(newMessage);
    message = await message.populate("sender","name picture");
     //populating instance of mongoose class

     message = await message.populate("chat")
     message = await User.populate(message,{

        path:'chat.users',
        select:'name picture email',

     })
    await Chat.findByIdAndUpdate(req.body.chatId,{
        latestMessage:message,
    })
    res.json(message);
  }
  catch(error)
  {
        res.status(400)
        throw new Error ("Failed to Send Message")
  }
});

const allMessages = asyncHandler(async(req,res) =>{
     try { 
         const messages = await Message.find({chat:req.params.chatId})
         .populate("sender","name picture email")
         .populate("chat");
          res.json(messages);
  
         
     } catch (error) {
         res.status(400)
         throw new Error(error.message)
         
     }
})
module.exports={sendMessage,allMessages};