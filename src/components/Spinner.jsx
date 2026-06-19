// Spinner.jsx
import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../utils/cn";

const sizeClasses = {
  xs: "size-4",
  sm: "size-5",
  md: "size-6",
  lg: "size-8",
  xl: "size-10",
  "2xl": "size-12",
};

// Circular mask that punches out the centre, leaving a 3px ring.
const RING_MASK =
  "radial-gradient(farthest-side, #0000 calc(100% - 3px), #000 calc(100% - 3px))";

const Spinner = ({
  size = "md",
  variant = "ring", // "ring" | "dots"
  speed = 1,
  label = "Loading",
  className = "",
  ...props
}) => {
  const v = variant === "dot" || variant === "dots" ? "dots" : "ring";
  const reduce = useReducedMotion();

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
            animate={
              reduce
                ? { opacity: 0.7 }
                : { scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration: speed,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay,
                  }
            }
          />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  // Premium ring: a conic "comet" gradient masked into a thin ring.
  return (
    <motion.span
      role="status"
      aria-label={label}
      animate={reduce ? {} : { rotate: 360 }}
      transition={
        reduce
          ? undefined
          : { duration: speed, repeat: Infinity, ease: "linear" }
      }
      className={cn(
        "inline-block rounded-full",
        sizeClasses[size] || sizeClasses.md,
        className,
      )}
      style={{
        background:
          "conic-gradient(from 0deg, transparent 0deg, var(--primary) 300deg, var(--primary) 360deg)",
        WebkitMask: RING_MASK,
        mask: RING_MASK,
      }}
      {...props}
    />
  );
};

export default memo(Spinner);
