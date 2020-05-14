import React, { useState, useRef, useEffect } from 'react'
import { useLastMessage } from 'use-socketio'
import PlayerCard from './PlayerCard'
import { findIndex } from '../utils/find-index'
import move from 'array-move'

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
    <ul>
      {players.map((player, i) => (
        <PlayerCard
          key={player.id}
          player={player}
          setPosition={setPosition}
          moveItem={moveItem}
          i={i}
        />
      ))}
    </ul>
  ) : (
    <div>Waiting for players to join</div>
  )
}

export default PlayerList
