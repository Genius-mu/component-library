// components/Badge.jsx
import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react"; // Optional icons for success/danger

const Badge = ({
  children,
  variant = "default", // default, primary, success, warning, danger, outline
  size = "md",
  rounded = "full", // full, lg, md
  withIcon = false, // auto-adds icon for success/danger
  className = "",
  ...props
}) => {
  // Size variants
  const sizeClasses = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  // Rounded variants
  const roundedClasses = {
    full: "rounded-full",
    lg: "rounded-lg",
    md: "rounded-md",
  };

  // Variant styles (theme-aware with your OKLCH colors)
  const variantClasses = {
    default:
      "bg-[var(--surface)] text-[var(--text)] border border-[var(--border)]",
    primary:
      "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30",
    success: "bg-green-500/10 text-green-400 border border-green-500/30",
    warning: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
    danger: "bg-red-500/10 text-red-400 border border-red-500/30",
    outline: "bg-transparent text-[var(--muted)] border border-[var(--muted)]",
  };

  // Optional icon mapping
  const icons = {
    success: <Check className="size-3.5" />,
    danger: <X className="size-3.5" />,
  };

  const showIcon = withIcon && (variant === "success" || variant === "danger");
  const icon = showIcon ? icons[variant] : null;

  return (
    <motion.span
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        inline-flex items-center justify-center gap-1.5 font-medium
        ${sizeClasses[size] || sizeClasses.md}
        ${roundedClasses[rounded] || roundedClasses.full}
        ${variantClasses[variant] || variantClasses.default}
        ${className}
        transition-colors duration-200
      `}
      {...props}
    >
      {icon}
      {children}
    </motion.span>
  );
};

export default Badge;
