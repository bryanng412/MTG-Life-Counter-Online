import React, { useState, useContext } from 'react'
import { Box, Text, Flex, IconButton } from '@chakra-ui/core'
import EditableName from './EditableName'
import SocketContext from '../context/socket'

const PlayerCard = ({ player }) => {
  const { name, life: initialLife, id } = player

  const [life, setLife] = useState(initialLife)
  const socket = useContext(SocketContext)

  const addLife = () => {
    setLife(life + 1)
    socket.emit('updateLife', { id, life: life + 1 })
  }

  const minusLife = () => {
    setLife(life - 1)
    socket.emit('updateLife', { id, life: life - 1 })
  }

  const bg = socket.id === id ? '#9AE6B4' : 'white'

  return (
    <Box
      bg={bg}
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
    >
      <Flex justify="center" align="center">
        <IconButton icon="minus" onClick={minusLife} />
        <Text mx={[4, 5, 7, 9]} textAlign="center" fontSize="6xl">
          {life}
        </Text>
        <IconButton icon="add" onClick={addLife} />
      </Flex>
      <EditableName name={name} id={id} />
    </Box>
  )
}

export default PlayerCard
