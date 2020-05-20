import React, { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import PlayerCard from './PlayerCard'

const onTop = { zIndex: 1 }
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 },
}

const PlayerItem = ({
  player,
  setPosition,
  moveItem,
  i,
  playerList,
  updatePlayers,
}) => {
  const [isDragging, setDragging] = useState(false)
  const ref = useRef(null)
  const dragOriginY = useMotionValue(0)

  useEffect(() => {
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop,
    })
  })

  return (
    <motion.li
      ref={ref}
      initial={false}
      animate={isDragging ? onTop : flat}
      whileHover={{ scale: 1.03 }}
      drag="y"
      dragOriginY={dragOriginY}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => {
        setDragging(false)
        updatePlayers()
      }}
      onDrag={(e, { point }) => moveItem(i, point.y)}
      positionTransition={({ delta }) => {
        if (isDragging) {
          dragOriginY.set(dragOriginY.get() + delta.y)
        }
        return !isDragging
      }}
    >
      <PlayerCard player={player} playerList={playerList} />
    </motion.li>
  )
}

export default PlayerItem
