// components/Navbar.jsx
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "../utils/cn";

/**
 * Router-agnostic navbar. By default links render as <a>. To use a SPA router,
 * pass your router's link via `linkComponent` (e.g. linkComponent={Link} from
 * react-router) — it will receive { to, href, className, children }.
 */
const Navbar = ({
  brand = "Morgu",
  links = [],
  linkComponent: LinkComponent = "a",
  hideOnScroll = true,
  showThemeToggle = true,
  className = "",
}) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 8);
    if (hideOnScroll) setHidden(latest > previous && latest > 100 && !mobileOpen);
  });

  const renderLink = (link, extraClass = "") => {
    const props =
      LinkComponent === "a" ? { href: link.href } : { to: link.href, href: link.href };
    return (
      <LinkComponent
        {...props}
        onClick={() => setMobileOpen(false)}
        className={cn(
          "text-[var(--muted)] hover:text-[var(--primary)] transition-colors",
          extraClass
        )}
      >
        {link.label}
      </LinkComponent>
    );
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-colors duration-300",
        scrolled
          ? "bg-[var(--surface)]/80 border-b border-[var(--border)] shadow-lg shadow-black/5"
          : "bg-transparent border-b border-transparent",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tight text-[var(--text)]">
          {brand}
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <span key={l.label}>{renderLink(l)}</span>
          ))}
          {showThemeToggle && <ThemeToggle />}
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-[var(--text)]"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-[var(--surface)] border-t border-[var(--border)] overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  {renderLink(l, "text-lg")}
                </motion.div>
              ))}
              {showThemeToggle && <ThemeToggle />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
