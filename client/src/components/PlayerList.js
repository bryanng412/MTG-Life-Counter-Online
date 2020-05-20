import React, { useState, useRef, useEffect } from 'react'
import { useLastMessage } from 'use-socketio'
import styled from '@emotion/styled'
import KeepAlive from './KeepAlive'
import PlayerItem from './PlayerItem'
import Waiting from './Waiting'
import EditableName from './EditableName'
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
  const { data: playerData, socket } = useLastMessage('updatePlayers')

  const positions = useRef([]).current
  const setPosition = (i, offset) => (positions[i] = offset)

  const updatePlayers = () => socket.emit('updateAllPlayers', { players })

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

  return (
    <SocketContext.Provider value={socket}>
      <KeepAlive socket={socket} />
      {players.length > 1 ? (
        <StyledList>
          {players.map((player, i) => (
            <PlayerItem
              key={getPlayerKey(player)}
              player={player}
              setPosition={setPosition}
              moveItem={moveItem}
              i={i}
              playerList={players}
              updatePlayers={updatePlayers}
            />
          ))}
        </StyledList>
      ) : (
        <>
          <Waiting />
          {players[0] && (
            <EditableName
              id={players[0].id}
              placeholder="Enter your name."
              maxW="50%"
            />
          )}
        </>
      )}
    </SocketContext.Provider>
  )
}

export default PlayerList
