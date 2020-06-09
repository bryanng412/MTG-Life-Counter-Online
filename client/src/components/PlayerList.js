import React, { useState, useRef, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import PlayerItem from './PlayerItem'
import { findIndex } from '../utils/find-index'
import { minTablet } from '../utils/responsive'
import { getPlayerKey } from '../utils/players'
import move from 'array-move'
import SocketContext from '../context/socket'

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 10%;
  margin-bottom: 35%;

  ${minTablet} {
    margin: 1rem 25%;
  }

  > li {
    margin-bottom: 1rem;
    width: 80%;

    ${minTablet} {
      width: 75%;
    }
  }
`

const PlayerList = () => {
  const [players, setPlayers] = useState([])
  const { room, payload: playerData, sendJsonMessage } = useContext(
    SocketContext
  )
  const positions = useRef([]).current

  const setPosition = (i, offset) => (positions[i] = offset)
  const moveItem = (i, dragOffset) => {
    const targetIndex = findIndex(i, dragOffset, positions)
    if (targetIndex !== i) {
      setPlayers(move(players, i, targetIndex))
    }
  }

  const updatePlayers = () => {
    sendJsonMessage({
      event: 'UPDATE_PLAYERS_ORDER',
      room,
      payload: { players: players.map(({ id }) => id) },
    })
  }

  useEffect(() => {
    if (playerData.players) {
      setPlayers(playerData.players)
    }
  }, [playerData])

  return (
    <StyledList>
      {players.map((player, i) => (
        <PlayerItem
          key={getPlayerKey(player)}
          player={player}
          setPosition={setPosition}
          moveItem={moveItem}
          i={i}
          updatePlayers={updatePlayers}
        />
      ))}
    </StyledList>
  )
}

export default PlayerList
