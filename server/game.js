const MAX_PLAYERS = 4
const players = []

const initPlayer = (id) => ({
  name: `Player ${players.length + 1}`,
  life: 40,
  id,
})

const addPlayer = (id) => {
  if (players.length === MAX_PLAYERS) {
    return {
      message: 'Game is full!',
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
    message: `Could not remove player.`,
    players,
  }
}

const getPlayers = () => ({ players })

module.exports = { addPlayer, removePlayer, getPlayers }
