// ProgressBar.jsx
import { motion, useScroll } from "framer-motion";
import { cn } from "../utils/cn";

/**
 * Two modes:
 * - Determinate: pass `value` (0–max). Renders an inline labelled bar.
 * - Scroll-linked: omit `value`. Renders a fixed bar at the top tracking
 *   page scroll progress (original behaviour).
 */
const ProgressBar = ({
  value,
  max = 100,
  height = 6,
  showLabel = false,
  className = "",
}) => {
  const { scrollYProgress } = useScroll();

  // Scroll-linked mode
  if (value === undefined || value === null) {
    return (
      <motion.div
        className={cn("fixed top-0 left-0 right-0 bg-[var(--primary)] origin-left z-50", className)}
        style={{ scaleX: scrollYProgress, height }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />
    );
  }

  // Determinate mode
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-[var(--muted)] mb-1">
          <span>Progress</span>
          <span className="tabular-nums">{Math.round(pct)}%</span>
        </div>
      )}
      <div
        className="w-full rounded-full bg-[var(--border)] overflow-hidden"
        style={{ height }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <motion.div
          className="h-full rounded-full bg-[var(--primary)]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 25 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
