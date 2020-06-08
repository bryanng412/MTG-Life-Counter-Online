import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import Landing from './pages/Landing'
import Game from './pages/Game'
import { defaultTheme } from './themes'

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <ColorModeProvider>
      <CSSReset />
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="*">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </ColorModeProvider>
  </ThemeProvider>
)

export default App
