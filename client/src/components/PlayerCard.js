import React, { useState, useContext, useEffect } from 'react'
import { Box, Text, Flex, IconButton, useColorMode } from '@chakra-ui/core'
import { writeStorage, useLocalStorage } from '@rehooks/local-storage'
import EditableName from './EditableName'
import CommanderButton from './CommanderButton'
import CommanderDamage from './CommanderDamage'
import SocketContext from '../context/socket'
import { doesPlayerMatch } from '../utils/players'

const PlayerCard = ({ player: initialPlayer, playerList }) => {
  const { colorMode } = useColorMode()
  const socket = useContext(SocketContext)
  const [showCmdrDamage, setShowCmdrDamage] = useState(false)
  const [storagePlayer] = useLocalStorage('player')

  const [player, setPlayer] = useState(initialPlayer)
  const { name, life: initialLife, id } = player
  const [life, setLife] = useState(initialLife)
  const belongsToUser = socket.id === id

  const getLifeHandler = ({ isPlus } = {}) => () => {
    const newLife = isPlus ? life + 1 : life - 1
    setLife(newLife)
    socket.emit('updatePlayer', { id, life: newLife })
  }

  const bg = {
    light: belongsToUser ? 'green.200' : 'white',
    dark: belongsToUser ? 'purple.800' : 'gray.700',
  }

  useEffect(() => {
    if (
      socket &&
      belongsToUser &&
      (doesPlayerMatch(storagePlayer, player) || !storagePlayer)
    ) {
      writeStorage('player', { name, life })
    }

    if (
      socket &&
      belongsToUser &&
      storagePlayer &&
      !doesPlayerMatch(storagePlayer, player)
    ) {
      socket.emit('updateAllClients', {
        id,
        name: storagePlayer.name,
        life: storagePlayer.life,
      })
    }
  }, [socket, name, life])

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
        <CommanderDamage
          player={player}
          playerList={playerList}
          setPlayer={setPlayer}
        />
      ) : (
        <>
          <Flex justify="center" align="center">
            <IconButton size="sm" icon="minus" onClick={getLifeHandler()} />
            <Text
              mx={['1rem', '1rem', '1.5rem', '1.5rem']}
              textAlign="center"
              fontSize={{ base: '5xl', md: '6xl' }}
            >
              {life}
            </Text>
            <IconButton
              size="sm"
              icon="add"
              onClick={getLifeHandler({ isPlus: true })}
            />
          </Flex>
          <EditableName name={name} id={id} editable={belongsToUser} />
        </>
      )}
    </Box>
  )
}

export default PlayerCard
