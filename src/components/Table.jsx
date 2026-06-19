// Table.jsx
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "../utils/cn";

const Table = ({
  columns = [],
  data = [],
  sortable = true,
  striped = false,
  compact = false,
  loading = false,
  onRowClick,
  emptyMessage = "No data",
  className = "",
}) => {
  const [sort, setSort] = useState({ key: null, dir: "asc" });

  const sorted = useMemo(() => {
    if (!sort.key) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av === bv) return 0;
      const cmp = av > bv ? 1 : -1;
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [data, sort]);

  const toggleSort = (col) => {
    if (!sortable || col.sortable === false) return;
    setSort((s) =>
      s.key === col.key
        ? { key: col.key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key: col.key, dir: "asc" },
    );
  };

  const cellPad = compact ? "px-3 py-2" : "px-4 py-3";

  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-2xl border border-[var(--border)]",
        className,
      )}
    >
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--surface)]">
            {columns.map((col) => {
              const isSortable = sortable && col.sortable !== false;
              const active = sort.key === col.key;
              return (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col)}
                  className={cn(
                    cellPad,
                    "font-semibold text-[var(--text)] whitespace-nowrap",
                    isSortable &&
                      "cursor-pointer select-none hover:text-[var(--primary)]",
                  )}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {isSortable &&
                      active &&
                      (sort.dir === "asc" ? (
                        <ChevronUp className="size-3.5" />
                      ) : (
                        <ChevronDown className="size-3.5" />
                      ))}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 3 }).map((_, r) => (
              <tr
                key={r}
                className="border-b border-[var(--border)] last:border-0"
              >
                {columns.map((col) => (
                  <td key={col.key} className={cellPad}>
                    <div className="h-4 rounded bg-[var(--border)] animate-pulse" />
                  </td>
                ))}
              </tr>
            ))
          ) : sorted.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-[var(--muted)]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sorted.map((row, i) => (
              <motion.tr
                key={row.id ?? i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "border-b border-[var(--border)] last:border-0 transition-colors",
                  striped && i % 2 === 1 && "bg-[var(--surface)]/50",
                  onRowClick
                    ? "cursor-pointer hover:bg-[var(--surface-hover)]"
                    : "hover:bg-[var(--surface-hover)]",
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(cellPad, "text-[var(--text)]")}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

// >>