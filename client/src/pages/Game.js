import React from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import { useToast } from '@chakra-ui/core'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import Settings from '../components/Settings'
import PlayerList from '../components/PlayerList'
import Waiting from '../components/Waiting'
import KeepAlive from '../components/KeepAlive'
import ShareLink from '../components/ShareLink'
import SocketContext from '../context/socket'
import { useLocalStorage, writeStorage } from '@rehooks/local-storage'

const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'wss://ts-life-counter-server.herokuapp.com'
    : 'ws://localhost:8080'

const Game = () => {
  const queryParams = new URLSearchParams(useLocation().search)
  const room = queryParams.get('room')
  const toast = useToast()
  const [storagePlayer = {}] = useLocalStorage('player')
  const { name, life } = storagePlayer
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    ENDPOINT,
    {
      share: true,
      shouldReconnect: () => true,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
      onOpen: () => {
        sendJsonMessage({
          event: 'JOIN',
          room,
          payload: { name, life },
        })
      },
      onMessage: e => {
        const { event, payload } = JSON.parse(e.data)
        const { message } = payload

        if (message) {
          setTimeout(() =>
            toast({
              title: event === 'LEAVE' ? 'GG' : 'Challenger approaching!',
              description: message,
              status: 'success',
              isClosable: true,
              duration: 3000,
            })
          )
        }
      },
    }
  )
  const { id, room: roomName, payload, event } = lastJsonMessage || {}
  const isGameReady = readyState === ReadyState.OPEN

  if (event === 'RESET') {
    if (storagePlayer) {
      writeStorage('player', { ...storagePlayer, life: 40 })
    }
    window.location.reload()
  }
  
  if (!room || readyState === ReadyState.CLOSED) {
    return <Redirect to="/" />
  }

  return (
    <SocketContext.Provider
      value={{
        id,
        event,
        room: roomName || room,
        sendJsonMessage,
        payload: payload || {},
      }}
    >
      <KeepAlive />
      <Settings inGame={isGameReady} />
      <ShareLink />
      {isGameReady ? <PlayerList /> : <Waiting message="Joining game" />}
    </SocketContext.Provider>
  )
}

export default Game
