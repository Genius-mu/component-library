// Accordion.jsx
import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils/cn";

const EASE = [0.4, 0, 0.2, 1];

const Accordion = ({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  className = "",
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const id = useId();

  const toggle = () => {
    if (isControlled) onToggle?.(!isOpen);
    else setInternalOpen((o) => !o);
  };

  return (
    <div className={cn("border-b border-[var(--border)]", className)}>
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        id={`${id}-button`}
        className={cn(
          "group w-full py-4 px-2 rounded-lg flex justify-between items-center text-left font-medium gap-3 transition-colors hover:bg-[var(--surface-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
          isOpen ? "text-[var(--primary)]" : "text-[var(--text)]"
        )}
      >
        <span className="flex items-center gap-2">
          {Icon && (
            <Icon
              className={cn(
                "size-5 transition-colors",
                isOpen
                  ? "text-[var(--primary)]"
                  : "text-[var(--muted)] group-hover:text-[var(--text)]"
              )}
            />
          )}
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className={isOpen ? "text-[var(--primary)]" : "text-[var(--muted)]"}
        >
          <ChevronDown className="size-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="pb-4 px-2 text-[var(--muted)]"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
