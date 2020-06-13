import React, { useState, useEffect, useContext } from 'react'
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
  Spinner,
  useColorMode,
} from '@chakra-ui/core'
import ColorContext from '../context/color'

const UPPER_BOUND = 20
const ROLL_TIMEOUT = 525 //ms

const RNG = () => {
  const colors = useContext(ColorContext)
  const { colorMode } = useColorMode()
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

  const sliderColor = {
    light: colors[colorMode].sub || 'green.200',
    dark: colors[colorMode].sub || 'purple.800',
  }

  const thumbColor = {
    light: colors[colorMode].main || 'green.400',
    dark: colors[colorMode].main || 'purple.200',
  }

  return (
    <>
      <ButtonGroup spacing={8}>
        <Button onClick={toggleCollapse} mt="1rem">
          RNG
        </Button>
        {isOpen && (
          <Button mt="1rem" onClick={() => setIsRolling(true)}>
            Roll
          </Button>
        )}
      </ButtonGroup>
      <Collapse mt={4} isOpen={isOpen}>
        <Flex
          width="16rem"
          height="5rem"
          direction="column"
          m="1rem"
          alignItems="center"
        >
          <Text>Roll a number between 1 and {upperBound}</Text>
          <Slider
            defaultValue={20}
            min={2}
            max={UPPER_BOUND}
            onChange={setUpperBound}
          >
            <SliderTrack backgroundColor={sliderColor[colorMode]} />
            <SliderFilledTrack backgroundColor={thumbColor[colorMode]} />
            <SliderThumb size="5" backgroundColor={thumbColor[colorMode]} />
          </Slider>
          {isRolling ? (
            <Flex mt="1.25rem">
              <Spinner pt="1rem" size="lg" />
            </Flex>
          ) : (
            <Text fontSize="5xl" textAlign="center">
              {randomNumber || '?'}
            </Text>
          )}
        </Flex>
      </Collapse>
    </>
  )
}

export default RNG
