// components/Spinner.jsx
import React from "react";
import { motion } from "framer-motion";

const Spinner = ({
  size = "md",
  color = "var(--primary)", // Theme's primary accent
  variant = "default", // default, subtle, gradient, dot
  speed = 1.2, // Animation duration in seconds
  className = "",
  ...props
}) => {
  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
    "2xl": "w-12 h-12",
  };

  const variants = {
    default: "border-2 border-current border-t-transparent",
    subtle: "border-2 border-[var(--muted)]/50 border-t-[var(--primary)]",
    gradient:
      "border-2 border-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/50",
    dot: "flex gap-1.5 items-center", // Dot variant uses children divs
  };

  // Dot variant animation for bouncing dots
  const dotAnimation = {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.5, 1, 0.5],
    },
    transition: {
      duration: speed / 2,
      repeat: Infinity,
      repeatDelay: 0.1,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      animate={variant === "dot" ? {} : { rotate: 360, scale: [1, 1.05, 1] }} // Pulse for non-dot variants
      transition={
        variant === "dot"
          ? {}
          : {
              rotate: { duration: speed, repeat: Infinity, ease: "linear" },
              scale: {
                duration: speed * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
      }
      className={`
        ${variant === "dot" ? "" : "rounded-full"}
        ${sizeClasses[size] || sizeClasses.md}
        ${variants[variant] || variants.default}
        ${className}
        will-change-transform
      `}
      style={{
        color: color === "var(--primary)" ? undefined : color,
      }}
      aria-label="Loading"
      aria-busy="true"
      role="status"
      {...props}
    >
      {variant === "dot" && (
        <>
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"
            {...dotAnimation}
            transition={{ ...dotAnimation.transition, delay: 0 }}
          />
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"
            {...dotAnimation}
            transition={{ ...dotAnimation.transition, delay: 0.2 }}
          />
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"
            {...dotAnimation}
            transition={{ ...dotAnimation.transition, delay: 0.4 }}
          />
        </>
      )}
    </motion.div>
  );
};

export default Spinner;
