// Radio.jsx
import { createContext, useContext } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const RadioGroupContext = createContext(null);

export const RadioGroup = ({
  value,
  onChange,
  orientation = "vertical",
  children,
  className = "",
}) => (
  <RadioGroupContext.Provider value={{ value, onChange }}>
    <div
      role="radiogroup"
      className={cn(
        "flex gap-3",
        orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col",
        className
      )}
    >
      {children}
    </div>
  </RadioGroupContext.Provider>
);

const sizes = {
  sm: { box: "size-4", dot: "size-1.5" },
  md: { box: "size-5", dot: "size-2.5" },
  lg: { box: "size-6", dot: "size-3" },
};

export const Radio = ({
  value,
  label,
  description,
  size = "md",
  disabled = false,
  className = "",
}) => {
  const group = useContext(RadioGroupContext);
  const checked = group?.value === value;
  const s = sizes[size] || sizes.md;
  const select = () => !disabled && group?.onChange?.(value);

  return (
    <label
      className={cn(
        "inline-flex items-start gap-2 select-none",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      <button
        type="button"
        role="radio"
        aria-checked={checked}
        disabled={disabled}
        onClick={select}
        className={cn(
          "flex items-center justify-center rounded-full border transition-colors mt-0.5 bg-[var(--surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
          s.box,
          checked ? "border-[var(--primary)]" : "border-[var(--border)]"
        )}
      >
        <motion.span
          initial={false}
          animate={{ scale: checked ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn("rounded-full bg-[var(--primary)]", s.dot)}
        />
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

export default Radio;
