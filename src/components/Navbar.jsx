// components/Navbar.jsx
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!hideOnScroll) return;
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 100);
  });

  const renderLink = (link, extraClass = "") => {
    const props =
      LinkComponent === "a"
        ? { href: link.href }
        : { to: link.href, href: link.href };
    return (
      <LinkComponent
        key={link.label}
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
        "fixed top-0 left-0 right-0 z-50 bg-[var(--surface)]/80 backdrop-blur-lg border-b border-[var(--border)]",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tight text-[var(--text)]">
          {brand}
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => renderLink(l))}
          {showThemeToggle && <ThemeToggle />}
        </div>
        <button
          className="md:hidden text-[var(--text)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-[var(--surface)] border-t border-[var(--border)] overflow-hidden"
        >
          <div className="flex flex-col p-6 gap-6">
            {links.map((l) => renderLink(l, "text-lg"))}
            {showThemeToggle && <ThemeToggle />}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
