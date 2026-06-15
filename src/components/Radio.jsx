// Radio.jsx
import { createContext, useContext } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const RadioGroupContext = createContext(null);

export const RadioGroup = ({ value, onChange, children, className = "" }) => (
  <RadioGroupContext.Provider value={{ value, onChange }}>
    <div role="radiogroup" className={cn("flex flex-col gap-2", className)}>
      {children}
    </div>
  </RadioGroupContext.Provider>
);

export const Radio = ({ value, label, disabled = false, className = "" }) => {
  const group = useContext(RadioGroupContext);
  const checked = group?.value === value;
  const select = () => !disabled && group?.onChange?.(value);

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 select-none",
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
          "flex items-center justify-center size-5 rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]",
          checked ? "border-[var(--primary)]" : "border-[var(--border)]",
          "bg-[var(--surface)]"
        )}
      >
        <motion.span
          initial={false}
          animate={{ scale: checked ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="size-2.5 rounded-full bg-[var(--primary)]"
        />
      </button>
      {label && <span className="text-sm text-[var(--text)]">{label}</span>}
    </label>
  );
};

export default Radio;
