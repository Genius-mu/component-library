// Tabs.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";

const Tabs = ({ tabs = [], defaultTab = 0, variant = "line", className = "" }) => {
  const [active, setActive] = useState(defaultTab);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") setActive((a) => Math.min(a + 1, tabs.length - 1));
    if (e.key === "ArrowLeft") setActive((a) => Math.max(a - 1, 0));
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        onKeyDown={onKeyDown}
        className={cn(
          "flex gap-2",
          variant === "line" && "border-b border-[var(--border)] gap-8"
        )}
      >
        {tabs.map((tab, i) => {
          const selected = active === i;
          return (
            <button
              key={tab.label}
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "relative font-medium transition-colors focus:outline-none",
                variant === "line" ? "pb-4 px-1 text-lg" : "px-4 py-2 rounded-lg text-sm",
                selected
                  ? variant === "pill"
                    ? "text-white"
                    : "text-[var(--primary)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              )}
            >
              {variant === "pill" && selected && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-lg bg-[var(--primary)] -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {tab.label}
              {variant === "line" && selected && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute -bottom-px left-0 right-0 h-0.5 bg-[var(--primary)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          role="tabpanel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="pt-8"
        >
          {tabs[active]?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Tabs;
