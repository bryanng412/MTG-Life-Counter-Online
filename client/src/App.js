import React from 'react'
import { SocketIOProvider } from 'use-socketio'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import PlayerList from './components/PlayerList'
import Settings from './components/Settings'

const App = () => (
  <ThemeProvider>
    <CSSReset />
    <SocketIOProvider url="http://localhost:8080">
      <PlayerList />
      <Settings />
    </SocketIOProvider>
  </ThemeProvider>
)

export default App
