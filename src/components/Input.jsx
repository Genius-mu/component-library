// Input.jsx
import { forwardRef, useId } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "../utils/cn";

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-5 py-4 text-lg",
};

const Input = forwardRef(
  (
    {
      label,
      id,
      type = "text",
      error,
      hint,
      size = "md",
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className = "",
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id || autoId;
    const describedBy = error
      ? `${inputId}-error`
      : hint
      ? `${inputId}-hint`
      : undefined;

    return (
      <div className={cn("flex flex-col gap-1", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--muted)]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {LeftIcon && (
            <LeftIcon className="absolute left-3 size-5 text-[var(--muted)] pointer-events-none" />
          )}
          <motion.input
            ref={ref}
            id={inputId}
            type={type}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            whileFocus={{ borderColor: "var(--primary)" }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={cn(
              "w-full rounded-xl bg-[var(--surface)] border text-[var(--text)] focus:outline-none transition-colors",
              sizes[size] || sizes.md,
              LeftIcon && "pl-10",
              RightIcon && "pr-10",
              error
                ? "border-red-500/60 focus:border-red-500"
                : "border-[var(--border)] focus:border-[var(--primary)]"
            )}
            {...props}
          />
          {RightIcon && (
            <RightIcon className="absolute right-3 size-5 text-[var(--muted)] pointer-events-none" />
          )}
        </div>
        {error ? (
          <motion.p
            id={`${inputId}-error`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-400 flex items-center gap-1 mt-1"
          >
            <AlertCircle className="size-4" />
            {error}
          </motion.p>
        ) : (
          hint && (
            <p id={`${inputId}-hint`} className="text-xs text-[var(--muted)] mt-1">
              {hint}
            </p>
          )
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
