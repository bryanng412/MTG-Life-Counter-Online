import React from 'react'
import { IconButton } from '@chakra-ui/core'

export default ({ showCmdrDamage, ...rest }) => (
  <IconButton
    aria-label={`${showCmdrDamage ? 'Hide' : 'Show'} commander damage`}
    position="absolute"
    top={1}
    right={1}
    bg="transparent"
    icon={showCmdrDamage ? 'arrow-back' : 'cmdr'}
    fill="currentColor"
    fontSize="20px"
    zIndex="1"
    {...rest}
  />
)
