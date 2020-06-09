import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Icon,
  useColorMode,
} from '@chakra-ui/core'
import { motion, AnimatePresence } from 'framer-motion'
import { writeStorage, useLocalStorage } from '@rehooks/local-storage'
import formDataEntries from 'form-data-entries'

const Error = ({ showError }) => (
  <motion.div
    style={{
      position: 'absolute',
      marginTop: '.125rem',
      width: '100%',
      textAlign: 'center',
    }}
    initial={{ opacity: 0, y: -15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
  >
    <Flex justifyContent="center" alignItems="center">
      <Icon color="#E53E3E" size="12px" name="info-outline" mr=".25rem" />
      <Text color="#E53E3E" fontSize="sm">
        Enter a room name
      </Text>
    </Flex>
  </motion.div>
)

const JoinGame = () => {
  const { colorMode } = useColorMode()
  const formRef = useRef(null)
  const [showError, setError] = useState(false)
  const [storagePlayer = {}] = useLocalStorage('player')
  const [name, setName] = useState(storagePlayer.name || '')
  const [room, setRoom] = useState(storagePlayer.room || '')
  let history = useHistory()

  const onNameChange = e => setName(e.target.value)
  const onRoomChange = e => setRoom(e.target.value)

  const onSubmit = e => {
    e.preventDefault()

    if (!formRef.current.checkValidity()) {
      setError(true)
      return
    }

    const [nameTuple, roomTuple] = formDataEntries(e.target)
    const [, nameValue] = nameTuple
    const [, roomValue] = roomTuple
    writeStorage('player', {
      ...storagePlayer,
      name: nameValue,
      room: roomValue,
    })
    history.push(`/game?room=${roomValue}`)
  }

  const buttonBg = {
    light: 'green.200',
    dark: 'purple.800',
  }

  return (
    <Box
      pos="relative"
      maxW="60%"
      mx="auto"
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      as="form"
    >
      <Input
        variant="filled"
        name="name"
        value={name}
        onChange={onNameChange}
        textAlign="center"
        placeholder="Enter your name"
        autoComplete="off"
        onFocus={() => setError(false)}
      />
      <Input
        errorBorderColor="#E53E3E"
        variant="filled"
        name="room"
        value={room}
        onChange={onRoomChange}
        mt="1rem"
        textAlign="center"
        placeholder="Enter a room name"
        autoComplete="off"
        onFocus={() => setError(false)}
        isInvalid={showError}
        required
      />
      <AnimatePresence>{showError && <Error />}</AnimatePresence>
      <Button
        d="block"
        mx="auto"
        mt="2rem"
        type="submit"
        backgroundColor={buttonBg[colorMode]}
      >
        Join game
      </Button>
    </Box>
  )
}

export default JoinGame
