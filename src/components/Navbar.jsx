// components/Navbar.jsx
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom"; // Use Link for SPA navigation
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--surface)]/80 backdrop-blur-lg border-b border-[var(--border)] transition-all"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tight">
          <Link to="/">Design System</Link>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/components"
            className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
          >
            Components
          </Link>
          <Link
            to="/docs"
            className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
          >
            Docs
          </Link>
          <ThemeToggle />
        </div>
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-[var(--surface)] border-t border-[var(--border)] overflow-hidden"
        >
          <div className="flex flex-col p-6 gap-6">
            <Link
              to="/components"
              className="text-lg"
              onClick={() => setMobileOpen(false)}
            >
              Components
            </Link>
            <Link
              to="/docs"
              className="text-lg"
              onClick={() => setMobileOpen(false)}
            >
              Docs
            </Link>
            <ThemeToggle />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
