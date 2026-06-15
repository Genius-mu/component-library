// Select.jsx
import { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../utils/cn";

const Select = ({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  label,
  error,
  disabled = false,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const ref = useRef(null);
  const listId = useId();

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

  const choose = (o) => {
    onChange?.(o.value);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (disabled) return;
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) e.preventDefault();
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      setOpen(true);
      setHighlight(normalized.findIndex((o) => o.value === value));
      return;
    }
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown")
      setHighlight((h) => Math.min(h + 1, normalized.length - 1));
    if (e.key === "ArrowUp") setHighlight((h) => Math.max(h - 1, 0));
    if ((e.key === "Enter" || e.key === " ") && open && highlight >= 0)
      choose(normalized[highlight]);
  };

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
          onKeyDown={onKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          className={cn(
            "w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-[var(--surface)] border text-[var(--text)] transition-colors focus:outline-none",
            error
              ? "border-red-500/60 focus:border-red-500"
              : "border-[var(--border)] focus:border-[var(--primary)]",
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
              id={listId}
              role="listbox"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 mt-2 w-full max-h-60 overflow-auto rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xl p-1"
            >
              {normalized.map((o, i) => {
                const active = o.value === value;
                const hl = i === highlight;
                return (
                  <li
                    key={String(o.value)}
                    role="option"
                    aria-selected={active}
                    onMouseEnter={() => setHighlight(i)}
                    onClick={() => choose(o)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors",
                      hl && "bg-[var(--surface-hover)]",
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
      {error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  );
};

export default Select;
