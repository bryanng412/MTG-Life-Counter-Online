import React, { useState, useContext } from 'react'
import { Box, Text, Flex, IconButton, useColorMode } from '@chakra-ui/core'
import { AnimatePresence } from 'framer-motion'
import { writeStorage, useLocalStorage } from '@rehooks/local-storage'
import Animated from './Animated'
import EditableName from './EditableName'
import CommanderButton from './CommanderButton'
import CommanderDamage from './CommanderDamage'
import SocketContext from '../context/socket'

const PlayerCard = ({ player: initialPlayer }) => {
  const { id: socketId, sendJsonMessage, room } = useContext(SocketContext)
  const { colorMode } = useColorMode()
  const [showCmdrDamage, setShowCmdrDamage] = useState(false)
  const [storagePlayer = {}] = useLocalStorage('player')

  const [player, setPlayer] = useState(initialPlayer)
  const { name, life: initialLife, id } = player
  const [life, setLife] = useState(initialLife)
  const belongsToUser = socketId === id
  const bg = {
    light: belongsToUser ? 'green.200' : 'white',
    dark: belongsToUser ? 'purple.800' : 'gray.700',
  }

  const getLifeHandler = ({ isPlus } = {}) => () => {
    const newLife = isPlus ? life + 1 : life - 1
    setLife(newLife)

    if (belongsToUser) {
      writeStorage('player', { ...storagePlayer, life: newLife })
    }

    sendJsonMessage({
      event: 'UPDATE_SINGLE_PLAYER',
      room,
      payload: { id, life: newLife },
    })
  }

  const onNameSubmit = name => {
    sendJsonMessage({
      event: 'UPDATE_SINGLE_PLAYER',
      room,
      payload: { id, name },
    })
  }

  return (
    <Box
      minHeight={{
        base: belongsToUser ? '10rem' : '8rem',
        md: belongsToUser ? '12rem' : '10rem',
      }}
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
      <AnimatePresence>
        {showCmdrDamage && (
          <Animated>
            <CommanderDamage player={player} setPlayer={setPlayer} />
          </Animated>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {!showCmdrDamage && (
          <Animated>
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
            <EditableName
              name={name}
              onSubmit={onNameSubmit}
              editable={belongsToUser}
            />
          </Animated>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default PlayerCard
