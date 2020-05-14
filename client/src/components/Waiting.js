import React from 'react'
import { Flex, Image, Text } from '@chakra-ui/core'
import img from '../images/yuuki.png'

const Waiting = () => (
  <Flex direction="column" justify="center" align="center">
    <Image size="300px" objectFit="cover" src={img} marginLeft="5rem" />
    <Text fontSize={{ base: 'xl', sm: '3xl' }} marginTop="1rem">
      Waiting for players to join.
    </Text>
  </Flex>
)

export default Waiting
