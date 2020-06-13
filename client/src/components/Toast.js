import React from 'react'
import {
  Flex,
  CloseButton,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/core'

const Toast = ({ colorMode, colors, title, message, onClose, id }) => {
  const bg = {
    light: colors[colorMode].main || 'green.500',
    dark: colors[colorMode].main || 'purple.900',
  }
  const textColor = {
    light: colors[colorMode].text || 'white',
    dark: colors[colorMode].text,
  }

  return (
    <Alert
      backgroundColor={bg[colorMode]}
      id={id}
      textAlign="left"
      boxShadow="lg"
      borderRadius="md"
      alignItems="start"
      margin={2}
      paddingRight={8}
      color={textColor[colorMode]}
    >
      <Flex direction="column" alignItems="center">
        {title && <AlertTitle>{title}</AlertTitle>}
        {message && (
          <AlertDescription marginTop="px" lineHeight="short">
            {message}
          </AlertDescription>
        )}
      </Flex>
      <CloseButton
        size="sm"
        onClick={onClose}
        position="absolute"
        right="4px"
        top="4px"
      />
    </Alert>
  )
}

export default Toast
