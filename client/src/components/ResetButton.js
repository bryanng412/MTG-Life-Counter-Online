import React, { useContext } from 'react'
import styled from '@emotion/styled'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Button,
  useColorMode,
} from '@chakra-ui/core'
import SocketContext from '../context/socket'

const StyledArrow = styled(PopoverArrow)`
  &::before {
    box-shadow: -1px -1px 1px 0 ${({ colorMode }) => (colorMode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255,255,255,0.16)')} !important;
  }
`

const ResetButton = () => {
  const { colorMode } = useColorMode()
  const { sendJsonMessage, room } = useContext(SocketContext)

  const onClick = () => sendJsonMessage({ event: 'RESET', room })

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton icon="repeat" />
      </PopoverTrigger>
      <PopoverContent
        zIndex={4}
        w="75%"
        _focus={{ boxShadow: 'none', outline: 'none' }}
      >
        <StyledArrow colorMode={colorMode} />
        <PopoverCloseButton />
        <PopoverBody textAlign="center">
          Are you sure you want to reset the game?
        </PopoverBody>
        <PopoverFooter border="0" d="flex" justifyContent="center">
          <Button
            onClick={onClick}
            size="sm"
            color="#FFFFFF"
            bg="#E53E3E"
            _hover={{ bg: '#C53030' }}
          >
            Reset
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default ResetButton
