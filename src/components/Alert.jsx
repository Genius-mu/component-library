// Alert.jsx
import { memo } from "react";
import { motion } from "framer-motion";
import { Info, CheckCircle, AlertCircle, XCircle, X } from "lucide-react";
import { cn } from "../utils/cn";

const variantStyles = {
  info: {
    cls: "bg-[var(--surface)] border-[var(--primary)]/30 text-[var(--text)]",
    icon: <Info className="size-5 text-[var(--primary)]" />,
  },
  success: {
    cls: "bg-green-950/30 border-green-500/30 text-green-400",
    icon: <CheckCircle className="size-5 text-green-400" />,
  },
  warning: {
    cls: "bg-yellow-950/30 border-yellow-500/30 text-yellow-400",
    icon: <AlertCircle className="size-5 text-yellow-400" />,
  },
  danger: {
    cls: "bg-red-950/30 border-red-500/30 text-red-400",
    icon: <XCircle className="size-5 text-red-400" />,
  },
};

const sizePad = { sm: "p-3 gap-3", md: "p-5 gap-4", lg: "p-6 gap-4" };

const Alert = ({
  children,
  variant = "info",
  title,
  icon,
  action,
  size = "md",
  dismissible = false,
  onDismiss,
  className = "",
  ...props
}) => {
  const style = variantStyles[variant] || variantStyles.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex items-start rounded-xl border",
        sizePad[size] || sizePad.md,
        style.cls,
        className
      )}
      role="alert"
      aria-live="polite"
      {...props}
    >
      <div className="flex-shrink-0 mt-0.5">{icon ?? style.icon}</div>
      <div className="flex-1">
        {title && <h4 className="text-base font-semibold mb-1">{title}</h4>}
        <div className="text-sm leading-relaxed">{children}</div>
        {action && <div className="mt-3">{action}</div>}
      </div>
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

export default memo(Alert);
