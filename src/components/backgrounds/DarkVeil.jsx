// DarkVeil.jsx
import { useAnimatedCanvas, hexA, layerStyle, DEFAULT_COLORS } from "./useAnimatedCanvas";

const DarkVeil = ({
  colors = DEFAULT_COLORS,
  speed = 1,
  opacity = 1,
  fixed = true,
  zIndex = -1,
  className = "",
  style,
}) => {
  const ref = useAnimatedCanvas(
    ({ ctx, width, height, t }) => {
      ctx.clearRect(0, 0, width, height);
      // near-black base wash
      ctx.fillStyle = "rgba(4,4,8,0.55)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      ctx.filter = "blur(40px)";
      colors.forEach((c, i) => {
        const cx = width * (0.5 + Math.sin(t * 0.15 + i * 2.1) * 0.35);
        const cy = height * (0.5 + Math.cos(t * 0.12 + i * 1.6) * 0.35);
        const r = Math.min(width, height) * 0.45;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, hexA(c, 0.16));
        g.addColorStop(1, hexA(c, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.filter = "none";
      ctx.globalCompositeOperation = "source-over";
    },
    { speed }
  );
  return <canvas ref={ref} aria-hidden="true" className={className} style={layerStyle(fixed, zIndex, opacity, style)} />;
};

export default DarkVeil;
