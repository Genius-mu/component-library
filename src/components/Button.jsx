// Button.jsx
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "../utils/cn";

const variants = {
  primary:
    "bg-[var(--primary)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)] text-white shadow-lg shadow-[var(--primary)]/25 hover:shadow-xl hover:shadow-[var(--primary)]/45",
  secondary:
    "bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--text)] shadow-lg shadow-black/20",
  outline: "bg-transparent hover:bg-[var(--surface)] text-[var(--text)]",
  ghost: "bg-transparent hover:bg-[var(--surface-hover)] text-[var(--text)]",
  danger:
    "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/45",
  success:
    "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/45",
};

// The soft outer halo border (sits just outside the button, ~40% opacity).
const ringColors = {
  primary: "border-[var(--primary)]",
  secondary: "border-[var(--border)]",
  outline: "border-[var(--border)]",
  ghost: "border-transparent",
  danger: "border-red-500",
  success: "border-green-500",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
};

const gaps = { sm: "gap-1.5", md: "gap-2", lg: "gap-2.5" };

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
    ref,
  ) => {
    const isDisabled = disabled || loading;
    return (
      <motion.button
        ref={ref}
        whileHover={isDisabled ? undefined : { scale: 1.02, y: -2 }}
        whileTap={isDisabled ? undefined : { scale: 0.97, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        disabled={isDisabled}
        aria-busy={loading}
        className={cn(
          "group relative isolate inline-flex items-center justify-center font-medium transition-[color,background-color,box-shadow] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
          sizes[size] || sizes.md,
          variants[variant] || variants.primary,
          fullWidth && "w-full",
          isDisabled && "opacity-60 cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {/* soft outer halo border */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -inset-0.5 rounded-[inherit] border-2 opacity-40 transition-opacity duration-300",
            !isDisabled && "group-hover:opacity-75",
            ringColors[variant] || ringColors.primary,
          )}
        />
        {/* sheen sweep on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
        >
          <span className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[450%]" />
        </span>
        {/* content */}
        <span
          className={cn(
            "relative z-10 inline-flex items-center justify-center",
            gaps[size] || gaps.md,
          )}
        >
          {loading && <Loader2 className="size-5 animate-spin" />}
          {!loading && Icon && iconPosition === "left" && (
            <Icon className="size-5" />
          )}
          {children}
          {!loading && Icon && iconPosition === "right" && (
            <Icon className="size-5" />
          )}
        </span>
      </motion.button>
    );
  },
);
Button.displayName = "Button";

export default Button;
