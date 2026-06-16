// useAnimatedCanvas.js
// Shared setup for canvas-based backgrounds: DPR scaling, resize handling,
// an rAF loop, and prefers-reduced-motion (renders a single static frame).
import { useEffect, useRef } from "react";

export function useAnimatedCanvas(render, { speed = 1 } = {}) {
  const canvasRef = useRef(null);
  const renderRef = useRef(render);
  renderRef.current = render;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf;
    let w = 0;
    let h = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const frame = (now) => {
      const t = ((now - start) / 1000) * speed;
      renderRef.current({ ctx, width: w, height: h, t });
      if (!reduced) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [speed]);

  return canvasRef;
}

// "#rgb" | "#rrggbb" -> "rgba(r,g,b,a)"
export function hexA(hex, alpha = 1) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

export function layerStyle(fixed, zIndex, opacity, style) {
  return {
    position: fixed ? "fixed" : "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    zIndex,
    opacity,
    pointerEvents: "none",
    display: "block",
    ...style,
  };
}

export const DEFAULT_COLORS = ["#5227FF", "#FF9FFC", "#B497CF"];
