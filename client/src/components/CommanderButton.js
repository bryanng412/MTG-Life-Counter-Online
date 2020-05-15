import React from 'react'
import { IconButton } from '@chakra-ui/core'

export default ({ showCmdrDamage, ...rest }) => (
  <IconButton
    position="absolute"
    top={1}
    right={1}
    bg="transparent"
    icon={showCmdrDamage ? 'arrow-back' : 'cmdr'}
    color="black"
    {...rest}
  />
)