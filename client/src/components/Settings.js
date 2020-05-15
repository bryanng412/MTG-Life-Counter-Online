import React from 'react'
import { useSocket } from 'use-socketio'
import { useToast, IconButton, useColorMode, Flex, useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/core'

const Settings = () => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode()

  useSocket('updatePlayers', ({ message, isLeaving }) => {
    if (message) {
      toast({
        title: isLeaving ? 'GG' : 'Challenger approaching!',
        description: message,
        status: 'success',
        isClosable: true,
      })
    }
  })

  return (
    <>
      <Flex justify="center">
        <IconButton
          mt="4"
          icon="settings"
          onClick={onOpen}
        />
      </Flex>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thanks for using MTG Life Counter!</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center">
            <IconButton
              icon={colorMode === 'light' ? 'moon' : 'sun'}
              onClick={toggleColorMode}
            />
          </ModalBody>
          <ModalFooter>
            more features coming soon!
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Settings
