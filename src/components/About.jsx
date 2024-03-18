import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="description"
    >
      <div className="description-inner text-lg">
        <p>ハシダ　キョウヘイ</p>
        <p>高知県出身</p>
        <p>趣味：ギター、歌唱、映画鑑賞、作曲、動画作成</p>
        <p>好きな映画：少林サッカー、カンフーハッスル、ゴジラ</p>
        <p>好きな音楽： Queen、Rage Against the Machine、尾崎豊</p>
        <p>好きな食べ物：ラーメン、スパゲッティ、餅、ホルモン</p>
      </div>
    </motion.div>
  );
};

export default About;
