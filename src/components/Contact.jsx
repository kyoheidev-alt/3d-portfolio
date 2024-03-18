import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="description"
    >
      <div className="description-inner">
        <p>
          e-mail：
          <a href="mailto:hsdkyh99@gmail.com">hsdkyh99@gmail.com</a>
        </p>
        <p>
          GitHub：
          <a href="https://github.com/KioheyHahsida">
            https://github.com/KioheyHahsida
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default Contact;
