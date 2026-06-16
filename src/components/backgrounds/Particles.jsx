// Particles.jsx
import { useRef } from "react";
import { useAnimatedCanvas, hexA, layerStyle, DEFAULT_COLORS } from "./useAnimatedCanvas";

const Particles = ({
  colors = DEFAULT_COLORS,
  count = 90,
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
            z: Math.random(), // depth -> size + speed + alpha
            drift: (Math.random() - 0.5) * 0.3,
          });
        }
      }
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const a of p) {
        a.y -= (0.2 + a.z * 0.8);
        a.x += a.drift;
        if (a.y < -4) {
          a.y = height + 4;
          a.x = Math.random() * width;
        }
        if (a.x < 0) a.x += width;
        if (a.x > width) a.x -= width;
        const c = colors[Math.floor(a.z * colors.length) % colors.length];
        const r = 0.6 + a.z * 2.2;
        const glow = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, r * 4);
        glow.addColorStop(0, hexA(c, 0.5 + a.z * 0.4));
        glow.addColorStop(1, hexA(c, 0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(a.x, a.y, r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    },
    { speed }
  );
  return <canvas ref={ref} aria-hidden="true" className={className} style={layerStyle(fixed, zIndex, opacity, style)} />;
};

export default Particles;
