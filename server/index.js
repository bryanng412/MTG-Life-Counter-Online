const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 8080

const { addPlayer, removePlayer, getPlayers, updatePlayer } = require('./game')

app.use(cors())
app.use(router)

io.on('connection', socket => {
  const addedPlayer = addPlayer(socket.id)
  socket.emit('updatePlayers', getPlayers())
  socket.broadcast.emit('updatePlayers', addedPlayer)

  socket.on('disconnect', () => {
    socket.broadcast.emit('updatePlayers', removePlayer(socket.id))
  })

  socket.on('updateName', resp => {
    const updatedPlayer = updatePlayer(resp)
    socket.emit('updatePlayers', updatedPlayer)
    socket.broadcast.emit('updatePlayers', updatedPlayer)
  })

  socket.on('updateLife', resp => {
    socket.broadcast.emit('updatePlayers', updatePlayer(resp))
  })

  socket.on('updateCmdrDmg', resp => {
    socket.broadcast.emit('updatePlayers', updatePlayer(resp))
  })
})

server.listen(port, () => console.log(`Server has started on port ${port}.`))
