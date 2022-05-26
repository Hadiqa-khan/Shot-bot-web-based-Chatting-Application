// Author Name : Hadiqa khan
// Date of generation : 1 April 2022
// Date of last revision : 22-May-2022
// Version number: 12
const express = require("express");
const { chats } = require("../data/data");
const userRoutes = require("../routes/userRoutes");
const dotenv = require("dotenv");
const path = require("path");
const messageRoutes = require('../routes/messageRoutes')
const morgan = require("morgan");
const connectDB = require("../config/db");
const {notFound,errorHandler} = require("../middleware/errorMiddleware")
const chatRoutes = require("../routes/chatRoutes")
const app = express();
// app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   console.log(req.params.id);
//   const singlechat = chats.find((c) => c._id === req.params.id);
//   res.send(singlechat);
// });

//all the api calls and routes


app.use(morgan("tiny"));
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);
app.use(notFound);
app.use(errorHandler)
//PORT on which backend is running
const PORT = process.env.PORT || 5000;
//for socket programming
const server = app.listen(PORT,
  console.log(`Server Started on PORT ${PORT}...`))
const io = require('socket.io')(server,{
  pingTimeout:60000,//60 secs
  cors:{
    origin: "http://localhost:3000",
  },

});
//Create the connection
io.on("connection",(socket)=>{
  console.log("Connected to socket.io")
  //frontend will send some data and join room
  // For each usser different socket
  socket.on('setup',(userData)=>{
    socket.join(userData._id);
    socket.emit("connected");
  });
  //allow user to join chat
  socket.on('join chat',(room)=>{

    socket.join(room);
    console.log("User Joined Room : " + room);
  });
  socket.on('typing',(room)=>socket.in(room).emit('typing'));
  socket.on('stop typing',(room)=>socket.in(room).emit('stop typing'));

socket.on('new message',(newMessageRecieved)=>{
  var chat = newMessageRecieved.chat;
  if(!chat.users) return console.log("chat users not defined");
  chat.users.forEach((user) => {
    console.log(user);
    if(user._id == newMessageRecieved.sender._id) return;
    socket.in(user._id).emit('message recieved',newMessageRecieved);

  });
});
  socket.off('setup',()=>{
    console.log("USER DISCONNECTED");
    socket.leave(userData._id)

  });



})

