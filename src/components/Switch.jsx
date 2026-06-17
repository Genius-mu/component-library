// Switch.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const SIZES = {
  sm: { width: "2.5rem", height: "1.5rem", knob: "1rem" },
  md: { width: "3rem", height: "1.75rem", knob: "1.25rem" },
  lg: { width: "3.5rem", height: "2rem", knob: "1.5rem" },
};

const KNOB_SPRING = { type: "spring", stiffness: 520, damping: 34, mass: 0.6 };

const Switch = ({
  checked = false,
  onChange,
  label,
  labelPosition = "right",
  disabled = false,
  size = "md",
  className = "",
}) => {
  const dims = SIZES[size] || SIZES.md;
  const [pressed, setPressed] = useState(false);

  // Knob travel = track width − knob − the 0.125rem gap on each side.
  const travel = `calc(${dims.width} - ${dims.knob} - 0.25rem)`;

  const toggle = () => !disabled && onChange?.(!checked);
  const onKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  /* ---------- the toggle itself ---------- */
  const track = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={toggle}
      onKeyDown={onKeyDown}
      onPointerDown={() => !disabled && setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{ width: dims.width, height: dims.height }}
      className={cn(
        "relative inline-flex shrink-0 items-center rounded-full",
        "transition-[background-color,box-shadow] duration-300 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        checked
          ? "bg-[var(--primary)] shadow-[0_0_20px_-4px_var(--primary)]"
          : "bg-[var(--border)]",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      )}
    >
      {/* recessed inner shadow — gives the track physical depth */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.28)]"
      />

      {/* knob — slides on a spring and stretches toward travel while pressed */}
      <motion.span
        aria-hidden="true"
        className="absolute top-1 left-0.8 rounded-full bg-gradient-to-b from-white to-white/80 shadow-[0_1px_3px_rgba(0,0,0,0.4)] ring-1 ring-black/5"
        style={{
          width: dims.knob,
          height: dims.knob,
          transformOrigin: checked ? "right center" : "left center",
        }}
        animate={{ x: checked ? travel : "0rem", scaleX: pressed ? 1.18 : 1 }}
        transition={KNOB_SPRING}
      />
    </button>
  );

  /* ---------- bare (no label) ---------- */
  if (!label)
    return <span className={cn("inline-flex", className)}>{track}</span>;

  /* ---------- labelled ---------- */
  return (
    <label
      className={cn(
        "inline-flex items-center gap-2.5 select-none",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        labelPosition === "left" && "flex-row-reverse",
        className,
      )}
    >
      {track}
      <span className="text-sm font-medium text-[var(--text)]">{label}</span>
    </label>
  );
};

export default Switch;
