import React, { useState, useContext } from 'react'
import { Box, Text, Flex, IconButton } from '@chakra-ui/core'
import EditableName from './EditableName'
import CommanderButton from './CommanderButton'
import CommanderDamage from './CommanderDamage'
import SocketContext from '../context/socket'

const PlayerCard = ({ player, playerList }) => {
  const { name, life: initialLife, id } = player

  const [showCmdrDamage, setShowCmdrDamage] = useState(false)
  const [life, setLife] = useState(initialLife)
  const socket = useContext(SocketContext)

  const getLifeHandler = ({ isPlus } = {}) => () => {
    const newLife = isPlus ? life + 1 : life - 1
    setLife(newLife)
    socket.emit('updateLife', { id, life: newLife })
  }

  return (
    <Box
      bg={socket.id === id ? '#9AE6B4' : 'white'}
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
      position="relative"
    >
      <CommanderButton
        showCmdrDamage={showCmdrDamage}
        onClick={() => setShowCmdrDamage(!showCmdrDamage)}
      />
      {showCmdrDamage
        ? <CommanderDamage playerList={playerList.filter(({ id }) => player.id !== id)} />
        : <>
        <Flex justify="center" align="center">
          <IconButton icon="minus" onClick={getLifeHandler()} />
          <Text
            mx={['0.5rem', '1rem', '1.5rem', '1.5rem']}
            textAlign="center"
            fontSize="6xl"
          >
            {life}
          </Text>
          <IconButton icon="add" onClick={getLifeHandler({ isPlus: true })} />
        </Flex>
        <EditableName name={name} id={id} />
      </>}
    </Box>
  )
}

export default PlayerCard
