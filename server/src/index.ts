import express from 'express'
import http from 'http'
import WebSocket from 'ws'
import cors from 'cors'
import { uuid } from 'uuidv4'
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  Config,
} from 'unique-names-generator'
import {
  EVENT,
  ReceiveGameEvent,
  ReceiveGamePayload,
  SendGamePayload,
  SendGameEvent,
  Player,
  CommanderDamage,
} from './types'

const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
app.use(cors())
const wss = new WebSocket.Server({ server })

const MAX_PLAYERS = 5
const STARTING_LIFE = 40
const PLAYERS: Record<string, Player & { ws: WebSocket }> = {}
const ROOMS: Record<string, Player[]> = {}

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

        const responsePayload: SendGamePayload = {
          message: `${name || 'A player'} has entered the game!`,
          players: ROOMS[room],
        }
        emitPlayersToRoom(EVENT.JOIN, room, responsePayload)
        break
      case EVENT.UPDATE_PLAYERS_ORDER:
        const { players = [] } = payload
        ROOMS[room] = players.map(id => PLAYERS[id]).filter(player => !!player)

        emitPlayersToRoom(EVENT.UPDATE_PLAYERS, room, {
          players: ROOMS[room],
        } as SendGamePayload)
        break
      case EVENT.UPDATE_SINGLE_PLAYER:
        updatePlayer(payload)
        emitPlayersToRoom(
          EVENT.UPDATE_PLAYERS,
          room,
          {
            players: ROOMS[room],
          } as SendGamePayload,
          userId
        )
        break
      case EVENT.RESET:
        resetPlayers(room)
        emitPlayersToRoom(EVENT.RESET, room, { players: ROOMS[room] })
        break
      case EVENT.PULSE:
        break
    }
  })
})

server.listen(port, () => console.log(`Server started on port ${port}`))

const emitPlayersToRoom = (
  event: EVENT,
  room: string,
  payload: SendGamePayload,
  sendingPlayerId?: string
): void => {
  const playersInRoom = ROOMS[room] || []
  playersInRoom.forEach(({ id }) => {
    if (id === sendingPlayerId) {
      return
    }

    const { ws } = PLAYERS[id]
    const response: SendGameEvent = {
      id,
      event,
      room,
      payload,
    }
    ws.send(JSON.stringify(response))
  })
}

const removePlayer = (removeId: string): void => {
  const playerToRemove = PLAYERS[removeId]
  if (!playerToRemove) return

  const { room } = PLAYERS[removeId]
  delete PLAYERS[removeId]

  const players = ROOMS[room]
  const index = players.findIndex(({ id }) => id === removeId)

  if (index !== -1) {
    players.forEach((_, i) => {
      delete players[i].cmdrDmg[removeId]
    })
    players.splice(index, 1)

    ROOMS[room] = players
    const payload: SendGamePayload = {
      message: `${playerToRemove.name} has left the game!`,
      players,
    }
    emitPlayersToRoom(EVENT.LEAVE, room, payload)
  }
}

const updatePlayer = ({
  id: playerId,
  players,
  ...newValues
}: ReceiveGamePayload): void => {
  if (!playerId) {
    return
  }

  const { room } = PLAYERS[playerId]
  const playersInRoom = ROOMS[room]

  PLAYERS[playerId] = { ...PLAYERS[playerId], ...newValues }
  ROOMS[room] = playersInRoom.map(({ id, ...rest }) =>
    id === playerId ? { id, ...rest, ...newValues } : { id, ...rest }
  )
}

const getOrInitRoom = (room: string): Player[] => {
  if (!ROOMS[room]) {
    ROOMS[room] = []
  }
  return ROOMS[room]
}

const addPlayer = (
  id: string,
  room: string,
  ws: WebSocket,
  payload?: ReceiveGamePayload
): Player | { name?: string } => {
  const { name, life } = payload || {}
  const playerListToJoin = getOrInitRoom(room)
  if (playerListToJoin.length >= MAX_PLAYERS) {
    return {}
  }

  const playersWithCmdrDmg = addCmdrDmgToPlayers(id, playerListToJoin)
  const newPlayer = initPlayer(id, room, name, life)
  playersWithCmdrDmg.push(newPlayer)

  PLAYERS[id] = { ...newPlayer, ws }
  ROOMS[room] = playersWithCmdrDmg

  return newPlayer
}

const addCmdrDmgToPlayers = (
  addPlayerId: string,
  playerListToJoin: Player[]
): Player[] =>
  playerListToJoin.map(({ id, cmdrDmg, ...rest }) => ({
    id,
    ...rest,
    cmdrDmg: {
      [addPlayerId]: 0,
      ...cmdrDmg,
    },
  }))

const initCmdrDmg = (room: string): CommanderDamage =>
  (ROOMS[room] || []).reduce((playerObj, { id }) => {
    playerObj[id] = 0
    return playerObj
  }, {} as CommanderDamage)

const initPlayer = (
  id: string,
  room: string,
  name?: string,
  life?: number
): Player => ({
  name: name || generateName(),
  life: life || STARTING_LIFE,
  cmdrDmg: initCmdrDmg(room),
  room,
  id,
})

const resetCmdrDmg = (cmdrDmg: CommanderDamage): CommanderDamage => {
  const newCmdrDmg = Object.keys(cmdrDmg).reduce((cmdrDmgObj, id) => {
    cmdrDmgObj[id] = 0
    return cmdrDmgObj
  }, {} as CommanderDamage)

  return newCmdrDmg
}

const resetPlayers = (room: string): void => {
  const playersInRoom = ROOMS[room]

  ROOMS[room] = playersInRoom.map(({ id, life, cmdrDmg, ...rest }) => {
    const resetPlayer = {
      id,
      life: STARTING_LIFE,
      cmdrDmg: resetCmdrDmg(cmdrDmg),
      ...rest,
    }

    PLAYERS[id] = { ...resetPlayer, ws: PLAYERS[id].ws }
    return resetPlayer
  })
}

const generateName = (): string => {
  const customConfig: Config = {
    dictionaries: [adjectives, animals],
    separator: ' ',
    length: 2,
  }
  return uniqueNamesGenerator(customConfig)
}
