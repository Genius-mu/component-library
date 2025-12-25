// Card.jsx
import { motion } from "framer-motion";
// import { LucideIcon } from "lucide-react";

const Card = ({ title, icon: Icon, children, className = "" }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{
      y: -8,
      scale: 1.03,
      boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    }}
    className={`p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] ${className}`}
  >
    {Icon && <Icon className="size-10 text-[var(--primary)] mb-4" />}
    <h3 className="text-2xl font-semibold mb-3">{title}</h3>
    <p className="text-[var(--muted)]">{children}</p>
  </motion.div>
);

export default Card;
