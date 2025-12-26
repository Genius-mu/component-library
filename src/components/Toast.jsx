// components/Toast.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const Toast = ({
  message,
  type = "info", // info, success, warning, error
  duration = 5000,
  onClose,
  position = "bottom-right", // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
  className = "",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300); // Wait for exit animation
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

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

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`
            fixed z-50 flex items-center gap-4 p-4 rounded-xl border shadow-2xl max-w-md
            ${variants[type] || variants.info}
            ${positionClasses[position] || positionClasses["bottom-right"]}
            ${className}
          `}
          role="alert"
          aria-live="assertive"
          {...props}
        >
          {/* Icon */}
          <div className="flex-shrink-0">{icons[type]}</div>

          {/* Content */}
          <div className="flex-1 text-sm font-medium leading-tight">
            {message}
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose?.(), 300);
            }}
            className="flex-shrink-0 text-[var(--muted)] hover:text-[var(--text)] transition-colors focus:outline-none"
            aria-label="Close toast"
          >
            <X className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
