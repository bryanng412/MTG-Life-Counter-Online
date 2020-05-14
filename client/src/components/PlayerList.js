import React, { useState, useRef, useEffect } from 'react'
import { useLastMessage } from 'use-socketio'
import styled from '@emotion/styled'
import PlayerItem from './PlayerItem'
import Waiting from './Waiting'
import { findIndex } from '../utils/find-index'
import move from 'array-move'

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 25%;

  > li {
    margin-bottom: 1rem;
  }
`

const PlayerList = () => {
  const [players, setPlayers] = useState([])
  const { data: playerData } = useLastMessage('updatePlayers')

  const positions = useRef([]).current
  const setPosition = (i, offset) => (positions[i] = offset)

  const moveItem = (i, dragOffset) => {
    const targetIndex = findIndex(i, dragOffset, positions)
    if (targetIndex !== i) {
      setPlayers(move(players, i, targetIndex))
    }
  }

  useEffect(() => {
    if (playerData) {
      setPlayers(playerData.players)
    }
  }, [playerData])

  return players.length > 0 ? (
    <StyledList>
      {players.map((player, i) => (
        <PlayerItem
          key={player.id}
          player={player}
          setPosition={setPosition}
          moveItem={moveItem}
          i={i}
        />
      ))}
    </StyledList>
  ) : (
    <Waiting />
  )
}

export default PlayerList
