import React, { useContext } from 'react'
import { Global, css } from '@emotion/core'
import {
  IconButton,
  useColorMode,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SlideIn,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from '@chakra-ui/core'
import ResetButton from './ResetButton'
import RNG from './RNG'
import Themes from './Themes'
import ColorContext from '../context/color'
import { writeStorage, useLocalStorage } from '@rehooks/local-storage'

const Settings = ({ inGame }) => {
  const [storagePlayer = {}] = useLocalStorage('player')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const colors = useContext(ColorContext)

  const setColorMode = () => {
    toggleColorMode()
    writeStorage('player', { ...storagePlayer, colorTheme: undefined })
  }

  const activatedTabBorderBottomColor = colors[colorMode].bg
    ? colors[colorMode].bg
    : colorMode === 'light'
    ? '#FFF'
    : '#2D3748'

  return (
    <>
      <Global
        styles={css`
          html {
            background-color: ${colors[colorMode].bg};
            color: ${colors[colorMode].text}
          }

          button[type="button"], button[type="submit"] {
            ${
              colors[colorMode].sub &&
              `background-color: ${colors[colorMode].sub};`
            }
          }
          
          button[aria-selected=true] {
            ${
              colors[colorMode].main &&
              `color: ${colors[colorMode].main} !important;`
            }
            border-bottom-color: ${activatedTabBorderBottomColor} !important;
          }
          
          button[role="tab"], button[aria-label="Close"] {
            background-color: transparent;
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
            <ModalContent {...styles} backgroundColor={colors[colorMode].bg}>
              <ModalHeader>
                Thanks for using MTG Life Counter Online!
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Tabs variant="enclosed" isFitted>
                  <TabList>
                    <Tab>Game</Tab>
                    <Tab>Themes</Tab>
                  </TabList>
                  <TabPanels pt="1rem">
                    <TabPanel
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {inGame && <ResetButton />}
                      <RNG />
                    </TabPanel>
                    <TabPanel
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <IconButton
                        icon={colorMode === 'light' ? 'moon' : 'sun'}
                        onClick={setColorMode}
                      />
                      <Divider w="100%" />
                      <Themes />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
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
