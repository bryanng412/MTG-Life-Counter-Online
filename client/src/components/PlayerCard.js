import React from 'react'
import { Box, Text } from '@chakra-ui/core'
import EditableName from './EditableName'

const PlayerCard = ({ player }) => {
  const { name, life } = player

  return (
    <Box borderWidth="1px" rounded="lg" overflow="hidden">
      <Text textAlign="center" fontSize="6xl">
        {life}
      </Text>
      <EditableName name={name} />
    </Box>
  )
}

export default PlayerCard
