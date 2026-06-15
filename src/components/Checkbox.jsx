// Checkbox.jsx
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "../utils/cn";

const Checkbox = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  id,
  className = "",
  ...props
}) => {
  const toggle = () => !disabled && onChange?.(!checked);

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-center gap-2 select-none",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      <button
        id={id}
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "flex items-center justify-center size-5 rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]",
          checked
            ? "bg-[var(--primary)] border-[var(--primary)]"
            : "bg-[var(--surface)] border-[var(--border)]"
        )}
        {...props}
      >
        <motion.span
          initial={false}
          animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Check className="size-3.5 text-white" strokeWidth={3} />
        </motion.span>
      </button>
      {label && (
        <span className="text-sm text-[var(--text)]">{label}</span>
      )}
    </label>
  );
};

export default Checkbox;
