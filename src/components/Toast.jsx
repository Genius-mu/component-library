// components/Toast.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const icons = {
  info: <Info className="size-5 text-[var(--primary)]" />,
  success: <CheckCircle className="size-5 text-green-400" />,
  warning: <AlertCircle className="size-5 text-yellow-400" />,
  error: <AlertTriangle className="size-5 text-red-400" />,
};

const variants = {
  info: "bg-[var(--surface)] border-[var(--primary)]/30 text-[var(--text)]",
  success: "bg-green-950/30 border-green-500/30 text-green-400",
  warning: "bg-yellow-950/30 border-yellow-500/30 text-yellow-400",
  error: "bg-red-950/30 border-red-500/30 text-red-400",
};

const barColors = {
  info: "bg-[var(--primary)]",
  success: "bg-green-400",
  warning: "bg-yellow-400",
  error: "bg-red-400",
};

const positionClasses = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

const Toast = ({
  message,
  type = "info", // info, success, warning, error
  duration = 5000,
  onClose,
  position = "bottom-right",
  className = "",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [runId, setRunId] = useState(0); // bump to restart the countdown bar
  const reduce = useReducedMotion();
  const remaining = useRef(duration);
  const startedAt = useRef(Date.now());

  const dismiss = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  }, [onClose]);

  // Auto-dismiss timer that respects pause-on-hover (resumes where it left off).
  useEffect(() => {
    if (duration <= 0 || paused) return;
    startedAt.current = Date.now();
    const t = setTimeout(dismiss, remaining.current);
    return () => clearTimeout(t);
  }, [duration, paused, runId, dismiss]);

  const onEnter = () => {
    if (duration <= 0) return;
    remaining.current -= Date.now() - startedAt.current;
    setPaused(true);
  };
  const onLeave = () => {
    if (duration <= 0) return;
    setPaused(false);
    setRunId((n) => n + 1);
  };

  const pctStart = duration > 0 ? Math.max(0, (remaining.current / duration) * 100) : 0;
  const barCls = `absolute bottom-0 left-0 h-0.5 ${barColors[type] || barColors.info}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className={`
            fixed z-50 flex items-center gap-4 p-4 rounded-xl border shadow-2xl max-w-md overflow-hidden
            ${variants[type] || variants.info}
            ${positionClasses[position] || positionClasses["bottom-right"]}
            ${className}
          `}
          role="alert"
          aria-live="assertive"
          {...props}
        >
          <div className="flex-shrink-0">{icons[type]}</div>
          <div className="flex-1 text-sm font-medium leading-tight">{message}</div>
          <button
            onClick={dismiss}
            className="flex-shrink-0 text-[var(--muted)] hover:text-[var(--text)] transition-colors focus:outline-none"
            aria-label="Close toast"
          >
            <X className="size-5" />
          </button>

          {duration > 0 &&
            !reduce &&
            (paused ? (
              <span className={barCls} style={{ width: `${pctStart}%` }} />
            ) : (
              <motion.span
                key={runId}
                className={barCls}
                initial={{ width: `${pctStart}%` }}
                animate={{ width: "0%" }}
                transition={{ duration: remaining.current / 1000, ease: "linear" }}
              />
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
