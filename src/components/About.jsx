import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="description"
    >
      <div className="description-inner text-base sm:text-lg leading-relaxed font-normal text-white/95">
        <p className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-white mb-1">
          ハシダ キョウヘイ
        </p>
        <p>高知県出身・福岡県糟屋郡粕屋町在住</p>
        <p className="mt-2">
          教職経験後に独学でプログラミングを習得し、ITエンジニアに転向。情報系専門学校でWeb制作・プログラミングを指導しながら、kintoneカスタマイズ・Webアプリ開発の実務を行っています。
        </p>
        <p className="mt-2 text-sm sm:text-base text-white/85">
          保有資格：中学校教諭一種（英語・社会）／高等学校教諭一種（英語・公民）／kintoneアソシエイト
        </p>
        <p className="mt-3">趣味：ギター、歌唱、映画鑑賞、作曲、動画作成</p>
        <p>好きな映画：少林サッカー、カンフーハッスル、ゴジラ</p>
        <p>好きな音楽： Queen、Rage Against the Machine、尾崎豊</p>
        <p>好きな食べ物：ラーメン、スパゲッティ、餅、ホルモン</p>
      </div>
    </motion.div>
  );
};

export default About;
