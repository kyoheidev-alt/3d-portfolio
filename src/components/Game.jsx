import React from 'react'
import { motion } from 'framer-motion';

const Game = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div>Game</div>
    </motion.div>
  );
};

export default Game