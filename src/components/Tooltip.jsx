// components/Tooltip.jsx
import { motion } from "framer-motion";
import { useState } from "react";

const Tooltip = ({ children, text, position = "top" }) => {
  const [show, setShow] = useState(false);

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15 }}
          className={`absolute z-50 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] whitespace-nowrap shadow-2xl ${positions[position]}`}
        >
          {text}
        </motion.div>
      )}
    </div>
  );
};

export default Tooltip;
