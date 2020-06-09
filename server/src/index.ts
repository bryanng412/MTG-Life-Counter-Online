import express from 'express'
import http from 'http'
import WebSocket from 'ws'
import cors from 'cors'
import { uuid } from 'uuidv4'
import {
  EVENT,
  ReceiveGameEvent,
  SendGamePayload,
} from './types'
import {
  removePlayer,
  addPlayer,
  emitPlayersToRoom,
  updatePlayer,
  resetPlayers,
  getPlayersRoom,
  updatePlayersOrder
} from './game'

const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
app.use(cors())
const wss = new WebSocket.Server({ server })

wss.on('connection', (ws: WebSocket) => {
  const userId = uuid()

  ws.on('close', () => {
    removePlayer(userId)
  })

  ws.on('message', (message: string) => {
    const { event, room, payload }: ReceiveGameEvent = JSON.parse(message)

    switch (event) {
      case EVENT.JOIN:
        const { name } = addPlayer(userId, room, ws, payload)

        emitPlayersToRoom(EVENT.JOIN, room, {
          message: `${name || 'A player'} has entered the game!`,
          players: getPlayersRoom(room),
        } as SendGamePayload)
        break
      case EVENT.UPDATE_PLAYERS_ORDER:
        const { players = [] } = payload
        updatePlayersOrder(room, players)

        emitPlayersToRoom(EVENT.UPDATE_PLAYERS_ORDER, room, {
          players: getPlayersRoom(room),
        } as SendGamePayload)
        break
      case EVENT.UPDATE_SINGLE_PLAYER:
        updatePlayer(payload)
        emitPlayersToRoom(
          EVENT.UPDATE_PLAYERS,
          room,
          {
            players: getPlayersRoom(room),
          } as SendGamePayload,
          userId
        )
        break
      case EVENT.RESET:
        resetPlayers(room)
        emitPlayersToRoom(EVENT.RESET, room, { players: getPlayersRoom(room) } as SendGamePayload)
        break
      case EVENT.PULSE:
        break
    }
  })
})

server.listen(port, () => console.log(`Server started on port ${port}`))