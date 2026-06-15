// Button.jsx
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "../utils/cn";

const variants = {
  primary:
    "bg-[var(--primary)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)] text-white",
  secondary:
    "bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text)]",
  outline:
    "bg-transparent hover:bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]",
  ghost: "bg-transparent hover:bg-[var(--surface-hover)] text-[var(--text)]",
  danger: "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white",
  success: "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white",
};

const sizes = {
  sm: "px-4 py-2 text-sm gap-1.5 rounded-lg",
  md: "px-6 py-3 text-base gap-2 rounded-xl",
  lg: "px-8 py-4 text-lg gap-2.5 rounded-2xl",
};

const Button = forwardRef(
  (
    {
      children,
      icon: Icon,
      iconPosition = "left",
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    return (
      <motion.button
        ref={ref}
        whileHover={isDisabled ? undefined : { scale: 1.04 }}
        whileTap={isDisabled ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        disabled={isDisabled}
        aria-busy={loading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
          sizes[size] || sizes.md,
          variants[variant] || variants.primary,
          fullWidth && "w-full",
          isDisabled && "opacity-60 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="size-5 animate-spin" />}
        {!loading && Icon && iconPosition === "left" && <Icon className="size-5" />}
        {children}
        {!loading && Icon && iconPosition === "right" && <Icon className="size-5" />}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export default Button;
