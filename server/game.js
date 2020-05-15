const MAX_PLAYERS = 4
let players = []

const initPlayer = (id) => ({
  name: 'New Player',
  life: 40,
  id,
})

const addPlayer = (id) => {
  if (players.length === MAX_PLAYERS) {
    return {
      players,
    }
  }

  players.push(initPlayer(id))

  return {
    message: 'A player has entered the game!',
    players,
  }
}

const removePlayer = (removeId) => {
  const index = players.findIndex(({ id }) => id === removeId)

  if (index !== -1) {
    const { name } = players[index]
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
