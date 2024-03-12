import React, { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { CubeCanvas, TetraCanvas } from "./canvas";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // activeIndexに基づいて文字色を変更する
  const menuStyle = (index) => (activeIndex === index ? { color: "red" } : {});

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute left-[15%] top-[25%]  max-w-7xl mx-auto ${styles.paddingX} z-20 cursor-pointer`}
      >
        <a
          className="menu"
          style={menuStyle(0)}
          onClick={() => {
            setActiveIndex(0);
          }}
        >
          about
        </a>
      </div>
      <div
        className={`absolute left-[15%] bottom-[25%]  max-w-7xl mx-auto ${styles.paddingX} z-20 cursor-pointer`}
      >
        <a
          className="menu"
          style={menuStyle(1)}
          onClick={() => {
            setActiveIndex(1);
          }}
        >
          work
        </a>
      </div>
      <div
        className={`absolute left-[65%] top-[25%]  max-w-7xl mx-auto ${styles.paddingX} z-20 cursor-pointer`}
      >
        <a
          className="menu"
          style={menuStyle(2)}
          onClick={() => {
            setActiveIndex(2);
          }}
        >
          game
        </a>
      </div>
      <div
        className={`absolute left-[65%] bottom-[25%]  max-w-7xl mx-auto ${styles.paddingX} z-20 cursor-pointer`}
      >
        <a
          className="menu"
          style={menuStyle(3)}
          onClick={() => {
            setActiveIndex(3);
          }}
        >
          contact
        </a>
      </div>

      <TetraCanvas activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
