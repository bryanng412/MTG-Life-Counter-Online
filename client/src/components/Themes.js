import React, { useContext } from 'react'
import { Button, useColorMode, Flex } from '@chakra-ui/core'
import ColorContext from '../context/color'
import { writeStorage, useLocalStorage } from '@rehooks/local-storage'
import { themeColors } from '../themes/colors'

const Themes = () => {
  const [storagePlayer = {}] = useLocalStorage('player')
  const { colorMode, toggleColorMode } = useColorMode()
  const colors = useContext(ColorContext)

  const setTheme = colorTheme => {
    const { forceMode = 'dark' } = colors
    if (colorMode !== forceMode) {
      toggleColorMode()
    }
    writeStorage('player', { ...storagePlayer, colorTheme })
  }

  const getButtonProps = colorTheme => ({
    'aria-label': `Switch to ${colorTheme} theme`,
    textTransform: 'capitalize',
    m: '.5rem',
    type: null,
    onClick: () => setTheme(colorTheme),
    backgroundColor: themeColors[colorTheme].buttonColor,
    color: themeColors[colorTheme].buttonText,
  })

  return (
    <Flex justifyContent="center" flexWrap="wrap">
      {Object.keys(themeColors).map(colorName => (
        <Button key={colorName} {...getButtonProps(colorName)}>
          {colorName}
        </Button>
      ))}
    </Flex>
  )
}

export default Themes
