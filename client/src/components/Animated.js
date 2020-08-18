import React from 'react'
import { motion } from 'framer-motion'

export default ({ children }) => (
  <motion.div
    style={{ position: 'absolute', width: '100%', height: '100%' }}
    initial={{ opacity: 0, x: -200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 200 }}
    transition={{
      x: { type: 'spring', stiffness: 300, damping: 200 },
      opacity: { duration: 0.1 },
    }}
  >
    {children}
  </motion.div>
)
