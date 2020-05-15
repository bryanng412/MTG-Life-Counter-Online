const Sentencer = require('sentencer')

const MAX_PLAYERS = 5
let players = []

const initCmdrDmg = () =>
  players.reduce((playerObj, { id }) => {
    playerObj[id] = 0
    return playerObj
  }, {})

const initPlayer = id => ({
  name: Sentencer.make('{{ adjective }} {{ noun }}'),
  life: 40,
  cmdrDmg: initCmdrDmg(),
  id,
})

const addCmdrDmg = addPlayerId => {
  players = players.map(({ id, cmdrDmg, ...rest }) => ({
    id,
    ...rest,
    cmdrDmg: {
      [addPlayerId]: 0,
      ...cmdrDmg,
    },
  }))
}

const removeCmdrDmg = removePlayerId => {
  players.forEach((_, i) => {
    delete players[i].cmdrDmg[removePlayerId]
  })
}

const addPlayer = id => {
  if (players.length === MAX_PLAYERS) {
    return {
      players,
    }
  }

  addCmdrDmg(id)
  players.push(initPlayer(id))

  return {
    message: 'A player has entered the game!',
    players,
  }
}

const removePlayer = removeId => {
  const index = players.findIndex(({ id }) => id === removeId)

  if (index !== -1) {
    const { name } = players[index]

    removeCmdrDmg(removeId)
    players.splice(index, 1)

    return {
      message: `${name} has left the game!`,
      isLeaving: true,
      players,
    }
  }

  return {
    players,
  }
}

const getPlayers = () => ({ players })

const updatePlayer = ({ id: playerId, ...newValues }) => {
  players = players.map(({ id, ...rest }) =>
    id === playerId ? { id, ...rest, ...newValues } : { id, ...rest }
  )

  return { players }
}

module.exports = { addPlayer, removePlayer, getPlayers, updatePlayer }
