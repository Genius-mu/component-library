// components/ProgressBar.jsx
import { motion, useScroll } from "framer-motion";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[var(--primary)] origin-left z-50"
      style={{ scaleX: scrollYProgress }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    />
  );
};

export default ProgressBar;
