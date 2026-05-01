import { motion } from "framer-motion";
import {
  css,
  docker,
  figma,
  git,
  html,
  javascript,
  nodejs,
  reactjs,
  tailwind,
  threejs,
  typescript,
  nextjs,
  php,
  java,
  python,
  android,
  kotlin,
  sass,
} from "../assets";

const Tech = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="description"
    >
      <div className="description-inner">
        <div className="grid grid-rows-4 grid-flow-col gap-4">
          <img src={html} alt="HTML" className="w-16 h-16 object-contain" />
          <img src={css} alt="CSS" className="w-16 h-16 object-contain" />
          <img
            src={javascript}
            alt="JavaScript"
            className="w-16 h-16 object-contain"
          />
          <img
            src={nextjs}
            alt="Next.js"
            className="w-16 h-16 object-contain"
          />
          <img src={php} alt="PHP" className="w-16 h-16 object-contain" />
          <img src={java} alt="Java" className="w-16 h-16 object-contain" />
          <img src={python} alt="Python" className="w-16 h-16 object-contain" />
          <img
            src={android}
            alt="Android"
            className="w-16 h-16 object-contain"
          />
          <img src={kotlin} alt="Kotlin" className="w-16 h-16 object-contain" />
          <img src={sass} alt="Sass" className="w-16 h-16 object-contain" />
          <img src={docker} alt="Docker" className="w-16 h-16 object-contain" />
          <img src={figma} alt="Figma" className="w-16 h-16 object-contain" />
          <img src={git} alt="Git" className="w-16 h-16 object-contain" />
          <img
            src={nodejs}
            alt="Node.js"
            className="w-16 h-16 object-contain"
          />
          <img src={reactjs} alt="React" className="w-16 h-16 object-contain" />
          <img
            src={tailwind}
            alt="Tailwind CSS"
            className="w-16 h-16 object-contain"
          />
          <img
            src={typescript}
            alt="TypeScript"
            className="w-16 h-16 object-contain"
          />
          <img
            src={threejs}
            alt="Three.js"
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Tech;
