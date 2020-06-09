import React, { useState, useEffect } from 'react'
import {
    Flex,
    Text,
    ButtonGroup,
    Button,
    Collapse,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Spinner
} from '@chakra-ui/core'

const UPPER_BOUND = 20
const ROLL_TIMEOUT = 525 //ms

const RNG = () => {
    const [upperBound, setUpperBound] = useState(20)
    const [isOpen, toggleOpen] = useState(false)
    const [isRolling, setIsRolling] = useState(false)
    const [randomNumber, setNumber] = useState(null)

    const toggleCollapse = () => toggleOpen(!isOpen)

    useEffect(() => {
        if (isRolling) {
            const timeout = setTimeout(() => {
                setNumber(Math.floor(Math.random() * upperBound + 1))
                setIsRolling(false)
            }, ROLL_TIMEOUT)

            return () => clearTimeout(timeout)
        }
    }, [isRolling, upperBound])

    return (
        <>
            <ButtonGroup spacing={8}>
                <Button onClick={toggleCollapse} mt="1rem">
                    RNG
                </Button>
                {isOpen &&
                    <Button mt="1rem" onClick={() => setIsRolling(true)}>
                        Roll
                    </Button>
                }
            </ButtonGroup>
            <Collapse mt={4} isOpen={isOpen}>
                <Flex width="16rem" height="5rem" direction="column" m="1rem" alignItems="center">
                    <Text>Roll a number between 1 and {upperBound}</Text>
                    <Slider size="lg" defaultValue={20} min={2} max={UPPER_BOUND} onChange={setUpperBound}>
                        <SliderTrack />
                        <SliderFilledTrack />
                        <SliderThumb />
                    </Slider>
                    {isRolling
                        ? <Flex mt="1.25rem"><Spinner pt="1rem" size="lg" /></Flex>
                        : <Text fontSize="5xl" textAlign="center">{randomNumber || '?'}</Text>
                    }
                </Flex>
            </Collapse>
        </>
    )
}

export default RNG