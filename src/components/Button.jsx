// Button.jsx
import { motion } from "framer-motion";
// import { LucideIcon } from "lucide-react";

const Button = ({
  children,
  icon: Icon,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-[var(--primary)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)] text-white",
    secondary:
      "bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text)]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="size-5" />}
      {children}
    </motion.button>
  );
};

export default Button;
