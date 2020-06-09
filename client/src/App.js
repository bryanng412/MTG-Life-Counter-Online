import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import { useLocalStorage } from '@rehooks/local-storage'
import Landing from './pages/Landing'
import Game from './pages/Game'
import getTheme from './themes/getTheme'
import ColorContext from './context/color'

const App = () => {
  const [storagePlayer = {}] = useLocalStorage('player')
  const { colorTheme } = storagePlayer

  return (
    <ThemeProvider theme={getTheme(colorTheme)}>
      <ColorModeProvider>
        <CSSReset />
        <ColorContext.Provider value={getTheme(colorTheme).colors}>
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
        </ColorContext.Provider>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default App
