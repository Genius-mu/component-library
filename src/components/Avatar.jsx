// Avatar.jsx
import { useState, Children } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
  xl: "size-20 text-lg",
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");

const statusColors = {
  online: "bg-green-500",
  offline: "bg-[var(--muted)]",
  busy: "bg-red-500",
  away: "bg-yellow-500",
};

const Avatar = ({
  src,
  alt = "",
  name = "",
  size = "md",
  status,
  ring = false,
  className = "",
  ...props
}) => {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;

  return (
    <div className={cn("relative inline-flex shrink-0", className)} {...props}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "flex items-center justify-center rounded-full overflow-hidden font-semibold select-none bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]",
          ring && "ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--bg)]",
          sizes[size] || sizes.md
        )}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || name}
            onError={() => setErrored(true)}
            className="size-full object-cover"
          />
        ) : (
          <span>{getInitials(name) || "?"}</span>
        )}
      </motion.div>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-[var(--bg)]",
            size === "sm" ? "size-2" : "size-3",
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};

export const AvatarGroup = ({ children, max, size = "md", className = "" }) => {
  const all = Children.toArray(children);
  const shown = max ? all.slice(0, max) : all;
  const overflow = max ? all.length - max : 0;

  return (
    <div className={cn("flex items-center -space-x-3", className)}>
      {shown.map((child, i) => (
        <div key={i} className="ring-2 ring-[var(--bg)] rounded-full">
          {child}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] font-semibold ring-2 ring-[var(--bg)]",
            sizes[size] || sizes.md
          )}
        >
          {`+${overflow}`}
        </div>
      )}
    </div>
  );
};

export default Avatar;
