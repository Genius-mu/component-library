// Badge.jsx
import { memo } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../utils/cn";

const sizeClasses = {
  xs: "px-1.5 py-0.5 text-xs",
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

const roundedClasses = { full: "rounded-full", lg: "rounded-lg", md: "rounded-md" };

const variantClasses = {
  default: "bg-[var(--surface)] text-[var(--text)] border border-[var(--border)]",
  primary: "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30",
  success: "bg-green-500/10 text-green-400 border border-green-500/30",
  warning: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
  danger: "bg-red-500/10 text-red-400 border border-red-500/30",
  outline: "bg-transparent text-[var(--muted)] border border-[var(--muted)]",
};

const dotColors = {
  default: "bg-[var(--muted)]",
  primary: "bg-[var(--primary)]",
  success: "bg-green-400",
  warning: "bg-yellow-400",
  danger: "bg-red-400",
  outline: "bg-[var(--muted)]",
};

const Badge = ({
  children,
  variant = "default",
  size = "md",
  rounded = "full",
  dot = false,
  onRemove,
  className = "",
  ...props
}) => (
  <motion.span
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className={cn(
      "inline-flex items-center justify-center gap-1.5 font-medium transition-colors",
      sizeClasses[size] || sizeClasses.md,
      roundedClasses[rounded] || roundedClasses.full,
      variantClasses[variant] || variantClasses.default,
      className
    )}
    {...props}
  >
    {dot && <span className={cn("size-1.5 rounded-full", dotColors[variant] || dotColors.default)} />}
    {children}
    {onRemove && (
      <button
        onClick={onRemove}
        className="ml-0.5 hover:opacity-70 transition-opacity focus:outline-none"
        aria-label="Remove"
      >
        <X className="size-3" />
      </button>
    )}
  </motion.span>
);

export default memo(Badge);
