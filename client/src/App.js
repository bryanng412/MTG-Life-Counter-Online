import React from 'react'
import { SocketIOProvider } from 'use-socketio'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import PlayerList from './components/PlayerList'
import Settings from './components/Settings'

const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'https://life-counter-server.herokuapp.com'
    : 'http://localhost:8080'

const App = () => (
  <ThemeProvider>
    <CSSReset />
    <SocketIOProvider url={ENDPOINT}>
      <PlayerList />
      <Settings />
    </SocketIOProvider>
  </ThemeProvider>
)

export default App
