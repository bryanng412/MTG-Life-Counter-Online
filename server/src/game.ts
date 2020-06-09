import WebSocket from 'ws'
import {
    uniqueNamesGenerator,
    adjectives,
    animals,
    Config,
} from 'unique-names-generator'
import {
    EVENT,
    ReceiveGamePayload,
    SendGameEvent,
    SendGamePayload,
    Player,
    CommanderDamage,
} from './types'

const MAX_PLAYERS = 5
const STARTING_LIFE = 40
const PLAYERS: Record<string, Player & { ws: WebSocket }> = {}
const ROOMS: Record<string, Player[]> = {}

export const getPlayersRoom = (room: string): Player[] => {
    if (!ROOMS[room]) {
        ROOMS[room] = []
    }
    return ROOMS[room]
}

export const emitPlayersToRoom = (
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

export const removePlayer = (removeId: string): void => {
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

export const updatePlayer = ({
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

export const updatePlayersOrder = (room: string, playerIds: string[]): void => {
    ROOMS[room] = playerIds.map(id => PLAYERS[id]).filter(player => !!player)
}

export const addPlayer = (
    id: string,
    room: string,
    ws: WebSocket,
    payload?: ReceiveGamePayload
): Player | { name?: string } => {
    const { name, life } = payload || {}
    const playerListToJoin = getPlayersRoom(room)
    if (playerListToJoin.length >= MAX_PLAYERS) {
        return {}
    }

    const playersWithCmdrDmg = addCmdrDmgToPlayers(id, playerListToJoin)
    const newPlayer = initPlayer(id, room, name, life)
    playersWithCmdrDmg.push(newPlayer)

    ROOMS[room] = playersWithCmdrDmg

    ROOMS[room].forEach(({ id: playerId, cmdrDmg, ...rest }) => {
        const addInfo = playerId === id
            ? { cmdrDmg, ws }
            : { cmdrDmg, ws: PLAYERS[playerId].ws }

        PLAYERS[playerId] = { id: playerId, ...rest, ...addInfo }
    })

    return newPlayer
}

export const resetPlayers = (room: string): void => {
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

const addCmdrDmgToPlayers = (
    addPlayerId: string,
    playerListToJoin: Player[]
): Player[] => (
    playerListToJoin.map(({ id, cmdrDmg, ...rest }) => ({
        id,
        ...rest,
        cmdrDmg: {
            [addPlayerId]: 0,
            ...cmdrDmg,
        },
    }))
)

const initCmdrDmg = (room: string): CommanderDamage => (
    (ROOMS[room] || []).reduce((playerObj, { id }) => {
        playerObj[id] = 0
        return playerObj
    }, {} as CommanderDamage)
)

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

const generateName = (): string => {
    const customConfig: Config = {
        dictionaries: [adjectives, animals],
        separator: ' ',
        length: 2,
    }
    return uniqueNamesGenerator(customConfig)
}
