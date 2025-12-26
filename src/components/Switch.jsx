import React from "react";
import { motion } from "framer-motion";

const Switch = ({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  className = "",
}) => {
  const sizes = {
    sm: { width: "2.5rem", height: "1.5rem", knob: "1rem" },
    md: { width: "3rem", height: "1.75rem", knob: "1.25rem" },
    lg: { width: "3.5rem", height: "2rem", knob: "1.5rem" },
  };

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === " ") && !disabled) {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      style={{
        width: sizes[size].width,
        height: sizes[size].height,
      }}
    >
      <div
        className={`absolute inset-0 rounded-full transition-colors ${
          checked ? "bg-[var(--primary)]" : "bg-[var(--border)]"
        }`}
      />
      <motion.div
        className="absolute top-0.5 left-0.5 bg-white rounded-full shadow-md"
        animate={{
          x: checked ? `calc(100% - ${sizes[size].knob})` : "0rem",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          width: sizes[size].knob,
          height: sizes[size].knob,
        }}
      />
    </button>
  );
};

export default Switch;
