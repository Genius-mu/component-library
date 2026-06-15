// Accordion.jsx
import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils/cn";

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
        className="w-full py-4 flex justify-between items-center text-left font-medium text-[var(--text)] gap-3"
      >
        <span className="flex items-center gap-2">
          {Icon && <Icon className="size-5 text-[var(--primary)]" />}
          {title}
        </span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="size-5 text-[var(--muted)]" />
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
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-[var(--muted)]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
