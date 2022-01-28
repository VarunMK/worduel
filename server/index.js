const app=require("express");
const server=require('http').createServer(app);
const Redis=require('redis');
const redisClient=Redis.createClient();
redisClient.connect();
const cstttl=3600;

const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  },
});

var word="ready";

io.on("connection", (socket) => {
  socket.on('addtoroom', async(roomId)=>{
    redisClient.get(roomId).then((msg)=>{
      if(msg==1){
        redisClient.incr(roomId);
        socket.emit('connectionsuccessful','Joined the room!',2);
      }else if(msg==null){
        redisClient.set(roomId,1);
        redisClient.expire(roomId,cstttl);
        socket.emit('connectionsuccessful','Created the room! ',1);
      }
      else{
        socket.emit('senderror','Room is Full',102);
      }
    }).catch((err)=>{
      console.log(err);
    });
  })
  socket.on('sendresp',(roomId,msg)=>{
    if(msg==word){
      socket.emit('gameresp',true);
    }
    else{
      socket.emit('gameresp',false);
    }
  })
});

server.listen(8080,()=>{
    console.log("Server is running...");
})