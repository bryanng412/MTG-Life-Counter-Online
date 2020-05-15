import React, { useContext } from 'react'
import { Flex, Text, IconButton } from '@chakra-ui/core'
import { toPlayerObj } from '../utils/players'
import SocketContext from '../context/socket'

const CommanderDamage = ({ player, playerList, setPlayer }) => {
  const { cmdrDmg } = player
  const playerObj = toPlayerObj(playerList)
  const socket = useContext(SocketContext)

  const getCmdrDmgHandler = ({ id, isPlus }) => () => {
    const life = cmdrDmg[id]

    if ((life === 0 && !isPlus) || (life === 10 && isPlus)) {
      return
    }
    const newLife = isPlus ? life + 1 : life - 1
    const newCmdrDmg = { ...cmdrDmg, [id]: newLife }

    setPlayer({ ...player, cmdrDmg: newCmdrDmg })
    socket.emit('updatePlayer', { id: player.id, cmdrDmg: newCmdrDmg })
  }

  return (
    <Flex
      height="11.25rem"
      width="100%"
      direction="column"
      justify="center"
      align="center"
    >
      {Object.keys(cmdrDmg).map(id => (
        <Flex key={id} justify="center" align="center">
          <Text mr="1.5rem">{playerObj[id].name}</Text>
          <IconButton
            size="xs"
            icon="minus"
            onClick={getCmdrDmgHandler({ id })}
          />
          <Text mx="0.75rem" fontSize="2xl">
            {cmdrDmg[id]}
          </Text>
          <IconButton
            size="xs"
            icon="add"
            onClick={getCmdrDmgHandler({ id, isPlus: true })}
          />
        </Flex>
      ))}
    </Flex>
  )
}

export default CommanderDamage
