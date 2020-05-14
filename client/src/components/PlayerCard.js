import React, { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'

const onTop = { zIndex: 1 }
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 },
}

const PlayerCard = ({ player, setPosition, moveItem, i }) => {
  const { name, life } = player
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
      whileTap={{ scale: 1.12 }}
      drag="y"
      dragOriginY={dragOriginY}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={(e, { point }) => moveItem(i, point.y)}
      positionTransition={({ delta }) => {
        if (isDragging) {
          dragOriginY.set(dragOriginY.get() + delta.y)
        }
        return !isDragging
      }}
    >
      {name} {life}
    </motion.li>
  )
}

export default PlayerCard
