import React from 'react'
import {
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

const Settings = ({ inGame }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Flex justify="center" pos="relative">
        <IconButton
          mt="2"
          mr="2"
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
              {inGame && <ResetButton />}
            </ButtonGroup>
          </ModalBody>
          <ModalFooter>more features coming soon!</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Settings
