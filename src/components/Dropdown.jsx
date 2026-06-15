// Dropdown.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils/cn";

const Dropdown = ({ trigger, items = [], onSelect, align = "right", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pick = (item) => {
    item.onClick?.();
    onSelect?.(item);
    setIsOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") return setIsOpen(false);
    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      e.preventDefault();
      setIsOpen(true);
      setHighlight(0);
      return;
    }
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, items.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    }
    if (e.key === "Enter" && highlight >= 0) {
      e.preventDefault();
      pick(items[highlight]);
    }
  };

  return (
    <div className={cn("relative inline-block", className)} ref={ref}>
      <button
        onClick={() => setIsOpen((o) => !o)}
        onKeyDown={onKeyDown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
      >
        {trigger}
        <ChevronDown
          className={cn("size-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="menu"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute mt-2 w-56 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-2xl py-2 z-50",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li key={idx} role="none">
                  <button
                    role="menuitem"
                    onMouseEnter={() => setHighlight(idx)}
                    onClick={() => pick(item)}
                    className={cn(
                      "w-full flex items-center gap-2 text-left px-4 py-3 transition-colors",
                      highlight === idx && "bg-[var(--surface-hover)]",
                      item.danger
                        ? "text-red-400 hover:text-red-300"
                        : "text-[var(--text)]"
                    )}
                  >
                    {Icon && <Icon className="size-4" />}
                    {item.label}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
