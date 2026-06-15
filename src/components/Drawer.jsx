// Drawer.jsx
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../utils/cn";

const sideConfig = {
  right: { class: "top-0 right-0 h-full w-80 max-w-[85vw]", from: { x: "100%" }, to: { x: 0 } },
  left: { class: "top-0 left-0 h-full w-80 max-w-[85vw]", from: { x: "-100%" }, to: { x: 0 } },
  top: { class: "top-0 left-0 w-full h-1/3", from: { y: "-100%" }, to: { y: 0 } },
  bottom: { class: "bottom-0 left-0 w-full h-1/3", from: { y: "100%" }, to: { y: 0 } },
};

const Drawer = ({
  isOpen,
  onClose,
  side = "right",
  title,
  children,
  className = "",
}) => {
  const cfg = sideConfig[side] || sideConfig.right;

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (isOpen) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.aside
            initial={cfg.from}
            animate={cfg.to}
            exit={cfg.from}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "absolute bg-[var(--surface)] border border-[var(--border)] p-6 overflow-auto",
              cfg.class,
              className
            )}
          >
            <div className="flex items-center justify-between mb-4">
              {title && <h2 className="text-xl font-bold">{title}</h2>}
              <button
                onClick={onClose}
                className="ml-auto text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                aria-label="Close drawer"
              >
                <X className="size-5" />
              </button>
            </div>
            {children}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
