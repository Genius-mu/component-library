// Silk.jsx
import { useAnimatedCanvas, hexA, layerStyle, DEFAULT_COLORS } from "./useAnimatedCanvas";

const Silk = ({
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
      ctx.globalCompositeOperation = "lighter";
      ctx.filter = "blur(60px)";
      const layers = Math.max(3, colors.length);
      for (let l = 0; l < layers; l++) {
        const c = colors[l % colors.length];
        ctx.beginPath();
        for (let x = 0; x <= width; x += 16) {
          const y =
            height * 0.5 +
            Math.sin(x * 0.0028 + t * 0.4 + l * 1.3) * height * 0.22 * Math.sin(t * 0.18 + l);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, hexA(c, 0));
        grad.addColorStop(0.5, hexA(c, 0.5));
        grad.addColorStop(1, hexA(c, 0));
        ctx.strokeStyle = grad;
        ctx.lineWidth = height * 0.16;
        ctx.lineCap = "round";
        ctx.stroke();
      }
      ctx.filter = "none";
      ctx.globalCompositeOperation = "source-over";
    },
    { speed }
  );
  return <canvas ref={ref} aria-hidden="true" className={className} style={layerStyle(fixed, zIndex, opacity, style)} />;
};

export default Silk;
