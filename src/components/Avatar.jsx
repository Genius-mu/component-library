// Avatar.jsx
import { useState } from "react";
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

const Avatar = ({
  src,
  alt = "",
  name = "",
  size = "md",
  status, // "online" | "offline" | "busy" | "away"
  className = "",
  ...props
}) => {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-[var(--muted)]",
    busy: "bg-red-500",
    away: "bg-yellow-500",
  };

  return (
    <div className={cn("relative inline-flex shrink-0", className)} {...props}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "flex items-center justify-center rounded-full overflow-hidden font-semibold select-none",
          "bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]",
          sizes[size]
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

export default Avatar;
