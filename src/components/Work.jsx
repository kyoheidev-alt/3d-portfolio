import React from 'react'
import { motion } from 'framer-motion';

const Work = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div>Work</div>
    </motion.div>
  );
};

export default Work