import React from 'react'
import { useSocket } from 'use-socketio'
import { useToast } from '@chakra-ui/core'

const Settings = () => {
  const toast = useToast()
  useSocket('updatePlayers', ({ message, isLeaving }) => {
    if (message) {
      toast({
        title: isLeaving ? 'GG' : 'Challenger approaching!',
        description: message,
        status: 'success',
        isClosable: true,
      })
    }
  })

  return <></>
}

export default Settings
