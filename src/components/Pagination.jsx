// Pagination.jsx
import { memo, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";

const sizes = {
  sm: "px-2.5 py-1.5 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-2.5 text-base",
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
  size = "md",
  className = "",
}) => {
  const pad = sizes[size] || sizes.md;
  const base =
    "font-medium rounded-lg border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50";
  const idle =
    "text-[var(--muted)] bg-[var(--surface)] border-[var(--border)] hover:bg-[var(--surface-hover)]";

  const visiblePages = useMemo(() => {
    const delta = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);
    if (end - start + 1 < maxVisiblePages)
      start = Math.max(1, end - maxVisiblePages + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages, maxVisiblePages]);

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-wrap items-center justify-center gap-1",
        className,
      )}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          base,
          idle,
          pad,
          "flex items-center disabled:opacity-50 disabled:cursor-not-allowed",
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
      </button>

      {showFirstLast && visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={cn(base, idle, pad)}
          >
            1
          </button>
          {visiblePages[0] > 2 && (
            <span className="px-2 text-[var(--muted)]">…</span>
          )}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            base,
            pad,
            page === currentPage
              ? "bg-[var(--primary)] text-white border-[var(--primary)]"
              : idle,
          )}
        >
          {page}
        </button>
      ))}

      {showFirstLast && visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2 text-[var(--muted)]">…</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={cn(base, idle, pad)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          base,
          idle,
          pad,
          "flex items-center disabled:opacity-50 disabled:cursor-not-allowed",
        )}
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
};

export default memo(Pagination);
