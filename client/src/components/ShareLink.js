import React, { useContext } from 'react'
import { Flex, Text, IconButton, useClipboard } from '@chakra-ui/core'
import SocketContext from '../context/socket'

const ShareLink = () => {
  const { room } = useContext(SocketContext)
  const { origin, pathname } = window.location
  const link = `${origin}/game?room=${room}`
  const { onCopy, hasCopied } = useClipboard(link)

  if (pathname === '/') return <></>
  return (
    <Flex
      mt=".5rem"
      mx="auto"
      direction="column"
      alignItems="center"
      justifiyContent="center"
    >
      <Flex alignItems="center">
        <Text fontSize="sm">Send this link to friends!</Text>
        <IconButton
          aria-label="Copy room link"
          onClick={onCopy}
          ml=".5rem"
          size="xs"
          icon={hasCopied ? 'check' : 'copy'}
        />
      </Flex>
      <Text fontSize="sm">{link}</Text>
    </Flex>
  )
}

export default ShareLink
