// ToastContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const ToastContext = createContext(null);

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
  "top-right": "top-4 right-4 items-end",
  "top-left": "top-4 left-4 items-start",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
};

export const ToastProvider = ({
  children,
  position = "bottom-right",
  duration = 5000,
}) => {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (message, type = "info", opts = {}) => {
      const id = crypto?.randomUUID?.() ?? Date.now() + Math.random();
      const d = opts.duration ?? duration;
      setToasts((t) => [...t, { id, message, type }]);
      if (d > 0) setTimeout(() => dismiss(id), d);
      return id;
    },
    [duration, dismiss]
  );

  // Convenience API: toast.success(), toast.error(), etc.
  const toast = {
    show: push,
    info: (m, o) => push(m, "info", o),
    success: (m, o) => push(m, "success", o),
    warning: (m, o) => push(m, "warning", o),
    error: (m, o) => push(m, "error", o),
    dismiss,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        className={`fixed z-50 flex flex-col gap-3 ${positionClasses[position] || positionClasses["bottom-right"]}`}
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex items-center gap-4 p-4 rounded-xl border shadow-2xl max-w-md ${variants[t.type] || variants.info}`}
              role="alert"
              aria-live="assertive"
            >
              <div className="flex-shrink-0">{icons[t.type]}</div>
              <div className="flex-1 text-sm font-medium leading-tight">
                {t.message}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="flex-shrink-0 text-[var(--muted)] hover:text-[var(--text)] transition-colors focus:outline-none"
                aria-label="Close toast"
              >
                <X className="size-5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx)
    throw new Error("useToast must be used within a <ToastProvider>");
  return ctx;
};
