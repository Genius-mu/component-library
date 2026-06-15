// Spinner.jsx
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const sizeClasses = {
  xs: "size-4",
  sm: "size-5",
  md: "size-6",
  lg: "size-8",
  xl: "size-10",
  "2xl": "size-12",
};

const Spinner = ({
  size = "md",
  variant = "ring", // "ring" | "dots"
  speed = 1,
  label = "Loading",
  className = "",
  ...props
}) => {
  // Back-compat: old variant names map to the two clean variants.
  const v = variant === "dot" || variant === "dots" ? "dots" : "ring";

  if (v === "dots") {
    return (
      <div
        role="status"
        aria-label={label}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      >
        {[0, 0.15, 0.3].map((delay, i) => (
          <motion.span
            key={i}
            className="size-2 rounded-full bg-[var(--primary)]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: speed, repeat: Infinity, ease: "easeInOut", delay }}
          />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  return (
    <motion.span
      role="status"
      aria-label={label}
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      className={cn(
        "inline-block rounded-full border-2 border-[var(--muted)]/30 border-t-[var(--primary)]",
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      {...props}
    />
  );
};

export default Spinner;
