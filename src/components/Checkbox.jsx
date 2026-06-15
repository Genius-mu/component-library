// Checkbox.jsx
import { useId } from "react";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { cn } from "../utils/cn";

const sizes = {
  sm: { box: "size-4", icon: "size-3" },
  md: { box: "size-5", icon: "size-3.5" },
  lg: { box: "size-6", icon: "size-4" },
};

const Checkbox = ({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  description,
  size = "md",
  disabled = false,
  id,
  className = "",
  ...props
}) => {
  const autoId = useId();
  const cbId = id || autoId;
  const s = sizes[size] || sizes.md;
  const active = checked || indeterminate;
  const toggle = () => !disabled && onChange?.(!checked);

  return (
    <label
      htmlFor={cbId}
      className={cn(
        "inline-flex items-start gap-2 select-none",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      <button
        id={cbId}
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : checked}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "flex items-center justify-center rounded-md border transition-colors mt-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
          s.box,
          active
            ? "bg-[var(--primary)] border-[var(--primary)]"
            : "bg-[var(--surface)] border-[var(--border)]"
        )}
        {...props}
      >
        <motion.span
          initial={false}
          animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {indeterminate ? (
            <Minus className={cn(s.icon, "text-white")} strokeWidth={3} />
          ) : (
            <Check className={cn(s.icon, "text-white")} strokeWidth={3} />
          )}
        </motion.span>
      </button>
      {(label || description) && (
        <span className="flex flex-col">
          {label && <span className="text-sm text-[var(--text)]">{label}</span>}
          {description && (
            <span className="text-xs text-[var(--muted)]">{description}</span>
          )}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
