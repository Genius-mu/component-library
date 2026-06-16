// Aurora.jsx
import { useAnimatedCanvas, hexA, layerStyle, DEFAULT_COLORS } from "./useAnimatedCanvas";

const Aurora = ({
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
      colors.forEach((c, i) => {
        const amp = height * 0.13;
        const baseY = height * (0.32 + i * 0.13);
        const grad = ctx.createLinearGradient(0, baseY - amp * 2.5, 0, baseY + amp * 3);
        grad.addColorStop(0, hexA(c, 0));
        grad.addColorStop(0.5, hexA(c, 0.32));
        grad.addColorStop(1, hexA(c, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 14) {
          const y =
            baseY +
            Math.sin(x * 0.0038 + t * 0.6 + i * 1.7) * amp +
            Math.sin(x * 0.011 + t * 0.9) * amp * 0.35;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
    },
    { speed }
  );
  return <canvas ref={ref} aria-hidden="true" className={className} style={layerStyle(fixed, zIndex, opacity, style)} />;
};

export default Aurora;
