// ThemeToggle.jsx
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../utils/cn";

const sizes = {
  sm: { btn: "p-1.5", icon: "size-4" },
  md: { btn: "p-2", icon: "size-5" },
  lg: { btn: "p-3", icon: "size-6" },
};

const ThemeToggle = ({ size = "md", className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const s = sizes[size] || sizes.md;

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-hover)] transition-colors duration-300",
        s.btn,
        className
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="block"
      >
        {theme === "dark" ? <Sun className={s.icon} /> : <Moon className={s.icon} />}
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle;
