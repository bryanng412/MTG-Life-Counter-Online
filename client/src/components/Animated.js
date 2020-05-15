import React from 'react'
import { motion } from 'framer-motion'

const Animated = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: -1000 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      x: { type: 'spring', stiffness: 300, damping: 200 },
      opacity: { duration: 0.1 },
    }}
  >
    {children}
  </motion.div>
)

export default Animated
