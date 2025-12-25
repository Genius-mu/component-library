// Input.jsx
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const Input = ({
  label,
  id,
  type = "text",
  error,
  className = "",
  ...props
}) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label htmlFor={id} className="text-sm font-medium text-[var(--muted)]">
      {label}
    </label>
    <motion.input
      id={id}
      type={type}
      whileFocus={{ scale: 1.02, borderColor: "var(--primary)" }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }} // "Sticky" focus feel
      className="px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--primary)] focus:outline-none transition-colors"
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

export default Input;
