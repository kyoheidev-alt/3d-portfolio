import { motion } from "framer-motion";
import { mitsuba, debateChat } from "../assets";

const DEBATE_APP_URL = "https://debate-app-pi.vercel.app/";

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
              <p className="text-sm font-mono text-white/90 tracking-wide break-all mt-1">
                https://mitsubayouchien.jp/
              </p>
            </div>
            <div className="w-1/2 ml-5">
              <img className="rounded" src={mitsuba} alt="三葉幼稚園" />
            </div>
          </a>
        </p>
        <p>
          <a className="flex items-center" href={DEBATE_APP_URL}>
            <div className="w-1/2">
              <h5 className="font-display text-lg font-semibold tracking-tight">
                匿名ディベート参加型チャット
              </h5>
              <p className="text-sm text-white leading-relaxed mt-1">
                教育機関での利用を想定し、議長と学生がリアルタイムでディベート議論できるWebアプリ。Supabase
                Realtimeによるチャット、RLSによるアクセス制御、賛否バロメーター、重要意見・返信スレッド、運用向け管理画面を個人で設計・実装。
              </p>
              <p className="text-sm font-mono text-white/90 tracking-wide break-all mt-1">
                {DEBATE_APP_URL}
              </p>
            </div>
            <div className="w-1/2 ml-5">
              <img
                className="rounded"
                src={debateChat}
                alt="匿名ディベート参加型チャット"
              />
            </div>
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default Works;
