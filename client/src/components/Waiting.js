import React from 'react'
import { Flex, Image, Text } from '@chakra-ui/core'
import pngImg from '../images/yuuki.png'
import webpImg from '../images/yuuki.webp'

const Waiting = ({ message }) => (
  <Flex direction="column" justify="center" align="center" overflowX="auto">
    <picture style={{ marginBottom: '1rem' }}>
      <source type="image/webp" srcSet={webpImg} />
      <source type="image/png" srcSet={pngImg} />
      <Image
        alt="Konno Yuuki"
        htmlWidth="250px"
        htmlHeight="286px"
        objectFit="cover"
        src={pngImg}
      />
    </picture>
    {message && (
      <Text fontSize={{ base: 'xl', sm: '3xl' }} marginY="1rem">
        {message}
      </Text>
    )}
  </Flex>
)

export default Waiting
