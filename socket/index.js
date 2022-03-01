const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { Server } = require("socket.io");
const io = new Server(server, {cors: {origin: '*'}})

let users = []

const addUser = ({userId, socketId}) => {
    !users.some(user => users.userId === userId) && 
        users.push({userId, socketId})
}
const removeUser = (id) => {
    users = users.filter(user => user.socketId !== id)
}

io.on('connection', (socket) => {
    console.log('connect: ' + socket.id)

    socket.emit('allUsers', users)
    socket.on('addUser', userId => {
        addUser({userId, socketId: socket.id})
        socket.broadcast.emit('newUser', {userId, socketId: socket.id})
    })

    socket.on('sendMessage', (data) => {
        const user = users.find(user => user.userId === data.reciver)

        if(user){
            io.to(user.socketId).emit('reciveMessage', data)
        }
    })

    socket.on('disconnect', () => {
        removeUser(socket.id)
        socket.broadcast.emit('removeUser', socket.id)
        console.log('disconnect: ' + socket.id)

    })
})

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })

const port = 8090
server.listen(port, () => console.log('Socket server working localhost:' + port))
