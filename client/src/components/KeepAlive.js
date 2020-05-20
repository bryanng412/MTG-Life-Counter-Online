import React, { useEffect } from 'react'
import NoSleep from 'nosleep.js'

export default ({ socket }) => {
  useEffect(() => {
    if (socket) {
      setInterval(() => socket.emit('keepAlive'), 300000)
    }
  }, [socket])

  useEffect(() => {
    const enableNoSleep = () => {
      const noSleep = new NoSleep()
      document.removeEventListener('click', enableNoSleep, false)
      document.removeEventListener('touchstart', enableNoSleep, false)
      noSleep.enable()
    }

    document.addEventListener('click', enableNoSleep, false)
    document.addEventListener('touchstart', enableNoSleep, false)
  }, [])

  return <></>
}
