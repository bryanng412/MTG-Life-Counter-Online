import React from 'react'
import Settings from '../components/Settings'
import Waiting from '../components/Waiting'
import JoinGame from '../components/JoinGame'

const Landing = () => (
  <>
    <Settings inGame={false} />
    <Waiting />
    <JoinGame />
  </>
)

export default Landing
