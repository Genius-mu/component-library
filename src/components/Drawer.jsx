// Drawer.jsx
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../utils/cn";

const sizeMap = {
  sm: { x: "w-72", y: "h-1/4" },
  md: { x: "w-80", y: "h-1/3" },
  lg: { x: "w-96", y: "h-1/2" },
};

const sideConfig = {
  right: (sz) => ({ cls: `top-0 right-0 h-full ${sz.x} max-w-[85vw]`, from: { x: "100%" }, to: { x: 0 } }),
  left: (sz) => ({ cls: `top-0 left-0 h-full ${sz.x} max-w-[85vw]`, from: { x: "-100%" }, to: { x: 0 } }),
  top: (sz) => ({ cls: `top-0 left-0 w-full ${sz.y}`, from: { y: "-100%" }, to: { y: 0 } }),
  bottom: (sz) => ({ cls: `bottom-0 left-0 w-full ${sz.y}`, from: { y: "100%" }, to: { y: 0 } }),
};

const Drawer = ({
  isOpen,
  onClose,
  side = "right",
  size = "md",
  title,
  children,
  className = "",
}) => {
  const sz = sizeMap[size] || sizeMap.md;
  const cfg = (sideConfig[side] || sideConfig.right)(sz);
  const panelRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    lastFocused.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") return onClose?.();
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => panelRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocused.current?.focus?.();
    };
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
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={title || "Drawer"}
            initial={cfg.from}
            animate={cfg.to}
            exit={cfg.from}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "absolute bg-[var(--surface)] border border-[var(--border)] p-6 overflow-auto focus:outline-none",
              cfg.cls,
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
