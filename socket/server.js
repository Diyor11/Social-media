const express = require('express')
const app = express()
const server = require('http').createServer(app)
const {Server} = require('socket.io')
const io = new Server(server, {cors: {origin: '*'}})

// app.use(express.json())

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/' + 'index.html')
// })

// let messages = []

// io.on('connection', socket => {
//     socket.emit('start', messages)
//     console.log('connect')

//     socket.on('sendMessage', text => {
//         messages.push(text)
//         socket.broadcast.emit('recive', text)
//     })

//     socket.on('disconnect', (event) => {
//         console.log('disconnect')
//     })
// })

let users = []

const addUser = ({userId, socketId}) => {
    !users.some(user => user.userId === userId) && 
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

const port = process.env.PORT || 3001
server.listen(port, () => console.log('Server working localhost:' + port))
