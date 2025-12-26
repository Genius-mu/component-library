// components/Alert.jsx
import React from "react";
import { motion } from "framer-motion";
import { Info, CheckCircle, AlertCircle, XCircle, X } from "lucide-react";

const Alert = ({
  children,
  variant = "info", // info, success, warning, danger
  title,
  dismissible = false,
  onDismiss,
  className = "",
  ...props
}) => {
  // Variant styles using your theme variables
  const variantStyles = {
    info: {
      bg: "bg-[var(--surface)]",
      border: "border-[var(--primary)]/30",
      text: "text-[var(--text)]",
      icon: <Info className="size-5 text-[var(--primary)]" />,
    },
    success: {
      bg: "bg-green-950/30",
      border: "border-green-500/30",
      text: "text-green-400",
      icon: <CheckCircle className="size-5 text-green-400" />,
    },
    warning: {
      bg: "bg-yellow-950/30",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
      icon: <AlertCircle className="size-5 text-yellow-400" />,
    },
    danger: {
      bg: "bg-red-950/30",
      border: "border-red-500/30",
      text: "text-red-400",
      icon: <XCircle className="size-5 text-red-400" />,
    },
  };

  const style = variantStyles[variant] || variantStyles.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        flex items-start gap-4 p-5 rounded-xl border
        ${style.bg} ${style.border} ${style.text}
        ${className}
      `}
      role="alert"
      aria-live="polite"
      {...props}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">{style.icon}</div>

      {/* Content */}
      <div className="flex-1">
        {title && <h4 className="text-base font-semibold mb-1">{title}</h4>}
        <p className="text-sm leading-relaxed">{children}</p>
      </div>

      {/* Dismiss Button */}
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-[var(--muted)] hover:text-[var(--text)] transition-colors focus:outline-none"
          aria-label="Dismiss alert"
        >
          <X className="size-5" />
        </button>
      )}
    </motion.div>
  );
};

export default Alert;
