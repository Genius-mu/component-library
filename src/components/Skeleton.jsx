import React from "react";

const Skeleton = ({
  width = "100%",
  height = "1rem",
  className = "",
  variant = "text",
  lines = 1,
}) => {
  const baseClasses =
    "animate-pulse bg-gradient-to-r from-[var(--border)] via-[var(--surface)] to-[var(--border)] bg-[length:200%_100%]";

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
            className={`${baseClasses} ${variantClasses.text}`}
            style={{
              width: i === lines - 1 ? "60%" : width,
              height,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        width,
        height,
        backgroundImage:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        animation: "shimmer 1.5s infinite",
      }}
    />
  );
};

// NOTE: the `shimmer` keyframes live in the shipped stylesheet (index.css),
// so this component is safe to import in SSR environments (Next.js, Remix).
export default Skeleton;
