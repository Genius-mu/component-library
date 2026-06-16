// LightPillar.jsx
import { useAnimatedCanvas, hexA, layerStyle, DEFAULT_COLORS } from "./useAnimatedCanvas";

const LightPillar = ({
  colors = DEFAULT_COLORS,
  count = 5,
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
      ctx.globalCompositeOperation = "lighter";
      ctx.filter = "blur(30px)";
      for (let i = 0; i < count; i++) {
        const c = colors[i % colors.length];
        const phase = i * 1.7;
        const cx = width * ((i + 0.5) / count) + Math.sin(t * 0.4 + phase) * width * 0.06;
        const w = width * 0.04 * (0.7 + 0.3 * Math.sin(t * 0.8 + phase));
        const alpha = 0.18 + 0.14 * Math.sin(t * 0.9 + phase);
        const g = ctx.createLinearGradient(cx, 0, cx, height);
        g.addColorStop(0, hexA(c, 0));
        g.addColorStop(0.5, hexA(c, alpha));
        g.addColorStop(1, hexA(c, 0));
        ctx.fillStyle = g;
        ctx.fillRect(cx - w / 2, 0, w, height);
      }
      ctx.filter = "none";
      ctx.globalCompositeOperation = "source-over";
    },
    { speed }
  );
  return <canvas ref={ref} aria-hidden="true" className={className} style={layerStyle(fixed, zIndex, opacity, style)} />;
};

export default LightPillar;
