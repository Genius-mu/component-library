// Card.jsx
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const Card = forwardRef(
  (
    {
      title,
      subtitle,
      icon: Icon,
      image,
      footer,
      hoverable = true,
      children,
      className = "",
      ...props
    },
    ref
  ) => (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hoverable ? { y: -6, scale: 1.02 } : undefined}
      className={cn(
        "rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden",
        hoverable && "transition-shadow hover:shadow-2xl hover:shadow-black/20",
        className
      )}
      {...props}
    >
      {image && (
        <div className="w-full h-44 overflow-hidden">
          <img src={image} alt={title || ""} className="size-full object-cover" />
        </div>
      )}
      <div className="p-8">
        {Icon && <Icon className="size-10 text-[var(--primary)] mb-4" />}
        {title && <h3 className="text-2xl font-semibold mb-1">{title}</h3>}
        {subtitle && <p className="text-sm text-[var(--muted)] mb-3">{subtitle}</p>}
        {children && <div className="text-[var(--muted)]">{children}</div>}
        {footer && (
          <div className="mt-6 pt-4 border-t border-[var(--border)]">{footer}</div>
        )}
      </div>
    </motion.div>
  )
);
Card.displayName = "Card";

export default Card;
