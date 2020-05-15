import React from 'react'
import { Flex } from '@chakra-ui/core'

const CommanderDamage = ({ playerList }) => {

    return <Flex height="11.25rem" width="100%" direction="column" justify="center" align="center">
        {playerList.map(({ name }) => <div key={name}>{name}</div>

        )}
    </Flex>
}

export default CommanderDamage