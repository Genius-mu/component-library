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
    ref,
  ) => {
    const autoId = useId();
    const inputId = id || autoId;
    const describedBy = error
      ? `${inputId}-error`
      : hint
        ? `${inputId}-hint`
        : undefined;

    const iconColor = error
      ? "text-red-400"
      : "text-[var(--muted)] group-focus-within:text-[var(--primary)]";

    return (
      <div className={cn("group flex flex-col gap-1.5", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium transition-colors",
              error
                ? "text-red-400"
                : "text-[var(--muted)] group-focus-within:text-[var(--primary)]",
            )}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {LeftIcon && (
            <LeftIcon
              className={cn(
                "absolute left-3.5 size-5 pointer-events-none z-10 transition-colors",
                iconColor,
              )}
            />
          )}
          <motion.input
            ref={ref}
            id={inputId}
            type={type}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            whileFocus={error ? undefined : { borderColor: "var(--primary)" }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={cn(
              "w-full rounded-xl bg-[var(--surface)] border shadow-sm text-[var(--text)] placeholder:text-[var(--muted)]/60 focus:outline-none transition-[border-color,box-shadow,background-color] duration-200",
              sizes[size] || sizes.md,
              LeftIcon && "pl-11",
              RightIcon && "pr-11",
              error
                ? "border-red-500/60 focus:border-red-500 focus:ring-4 focus:ring-red-500/15 focus:shadow-md"
                : "border-[var(--border)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/15 focus:shadow-md focus:shadow-[var(--primary)]/10",
            )}
            {...props}
          />
          {RightIcon && (
            <RightIcon
              className={cn(
                "absolute right-3.5 size-5 pointer-events-none z-10 transition-colors",
                iconColor,
              )}
            />
          )}
        </div>
        {error ? (
          <motion.p
            id={`${inputId}-error`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-400 flex items-center gap-1 mt-0.5"
          >
            <AlertCircle className="size-4" />
            {error}
          </motion.p>
        ) : (
          hint && (
            <p
              id={`${inputId}-hint`}
              className="text-xs text-[var(--muted)] mt-0.5"
            >
              {hint}
            </p>
          )
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export default Input;
