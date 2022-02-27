const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { Server } = require("socket.io");
const io = new Server(server)

let users = []

io.on('connection', (socket) => {
    let userId
    console.log('a user connected', socket.id)
    socket.emit('id', socket.id, users)
    users.push(socket.id)
    socket.broadcast.emit('online', socket.id)
    userId = socket.id

    socket.on('disconnect', () => {
        users = users.filter(id => id !== userId)
        console.log('disconnet: ' + userId)
    })
})

const port = 8090
server.listen(port, () => console.log('Socket server working localhost:' + port))
