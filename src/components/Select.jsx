// Select.jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../utils/cn";

const Select = ({
  options = [], // [{ label, value }] or ["a", "b"]
  value,
  onChange,
  placeholder = "Select...",
  label,
  disabled = false,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const normalized = options.map((o) =>
    typeof o === "object" ? o : { label: String(o), value: o }
  );
  const selected = normalized.find((o) => o.value === value);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className={cn("flex flex-col gap-1", className)} ref={ref}>
      {label && (
        <span className="text-sm font-medium text-[var(--muted)]">{label}</span>
      )}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] transition-colors focus:outline-none focus:border-[var(--primary)]",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          )}
        >
          <span className={cn(!selected && "text-[var(--muted)]")}>
            {selected ? selected.label : placeholder}
          </span>
          <motion.span animate={{ rotate: open ? 180 : 0 }}>
            <ChevronDown className="size-4" />
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 mt-2 w-full max-h-60 overflow-auto rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xl p-1"
            >
              {normalized.map((o) => {
                const active = o.value === value;
                return (
                  <li
                    key={String(o.value)}
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange?.(o.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors hover:bg-[var(--surface-hover)]",
                      active && "text-[var(--primary)]"
                    )}
                  >
                    {o.label}
                    {active && <Check className="size-4" />}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Select;
