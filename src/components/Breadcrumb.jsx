import React from "react";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({
  items,
  separator = <ChevronRight className="w-4 h-4" />,
  className = "",
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 ${className}`}
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="text-[var(--muted)] mx-2">{separator}</span>
            )}
            {item.href ? (
              <a
                href={item.href}
                className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-[var(--text)] font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
