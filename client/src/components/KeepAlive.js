import React, { useEffect } from 'react'

export default ({ socket }) => {
  useEffect(() => {
    if (socket) {
      setInterval(() => socket.emit('keepAlive'), 300000)
    }
  }, [socket])

  return <></>
}
