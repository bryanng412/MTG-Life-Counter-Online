import {
  WebSocket,
  isWebSocketCloseEvent,
} from 'https://deno.land/std/ws/mod.ts'
import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import {
  Player,
  CommanderDamage,
  EVENT,
  SendGameEvent,
  SendGamePayload,
  ReceiveGameEvent,
  ReceiveGamePayload,
} from './types.ts'

const MAX_PLAYERS = 5
const STARTING_LIFE = 40
const PLAYERS: Record<string, Player> = {}
const ROOMS: Record<string, Player[]> = {}

export const gameHandler = async (ws: WebSocket): Promise<void> => {
  const userId = v4.generate()

  for await (let data of ws) {
    const { event, room, payload }: ReceiveGameEvent =
      typeof data === 'string' ? JSON.parse(data) : data

    if (isWebSocketCloseEvent(data)) {
      removePlayer(userId)
      break
    }

    switch (event) {
      case EVENT.JOIN:
        const { name } = addPlayer(userId, room, ws, payload)

        const responsePayload: SendGamePayload = {
          message: `${name || 'A player'} has entered the game!`,
          players: ROOMS[room],
        }
        emitPlayersToRoom(EVENT.JOIN, room, responsePayload)
        break
      case EVENT.UPDATE_PLAYERS:
        const { players = [] } = payload
        ROOMS[room] = players.map(({ id, ...rest }) => ({
          id,
          ...rest,
          ws: PLAYERS[id].ws,
        }))

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
    }
  }
}

const emitPlayersToRoom = (
  event: EVENT,
  room: string,
  payload: SendGamePayload,
  sendingPlayerId?: string
): void => {
  const playersInRoom = ROOMS[room] || []
  playersInRoom.forEach(({ id, ws }) => {
    if (id === sendingPlayerId) {
      return
    }

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
  const newPlayer = initPlayer(id, room, ws, name, life)
  playersWithCmdrDmg.push(newPlayer)

  PLAYERS[id] = newPlayer
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
  ws: WebSocket,
  name?: string,
  life?: number
): Player => ({
  name: name || `Player ${ROOMS[room].length + 1}`,
  life: life || STARTING_LIFE,
  cmdrDmg: initCmdrDmg(room),
  room,
  id,
  ws,
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

    PLAYERS[id] = resetPlayer
    return resetPlayer
  })
}
