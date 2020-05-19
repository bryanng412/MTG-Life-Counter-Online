import React from 'react'
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
} from '@chakra-ui/core'
import { writeStorage, useLocalStorage } from '@rehooks/local-storage'

const ResetButton = ({ socket }) => {
  const [player] = useLocalStorage(player)

  const onClick = () => {
    if (player) {
      writeStorage('player', { ...player, life: 40 })
    }
    socket.emit('reset')
  }

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton icon="repeat" />
      </PopoverTrigger>
      <PopoverContent zIndex={4} w="75%">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody textAlign="center">
          Are you sure you want to reset the game?
        </PopoverBody>
        <PopoverFooter border="0" d="flex" justifyContent="center">
          <Button
            onClick={onClick}
            size="sm"
            bg="red.500"
            _hover={{ bg: 'red.600' }}
          >
            Reset
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default ResetButton
