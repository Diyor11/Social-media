import io from 'socket.io-client'

// const url = 'https://git.heroku.com/qdsocketserver'
const url = 'https://stormy-atoll-90492.herokuapp.com/'

const socket = io(url)

export default socket