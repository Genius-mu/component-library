// Slider.jsx
import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

const Slider = ({
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  formatValue,
  disabled = false,
  className = "",
}) => {
  const trackRef = useRef(null);
  const pct = ((value - min) / (max - min)) * 100;
  const display = formatValue ? formatValue(value) : value;

  const setFromClientX = useCallback(
    (clientX) => {
      if (!trackRef.current || disabled) return;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      const raw = min + ratio * (max - min);
      onChange?.(clamp(Math.round(raw / step) * step, min, max));
    },
    [min, max, step, onChange, disabled]
  );

  const onPointerDown = (e) => {
    if (disabled) return;
    setFromClientX(e.clientX);
    const move = (ev) => setFromClientX(ev.clientX);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const onKeyDown = (e) => {
    if (disabled) return;
    const map = {
      ArrowRight: step,
      ArrowUp: step,
      ArrowLeft: -step,
      ArrowDown: -step,
      PageUp: step * 10,
      PageDown: -step * 10,
    };
    if (e.key === "Home") return onChange?.(min), e.preventDefault();
    if (e.key === "End") return onChange?.(max), e.preventDefault();
    if (map[e.key] !== undefined) {
      e.preventDefault();
      onChange?.(clamp(value + map[e.key], min, max));
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {(label || showValue) && (
        <div className="flex justify-between text-sm text-[var(--muted)]">
          {label && <span>{label}</span>}
          {showValue && <span className="text-[var(--text)] tabular-nums">{display}</span>}
        </div>
      )}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={label || "Slider"}
        style={{ touchAction: "none" }}
        className={cn(
          "relative h-2 rounded-full bg-[var(--border)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-[var(--primary)] transition-[width] duration-75"
          style={{ width: `${pct}%` }}
        />
        <motion.div
          className="absolute top-1/2 size-4 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-md border border-[var(--border)]"
          style={{ left: `${pct}%` }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 1.25 }}
        />
      </div>
    </div>
  );
};

export default Slider;
