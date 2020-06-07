import React from 'react'
import { Flex, Image, Text } from '@chakra-ui/core'
import img from '../images/yuuki.png'

const Waiting = ({ message }) => (
  <Flex direction="column" justify="center" align="center" overflowX="auto">
    <Image size="300px" objectFit="cover" src={img} ml="5rem" mb="1rem" />
    {message && (
      <Text fontSize={{ base: 'xl', sm: '3xl' }} marginY="1rem">
        {message}
      </Text>
    )}
  </Flex>
)

export default Waiting
