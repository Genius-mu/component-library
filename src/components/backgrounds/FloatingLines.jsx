// FloatingLines.jsx
import { useRef } from "react";
import { useAnimatedCanvas, hexA, layerStyle, DEFAULT_COLORS } from "./useAnimatedCanvas";

const FloatingLines = ({
  colors = DEFAULT_COLORS,
  count = 70,
  maxDistance = 150,
  speed = 1,
  opacity = 1,
  fixed = true,
  zIndex = -1,
  className = "",
  style,
}) => {
  const pts = useRef([]);
  const ref = useAnimatedCanvas(
    ({ ctx, width, height }) => {
      const p = pts.current;
      if (p.length !== count) {
        p.length = 0;
        for (let i = 0; i < count; i++) {
          p.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
          });
        }
      }
      ctx.clearRect(0, 0, width, height);
      const c0 = colors[0];
      const c1 = colors[1] || colors[0];

      for (const a of p) {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0) a.x += width;
        if (a.x > width) a.x -= width;
        if (a.y < 0) a.y += height;
        if (a.y > height) a.y -= height;
      }

      for (let i = 0; i < p.length; i++) {
        for (let j = i + 1; j < p.length; j++) {
          const dx = p[i].x - p[j].x;
          const dy = p[i].y - p[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDistance) {
            ctx.strokeStyle = hexA(c1, (1 - dist / maxDistance) * 0.5);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p[i].x, p[i].y);
            ctx.lineTo(p[j].x, p[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = hexA(c0, 0.9);
      for (const a of p) {
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    { speed }
  );
  return <canvas ref={ref} aria-hidden="true" className={className} style={layerStyle(fixed, zIndex, opacity, style)} />;
};

export default FloatingLines;
