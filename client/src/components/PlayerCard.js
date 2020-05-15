import React, { useState, useContext } from 'react'
import { Box, Text, Flex, IconButton, useColorMode } from '@chakra-ui/core'
import EditableName from './EditableName'
import CommanderButton from './CommanderButton'
import CommanderDamage from './CommanderDamage'
import SocketContext from '../context/socket'

const PlayerCard = ({ player, playerList }) => {
  const { name, life: initialLife, id } = player

  const [showCmdrDamage, setShowCmdrDamage] = useState(false)
  const [life, setLife] = useState(initialLife)
  const socket = useContext(SocketContext)
  const { colorMode } = useColorMode()

  const getLifeHandler = ({ isPlus } = {}) => () => {
    const newLife = isPlus ? life + 1 : life - 1
    setLife(newLife)
    socket.emit('updateLife', { id, life: newLife })
  }

  const bg = {
    light: socket.id === id ? 'green.200' : 'white',
    dark: socket.id === id ? 'purple.800' : 'gray.700',
  }
  
  return (
    <Box
      bg={bg[colorMode]}
      borderWidth="2px"
      rounded="lg"
      overflow="hidden"
      boxShadow="md"
      position="relative"
    >
      <CommanderButton
        showCmdrDamage={showCmdrDamage}
        onClick={() => setShowCmdrDamage(!showCmdrDamage)}
      />
      {showCmdrDamage ? (
        <CommanderDamage player={player} playerList={playerList} />
      ) : (
        <>
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
        </>
      )}
    </Box>
  )
}

export default PlayerCard
