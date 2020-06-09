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
} from '@chakra-ui/core'

const UPPER_BOUND = 20
const RNG_INTERVAL = 75 //ms
const RNG_ROLLS = 7

const RNG = () => {
    const [upperBound, setUpperBound] = useState(20)
    const [isOpen, toggleOpen] = useState(false)
    const [isRolling, setIsRolling] = useState(false)
    const [randomNumber, setNumber] = useState(null)

    const toggleCollapse = () => toggleOpen(!isOpen)

    useEffect(() => {
        if (isRolling) {
            let numRolls = 0
            const interval = setInterval(() => {
                const num = Math.floor(Math.random() * upperBound + 1)
                setNumber(num)
                numRolls++

                if (numRolls === RNG_ROLLS) {
                    clearInterval(interval)
                    setIsRolling(false)
                }
            }, RNG_INTERVAL)

            return () => clearInterval(interval)
        }
    }, [isRolling, upperBound])

    return (
        <>
            <ButtonGroup spacing={8}>
                <Button onClick={toggleCollapse} mt="1rem">
                    RNG
                </Button>
                {isOpen &&
                    <Button mt="1rem" onClick={setIsRolling}>
                        Roll
                    </Button>
                }
            </ButtonGroup>
            <Collapse mt={4} isOpen={isOpen}>
                <Flex width="16rem" height="5rem" direction="column" m="1rem">
                    <Text>Roll a number between 1 and {upperBound}</Text>
                    <Slider size="lg" defaultValue={20} min={2} max={UPPER_BOUND} onChange={setUpperBound}>
                        <SliderTrack />
                        <SliderFilledTrack />
                        <SliderThumb />
                    </Slider>
                    <Text fontSize="5xl" textAlign="center">{randomNumber || '?'}</Text>
                </Flex>
            </Collapse>
        </>
    )
}

export default RNG