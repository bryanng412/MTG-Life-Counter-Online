import React from 'react'
import { useSocket } from 'use-socketio'
import {
  useToast,
  IconButton,
  useColorMode,
  Flex,
  ButtonGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/core'
import ResetButton from './ResetButton'
import { writeStorage, useLocalStorage } from '@rehooks/local-storage'

const Settings = () => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  const { socket } = useSocket('updatePlayers', ({ message, isLeaving }) => {
    if (message) {
      toast({
        title: isLeaving ? 'GG' : 'Challenger approaching!',
        description: message,
        status: 'success',
        isClosable: true,
      })
    }
  })

  const [player] = useLocalStorage(player)
  useSocket('reset', () => {
    if (player) {
      writeStorage('player', { ...player, life: 40 })
    }
    window.location.reload()
  })

  return (
    <>
      <Flex justify="center" pos="relative">
        <IconButton
          mt="4"
          mr="4"
          size="sm"
          pos={{ base: 'absolute', md: 'static' }}
          top={0}
          right={0}
          icon="settings"
          onClick={onOpen}
        />
      </Flex>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        size={{ base: 'xs', sm: 'md', md: 'lg' }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thanks for using MTG Life Counter Online!</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center">
            <ButtonGroup spacing={8}>
              <IconButton
                icon={colorMode === 'light' ? 'moon' : 'sun'}
                onClick={toggleColorMode}
              />
              <ResetButton socket={socket} />
            </ButtonGroup>
          </ModalBody>
          <ModalFooter>more features coming soon!</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Settings
