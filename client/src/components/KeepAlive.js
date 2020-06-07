import React, { useEffect, useContext } from 'react'
import SocketContext from '../context/socket'
import NoSleep from 'nosleep.js'

export default () => {
  const { sendJsonMessage } = useContext(SocketContext)
  setInterval(() => {
    if (sendJsonMessage) {
      sendJsonMessage({ event: 'KEEP_ALIVE' })
    }
  }, 300000)

  useEffect(() => {
    const enableNoSleep = () => {
      const noSleep = new NoSleep()
      document.removeEventListener('click', enableNoSleep, false)
      noSleep.enable()
    }

    document.addEventListener('click', enableNoSleep, false)
  }, [])

  return <></>
}
