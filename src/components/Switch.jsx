import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const sizes = {
  sm: { width: "2.5rem", height: "1.5rem", knob: "1rem" },
  md: { width: "3rem", height: "1.75rem", knob: "1.25rem" },
  lg: { width: "3.5rem", height: "2rem", knob: "1.5rem" },
};

const Switch = ({
  checked = false,
  onChange,
  label,
  labelPosition = "right",
  disabled = false,
  size = "md",
  className = "",
}) => {
  const s = sizes[size] || sizes.md;
  const handleClick = () => !disabled && onChange?.(!checked);
  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === " ") && !disabled) {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  const toggle = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative inline-flex items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      )}
      style={{ width: s.width, height: s.height }}
    >
      <span
        className={cn(
          "absolute inset-0 rounded-full transition-colors",
          checked ? "bg-[var(--primary)]" : "bg-[var(--border)]"
        )}
      />
      <motion.span
        className="absolute top-0.5 left-0.5 bg-white rounded-full shadow-md"
        animate={{ x: checked ? `calc(100% - ${s.knob})` : "0rem" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ width: s.knob, height: s.knob }}
      />
    </button>
  );

  if (!label) return <div className={className}>{toggle}</div>;

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 select-none",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        labelPosition === "left" && "flex-row-reverse",
        className
      )}
    >
      {toggle}
      <span className="text-sm text-[var(--text)]">{label}</span>
    </label>
  );
};

export default Switch;
