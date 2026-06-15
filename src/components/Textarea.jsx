// Textarea.jsx
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "../utils/cn";

const Textarea = ({
  label,
  id,
  error,
  rows = 4,
  className = "",
  ...props
}) => (
  <div className={cn("flex flex-col gap-1", className)}>
    {label && (
      <label htmlFor={id} className="text-sm font-medium text-[var(--muted)]">
        {label}
      </label>
    )}
    <motion.textarea
      id={id}
      rows={rows}
      whileFocus={{ borderColor: "var(--primary)" }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--primary)] focus:outline-none transition-colors resize-y"
      {...props}
    />
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-red-400 flex items-center gap-1 mt-1"
      >
        <AlertCircle className="size-4" />
        {error}
      </motion.p>
    )}
  </div>
);

export default Textarea;
