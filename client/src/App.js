import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import Landing from './pages/Landing'
import Game from './pages/Game'
import { defaultTheme } from './themes'

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <ColorModeProvider>
      <CSSReset />
      <Router>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </ColorModeProvider>
  </ThemeProvider>
)

export default App
