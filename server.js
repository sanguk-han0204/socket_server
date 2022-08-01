const { Server } = require("socket.io");

const io = new Server(3000, {
    cors:{
        origin: "http://localhost:63342"
    }
    /* options */ });

let room = ['room1', 'room2'];
let a= 0;
console.log("server start");

io.on('connection',(socket)=>{

    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });

    socket.on('leaveRoom',(num,name)=>{
        socket.leave(room[num],()=>{
            console.log(name + ' leave a ' + room[num]);
            io.to(room[num]).emit('leaveRoom', num, name);
        });
    });

    socket.on('joinRoom', (num, name)=>{
        socket.join(room[num], ()=>{

            console.log(name + ' join a '+ room[num]);
            io.to(room[num]).emit('joinRoom',num,name);
        });
    });

    socket.on('chat message', (num, name, msg)=>{
        a = num;
        io.to(room[a]).emit('chat message',name,msg);
        console.log(num+ ' message arrived : ' + msg);
    });


});



/*
const namespace1 = io.of('/namespace1');
namespace1.on('connection',(socket)=>{

    socket.emit("text","namespace1 connection");

    console.log(io.engine.clientsCount);
    socket.on("disconnect", (reason)=>{
        console.log(reason);
        console.log("namespace1 disconnect");
    })

})

const namespace2 = io.of('/namespace2');
namespace2.on('connection',(socket)=>{
    socket.emit("text","namespace2 connection");

    console.log(io.engine.clientsCount);
    socket.on("disconnect", (reason)=>{
        console.log(reason);
        console.log("namespace2 disconnect");
    })
})*/



/*

io.on("connection", (socket) => {
    const url = socket.request.url;
    console.log(url);
    socket.on("text", (text)=>{
        console.log(text);
    });
    // ...
    socket.emit("text","aaaaa");

    socket.on("disconnect", (reason)=>{
        console.log(reason);
        console.log("disconnect");
    })
});*/
