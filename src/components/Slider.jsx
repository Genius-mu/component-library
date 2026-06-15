// Slider.jsx
import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const Slider = ({
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  disabled = false,
  className = "",
}) => {
  const trackRef = useRef(null);
  const pct = ((value - min) / (max - min)) * 100;

  const setFromClientX = useCallback(
    (clientX) => {
      if (!trackRef.current || disabled) return;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      const raw = min + ratio * (max - min);
      const stepped = Math.round(raw / step) * step;
      onChange?.(Math.min(Math.max(stepped, min), max));
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

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {(label || showValue) && (
        <div className="flex justify-between text-sm text-[var(--muted)]">
          {label && <span>{label}</span>}
          {showValue && <span className="text-[var(--text)]">{value}</span>}
        </div>
      )}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(
          "relative h-2 rounded-full bg-[var(--border)]",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-[var(--primary)]"
          style={{ width: `${pct}%` }}
        />
        <motion.div
          className="absolute top-1/2 size-4 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-md border border-[var(--border)]"
          style={{ left: `${pct}%` }}
          whileTap={{ scale: 1.2 }}
        />
      </div>
    </div>
  );
};

export default Slider;
