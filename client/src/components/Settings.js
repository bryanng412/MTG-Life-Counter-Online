import React, { useContext } from 'react'
import { Global, css } from '@emotion/core'
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
  SlideIn,
} from '@chakra-ui/core'
import ResetButton from './ResetButton'
import RNG from './RNG'
import ColorContext from '../context/color'

const Settings = ({ inGame }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const colors = useContext(ColorContext)
  const bg = { light: colors.white }

  return (
    <>
      <Global
        styles={css`
          html {
            background-color: ${bg[colorMode]};
          }
        `}
      />
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
      <SlideIn in={isOpen}>
        {styles => (
          <Modal
            onClose={onClose}
            isOpen={isOpen}
            size={{ base: 'xs', sm: 'md', md: 'lg' }}
            isCentered
          >
            <ModalOverlay />
            <ModalContent {...styles}>
              <ModalHeader>
                Thanks for using MTG Life Counter Online!
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <ButtonGroup spacing={8}>
                  <IconButton
                    icon={colorMode === 'light' ? 'moon' : 'sun'}
                    onClick={toggleColorMode}
                  />
                  {inGame && <ResetButton />}
                </ButtonGroup>
                <RNG />
              </ModalBody>
              <ModalFooter>more features coming soon!</ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </SlideIn>
    </>
  )
}

export default Settings
