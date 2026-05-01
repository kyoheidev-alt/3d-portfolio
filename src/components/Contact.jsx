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
        <p className="leading-relaxed">
          e-mail：{" "}
          <a
            href="mailto:kyohei.dev@gmail.com"
            className="font-mono text-sm text-secondary"
          >
            kyohei.dev@gmail.com
          </a>
        </p>
        <p className="leading-relaxed">
          GitHub：{" "}
          <a
            href="https://github.com/kyoheidev-alt/"
            className="font-mono text-sm text-secondary break-all"
          >
            https://github.com/kyoheidev-alt/
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default Contact;
