const Sentencer = require('sentencer')

const MAX_PLAYERS = 5
const STARTING_LIFE = 40
let players = []

const initCmdrDmg = () =>
  players.reduce((playerObj, { id }) => {
    playerObj[id] = 0
    return playerObj
  }, {})

const initPlayer = id => ({
  name: Sentencer.make('{{ an_adjective }} {{ noun }}'),
  life: STARTING_LIFE,
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
    return { players }
  }

  addCmdrDmg(id)
  const newPlayer = initPlayer(id)
  players.push(newPlayer)

  return {
    message: `A player has entered the game!`,
    players,
  }
}

const removePlayer = removeId => {
  const index = players.findIndex(({ id }) => id === removeId)

  if (index !== -1) {
    removeCmdrDmg(removeId)
    players.splice(index, 1)

    return {
      message: `A player has left the game!`,
      isLeaving: true,
      players,
    }
  }

  return { players }
}

const getPlayers = () => ({ players })

const updatePlayer = ({ id: playerId, ...newValues }) => {
  players = players.map(({ id, ...rest }) =>
    id === playerId ? { id, ...rest, ...newValues } : { id, ...rest }
  )

  return { players }
}

const resetCmdrDmg = cmdrDmg => {
  const newCmdrDmg = Object.keys(cmdrDmg).reduce((cmdrDmgObj, id) => {
    cmdrDmgObj[id] = 0
    return cmdrDmgObj
  }, {})

  return newCmdrDmg
}

const resetPlayers = () => {
  players = players.map(({ life, cmdrDmg, ...rest }) => ({
    life: STARTING_LIFE,
    cmdrDmg: resetCmdrDmg(cmdrDmg),
    ...rest,
  }))

  return { players }
}

const updateAllPlayers = ({ players: newPlayers }) => {
  players = newPlayers
  return { players }
}

module.exports = {
  addPlayer,
  removePlayer,
  getPlayers,
  updatePlayer,
  resetPlayers,
  updateAllPlayers,
}
