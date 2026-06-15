// Breadcrumb.jsx
import { ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";

const Breadcrumb = ({
  items = [],
  separator,
  linkComponent: LinkComponent = "a",
  maxItems,
  className = "",
}) => {
  const sep = separator ?? <ChevronRight className="size-4" />;

  let display = items;
  let collapsed = false;
  if (maxItems && items.length > maxItems) {
    display = [items[0], ...items.slice(items.length - (maxItems - 1))];
    collapsed = true;
  }

  const renderLabel = (item, isLast) => {
    if (isLast || !item.href) {
      return (
        <span
          className={cn(isLast ? "text-[var(--text)] font-medium" : "text-[var(--muted)]")}
          aria-current={isLast ? "page" : undefined}
        >
          {item.label}
        </span>
      );
    }
    const linkProps =
      LinkComponent === "a" ? { href: item.href } : { to: item.href, href: item.href };
    return (
      <LinkComponent
        {...linkProps}
        className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
      >
        {item.label}
      </LinkComponent>
    );
  };

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center gap-2 flex-wrap">
        {display.map((item, index) => {
          const isLast = index === display.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-[var(--muted)]">{sep}</span>}
              {collapsed && index === 1 && (
                <>
                  <span className="text-[var(--muted)]">…</span>
                  <span className="text-[var(--muted)]">{sep}</span>
                </>
              )}
              {renderLabel(item, isLast)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
