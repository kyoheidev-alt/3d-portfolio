import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <div className="text-lg mt-4">
          <p>
            I'm a 3D artist and a game developer. I create 3D models, textures,
            and animations for games and other interactive media.
          </p>
          <p>
            I'm also a game developer. I create games using Unity and Unreal
            Engine. I also create interactive experiences using Three.js and
            other web-based technologies.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
