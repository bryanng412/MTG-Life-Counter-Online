import React from 'react'
import { SocketIOProvider } from 'use-socketio'
import { ThemeProvider, CSSReset, ColorModeProvider  } from '@chakra-ui/core'
import PlayerList from './components/PlayerList'
import Settings from './components/Settings'
import { defaultTheme } from './themes'

const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'https://life-counter-server.herokuapp.com'
    : 'http://localhost:8080'

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <ColorModeProvider>
      <CSSReset />
      <SocketIOProvider url={ENDPOINT}>
        <Settings />
        <PlayerList />
      </SocketIOProvider>
    </ColorModeProvider>
  </ThemeProvider>
)

export default App
