// Textarea.jsx
import { forwardRef, useId } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "../utils/cn";

const Textarea = forwardRef(
  (
    {
      label,
      id,
      error,
      hint,
      rows = 4,
      maxLength,
      showCount = false,
      value,
      className = "",
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const taId = id || autoId;
    const count = typeof value === "string" ? value.length : 0;

    return (
      <div className={cn("flex flex-col gap-1", className)}>
        {label && (
          <label htmlFor={taId} className="text-sm font-medium text-[var(--muted)]">
            {label}
          </label>
        )}
        <motion.textarea
          ref={ref}
          id={taId}
          rows={rows}
          value={value}
          maxLength={maxLength}
          aria-invalid={!!error}
          whileFocus={{ borderColor: "var(--primary)" }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={cn(
            "px-4 py-3 rounded-xl bg-[var(--surface)] border text-[var(--text)] focus:outline-none transition-colors resize-y",
            error
              ? "border-red-500/60 focus:border-red-500"
              : "border-[var(--border)] focus:border-[var(--primary)]"
          )}
          {...props}
        />
        <div className="flex items-center justify-between gap-2 min-h-[1rem]">
          <span>
            {error ? (
              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400 flex items-center gap-1"
              >
                <AlertCircle className="size-4" />
                {error}
              </motion.span>
            ) : (
              hint && <span className="text-xs text-[var(--muted)]">{hint}</span>
            )}
          </span>
          {showCount && maxLength && (
            <span className="text-xs text-[var(--muted)] tabular-nums">
              {count}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export default Textarea;
