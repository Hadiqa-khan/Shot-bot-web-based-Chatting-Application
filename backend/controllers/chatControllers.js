// Author Name : Hadiqa khan
// Date of generation : 5 April 2022
// Date of last revision : 22-May-2022
// Version number: 5
const asyncHandler = require('express-async-handler');
const Chat = require("../models/chatModel.js");
const User = require("../models/userModel")
const transporter = require('../middleware/emailMiddleware.js')
//responsible for one on one chat
const accessChat = asyncHandler(async(req,res) =>{
    const {userId}=req.body
    if (!userId)
    {
        console.log("UserId Parameter not send with request ")
        return res.sendStatus(400);
    }
    var isChat = await Chat.find({
        isGroupChat:false,
        $and:[
            { users:{$elemMatch:{$eq:req.user._id}} },
            { users: { $elemMatch:{$eq:userId}}}
        ],

    }).populate("users","-password").
    populate("latestMessage");
    isChat= await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name picture email",
    });
    if (isChat.length > 0)
    {
        res.send(isChat[0])
    }
    else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId],
        };
        try {
                const createdChat = await Chat.create(chatData)
                const FullChat = await Chat.findOne({_id:createdChat._id}).populate(
                    "users",
                    "-password")

                    res.status(200).send(FullChat);
        }
        catch(error)
        {
                res.status(400);
                throw new Error(error.message);
        }
    }

});

const fetchChats = asyncHandler(async(req,res)=>{
    try{
        Chat.find(
            {
                users:{$elemMatch:{$eq: req.user._id}}

            }
        ).populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt: -1})
        .then(async (results)=>{
            results= await User.populate(results,{
                path:"latestMessage.sender",
                select:"name picture email",
            });
            res.status(200).send(results);
        })
        }
    catch(error){
        res.status(400)
        throw new Error(error.message)

    }
});

const createGroupChat = asyncHandler(async(req,res)=>{
    console.log(req.body);
    
    if(!req.body.users || !req.body.name)
    {
        return res.status(400).send({message:"Please fill all the fields"});
    }
    var users=JSON.parse(req.body.users);
    var mail=JSON.parse(req.body.mail);
    if(users.length <2){
     return res
      .status(400)
      .send("For Group Chat more than 2 users are required")
    }
    users.push(req.user);
    try{

        const groupChat= await Chat.create({
            
            chatName:req.body.name,
            users:users,
            isgroupChat:true,
            groupAdmin:req.user
        });
        mail.map((mail)=> {
            console.log("CHECK");
            console.log(mail);

            let mailInfo = {
                from: "metachat.404@gmail.com",
                to: mail,
                subject: "Hey You are added in this Group "+ req.body.name,
                text: `Hey , You are added in the group chat , if you know the user visit your Account. 
                If you don't know the user you can leave the Group anytime by clicking Leave Group`,
              };
              transporter.sendMail(mailInfo, (error, info) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email Sent:" + info.response());
                }
              });

        })
        const fullGroupChat = await Chat.findOne({_id:groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password")
    res.status(200).json(fullGroupChat)

    }
    catch(error){
        res.status(400)
        throw new Error(error.message)
 
    }
});
const renameGroup = asyncHandler(async(req,res)=>{
    const{chatId, chatName} =req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },{
            new:true,
        }

    ).populate("users","-password")
    .populate("groupAdmin","-password")
    if(!updatedChat)
    {
        res.status(404);
        throw new Error(error.message)

    }
    else{
        res.json(updatedChat);
    }

});
const addToGroup = asyncHandler(async(req,res)=>{
    const { chatId,userId} = req.body;
    const added = await Chat.findByIdAndUpdate(chatId,{
        $push:{users:userId},
    }
        ,
        {new:true}
    ).populate("users","-password")
    .populate("groupAdmin","-password")
    if(!added){
        res.status(400);
        throw new Error("Chat not found");

    }
    else{
        res.json(added);
    }
});

const removeFromGroup = asyncHandler( async(req,res)=>{
    const { chatId,userId} = req.body;
    const removed = await Chat.findByIdAndUpdate(chatId,{
        $pull:{users:userId},
    }
        ,
        {new:true}
    ).populate("users","-password")
    .populate("groupAdmin","-password")
    if(!removed){
        res.status(400);
        throw new Error("Chat not found");

    }
    else{
        res.json(removed);
    }

}

)
module.exports = { accessChat, fetchChats ,createGroupChat,renameGroup,addToGroup,removeFromGroup};