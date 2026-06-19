import React from "react";

const Skeleton = ({
  width = "100%",
  height = "1rem",
  className = "",
  variant = "text",
  lines = 1,
}) => {
  // Moving sheen via the `shimmer` keyframes shipped in index.css.
  const base =
    "bg-gradient-to-r from-[var(--border)] via-[var(--surface-hover)] to-[var(--border)] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]";

  const variantClasses = {
    text: "rounded",
    circle: "rounded-full",
    rectangle: "rounded-lg",
    avatar: "rounded-full",
  };

  if (lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={`${base} ${variantClasses.text}`}
            style={{
              width: i === lines - 1 ? "60%" : width,
              height,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${base} ${variantClasses[variant] || variantClasses.text} ${className}`}
      style={{ width, height }}
    />
  );
};

// NOTE: the `shimmer` keyframes live in the shipped stylesheet (index.css),
// so this component is safe to import in SSR environments (Next.js, Remix).
export default React.memo(Skeleton);
