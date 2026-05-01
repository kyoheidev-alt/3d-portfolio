import { motion } from "framer-motion";
import { mitsuba, bowlingo } from "../assets";

const Works = () => {
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
          <a className="flex items-center" href="https://mitsubayouchien.jp/">
            <div className="w-1/2">
              <h5 className="font-display text-lg font-semibold tracking-tight">
                学校法人小林学園 三葉幼稚園HP
              </h5>
              <p className="text-sm font-mono text-secondary/95 tracking-wide break-all mt-1">
                https://mitsubayouchien.jp/
              </p>
            </div>
            <div className="w-1/2 ml-5">
              <img className="rounded" src={mitsuba} alt="三葉幼稚園" />
            </div>
          </a>
        </p>
        <p>
          <article className="flex items-center">
            <div className="w-1/2">
              <h5 className="font-display text-lg font-semibold tracking-tight">
                ボウリングスコアビンゴ
              </h5>
              <p className="text-sm text-secondary">公開 URL 準備中</p>
            </div>
            <div className="w-1/2 ml-5">
              <img
                className="rounded"
                src={bowlingo}
                alt="ボウリングスコアビンゴ"
              />
            </div>
          </article>
        </p>
      </div>
    </motion.div>
  );
};

export default Works;
