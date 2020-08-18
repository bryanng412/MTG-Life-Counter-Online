import React, { useState, useContext, useEffect } from 'react'
import { Box, Text, Flex, IconButton, useColorMode } from '@chakra-ui/core'
import { AnimatePresence } from 'framer-motion'
import { writeStorage, useLocalStorage } from '@rehooks/local-storage'
import Animated from './Animated'
import EditableName from './EditableName'
import CommanderButton from './CommanderButton'
import CommanderDamage from './CommanderDamage'
import SocketContext from '../context/socket'
import { doesPlayerMatch } from '../utils/players'
// import useLongPress from '../hooks/useLongPress'
import ColorContext from '../context/color'

const PlayerCard = ({ player: initialPlayer }) => {
  const colors = useContext(ColorContext)
  const { colorMode } = useColorMode()
  const { id: socketId, sendJsonMessage, room } = useContext(SocketContext)
  const [showCmdrDamage, setShowCmdrDamage] = useState(false)
  const [storagePlayer = {}] = useLocalStorage('player')
  // const [isLongPressing, setIsLongPressing] = useState(false)

  const [player, setPlayer] = useState(initialPlayer)
  const { name, life, id } = player
  const belongsToUser = socketId === id
  const bg = {
    light: belongsToUser ? 'green.200' : 'white',
    dark: belongsToUser ? 'purple.800' : 'gray.700',
  }
  const themedBg = belongsToUser
    ? colors[colorMode].main
    : colors[colorMode].sub
  const themedColor = belongsToUser && colors[colorMode].bg

  useEffect(() => {
    if (belongsToUser && doesPlayerMatch(storagePlayer, player)) {
      writeStorage('player', { ...storagePlayer, life })
    }
    // eslint-disable-next-line
  }, [life])

  const getLifeHandler = ({ isPlus, lifeDelta = 1 } = {}) => () => {
    // if (isLongPressing && lifeDelta === 1) {
    //   return
    // }

    const newLife = isPlus ? life + lifeDelta : life - lifeDelta
    setPlayer({ ...player, life: newLife })

    if (belongsToUser) {
      writeStorage('player', { ...storagePlayer, life: newLife })
    }

    sendJsonMessage({
      event: 'UPDATE_SINGLE_PLAYER',
      room,
      payload: { id, life: newLife },
    })
  }

  // const { isLongPressing: isAddPressing, ...addLifeLongPress } = useLongPress(
  //   getLifeHandler({ isPlus: true, lifeDelta: 10 })
  // )
  // const {
  //   isLongPressing: isMinusPressing,
  //   ...minusLifeLongPress
  // } = useLongPress(getLifeHandler({ lifeDelta: 10 }))

  // useEffect(() => {
  //   setTimeout(() => setIsLongPressing(isAddPressing || isMinusPressing), 100)
  // }, [isAddPressing, isMinusPressing])

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
      bg={themedBg || bg[colorMode]}
      color={themedColor}
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
              <IconButton
                aria-label="Subtract life"
                size="sm"
                icon="minus"
                onClick={getLifeHandler()}
                // {...minusLifeLongPress}
              />
              <Text
                mx={['1rem', '1rem', '1.5rem', '1.5rem']}
                textAlign="center"
                fontSize={{ base: '5xl', md: '6xl' }}
              >
                {life}
              </Text>
              <IconButton
                aria-label="Add life"
                size="sm"
                icon="add"
                onClick={getLifeHandler({ isPlus: true })}
                // {...addLifeLongPress}
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
