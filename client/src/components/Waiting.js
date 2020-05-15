import React from 'react'
import { Flex, Image, Text } from '@chakra-ui/core'
import img from '../images/yuuki.png'

const Waiting = () => (
  <Flex direction="column" justify="center" align="center" overflowX="auto">
    <Image size="300px" objectFit="cover" src={img} marginLeft="5rem" />
    <Text fontSize={{ base: 'xl', sm: '3xl' }} marginY="1rem">
      Waiting for players to join.
    </Text>
  </Flex>
)

export default Waiting
