// utils/cn.js
// Tiny, dependency-free className combiner. Filters out falsy values so you can
// write cn("base", condition && "active", className) without leaking "false".
export const cn = (...classes) => classes.filter(Boolean).join(" ");

export default cn;
