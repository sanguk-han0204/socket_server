const { Server } = require("socket.io");

const io = new Server(3000, {
    cors:{
        origin: "http://localhost:63342"
    }
    /* options */ });


console.log("server start");


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
})
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
