// Tooltip.jsx
import { useState, useId, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "../utils/cn";

const positions = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const offsets = {
  top: { y: 6 },
  bottom: { y: -6 },
  left: { x: 6 },
  right: { x: -6 },
};

const Tooltip = ({ children, text, position = "top", delay = 0, className = "" }) => {
  const [show, setShow] = useState(false);
  const id = useId();
  const timer = useRef();
  const reduce = useReducedMotion();

  const open = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(true), delay);
  };
  const close = () => {
    clearTimeout(timer.current);
    setShow(false);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={open}
      onMouseLeave={close}
      onFocus={open}
      onBlur={close}
      aria-describedby={show ? id : undefined}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            id={id}
            role="tooltip"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.9, ...offsets[position] }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.9, ...offsets[position] }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-50 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] whitespace-nowrap shadow-2xl pointer-events-none",
              positions[position],
              className
            )}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
