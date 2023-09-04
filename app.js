const express=require('express');
const app=express();
const path=require('path');
const dotenv=require('dotenv');
const {Server}=require('socket.io');
const {connectToDatabase}=require('./database/data');
const router=require('./routes/route');
const cors=require('cors');
const PORT=process.env.PORT || 4444;

dotenv.config();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use('/', router);

// -------------------deployment------------------

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/', (req, res)=>{
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    })
}else{
    app.use('/', router);
}
// -------------------deployment------------------


connectToDatabase();


const server=app.listen(PORT, ()=>{
    console.log(`server started at http://localhost:${PORT}`);
})

const io=new Server(server, {
    cors: {
        origin: 'https://whatsapp-clone-b3ra.onrender.com'
    }
})

let users=[];

const getUser=(userId)=>{
    return users.find((user)=>user.sub===userId);
}

io.on('connection', (socket)=>{
    console.log('user connected');
    socket.on('addUsers', (userData)=>{
        let exist=users.find((user)=>user.sub===userData.sub);
        if(!exist){
            users.push({...userData, socketId: socket.id});
        }
        io.emit('getUsers', users);
    })

    socket.on('disconnect', ()=>{
        users=users.filter((user)=>user.socketId!=socket.id);
        io.emit('removeUsers', users);
    })

    socket.on('sendMessage', (data)=>{
        const user=getUser(data.receiverId);
        io.to(user.socketId).emit('getMessage', data);
    })
})