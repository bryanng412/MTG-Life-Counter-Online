export const toPlayerObj = (players) =>
  players
    ? players.reduce((playerObj, { id, ...rest }) => {
        playerObj[id] = { id, ...rest }
        return playerObj
      }, {})
    : {}

export const getUpdatedPlayers = (currentPlayers, newPlayers) => {
  const currentPlayerObj = toPlayerObj(currentPlayers)
  const newPlayerObj = toPlayerObj(newPlayers)

  //check if a player was removed
  const stayingPlayers = currentPlayers.filter(({ id }) => newPlayerObj[id])
  //check if new player was added
  const addedPlayers = newPlayers.filter(({ id }) => !currentPlayerObj[id])

  const updatedPlayers = stayingPlayers.concat(addedPlayers)

  //update names and life
  return updatedPlayers.map(({ id, ...rest }) =>
    newPlayerObj[id] ? newPlayerObj[id] : { id, ...rest }
  )
}