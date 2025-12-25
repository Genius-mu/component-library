// Accordion.jsx
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--border)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left font-medium"
      >
        {title}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="size-5 text-[var(--muted)]" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }} // Smooth "heavy" expand
        className="overflow-hidden"
      >
        <div className="pb-4 text-[var(--muted)]">{children}</div>
      </motion.div>
    </div>
  );
};

export default Accordion;
