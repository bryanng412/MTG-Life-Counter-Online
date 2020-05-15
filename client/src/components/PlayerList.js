import React, { useState, useRef, useEffect } from 'react'
import { useLastMessage } from 'use-socketio'
import styled from '@emotion/styled'
import PlayerItem from './PlayerItem'
import Waiting from './Waiting'
import { findIndex } from '../utils/find-index'
import { minTablet } from '../utils/responsive'
import { getUpdatedPlayers } from '../utils/players'
import move from 'array-move'
import SocketContext from '../context/socket'

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 20%;

  ${minTablet} {
    margin: 1rem 25%;
  }

  > li {
    margin-bottom: 1rem;
    width: 100%;

    ${minTablet} {
      width: 50%;
    }
  }
`

const PlayerList = () => {
  const [players, setPlayers] = useState([])
  const { data: playerData, socket } = useLastMessage('updatePlayers')

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
      const newPlayers = getUpdatedPlayers(players, playerData.players)
      setPlayers(newPlayers)
    }
  }, [playerData])

  return (
    <SocketContext.Provider value={socket}>
      {players.length > 1 ? (
        <StyledList>
          {players.map((player, i) => (
            <PlayerItem
              key={`${player.id}-${player.name}-${player.life}`}
              player={player}
              setPosition={setPosition}
              moveItem={moveItem}
              i={i}
            />
          ))}
        </StyledList>
      ) : (
        <Waiting />
      )}
    </SocketContext.Provider>
  )
}

export default PlayerList
