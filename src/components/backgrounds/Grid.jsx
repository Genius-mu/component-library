// Grid.jsx
import { useAnimatedCanvas, hexA, layerStyle, DEFAULT_COLORS } from "./useAnimatedCanvas";

const Grid = ({
  colors = DEFAULT_COLORS,
  speed = 1,
  spacing = 60,
  opacity = 1,
  fixed = true,
  zIndex = -1,
  className = "",
  style,
}) => {
  const ref = useAnimatedCanvas(
    ({ ctx, width, height, t }) => {
      ctx.clearRect(0, 0, width, height);
      const c = colors[0];
      const horizon = height * 0.42;
      const vpX = width / 2;
      ctx.strokeStyle = hexA(c, 0.35);
      ctx.lineWidth = 1;

      // vertical lines fanning from the vanishing point to the bottom edge
      const cols = 24;
      for (let i = -cols; i <= cols; i++) {
        const bx = vpX + (i / cols) * width * 1.4;
        ctx.beginPath();
        ctx.moveTo(vpX, horizon);
        ctx.lineTo(bx, height);
        ctx.stroke();
      }

      // horizontal lines, scrolling toward the viewer with perspective spacing
      const scroll = (t * 40) % spacing;
      for (let d = 0; d < 40; d++) {
        const z = d * spacing + scroll;
        const y = horizon + (z * z) / (height * 1.6);
        if (y > height) break;
        ctx.strokeStyle = hexA(c, 0.3 * (1 - (y - horizon) / (height - horizon)) + 0.06);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // horizon glow
      const g = ctx.createLinearGradient(0, horizon - 60, 0, horizon + 60);
      g.addColorStop(0, hexA(colors[1] || c, 0));
      g.addColorStop(0.5, hexA(colors[1] || c, 0.18));
      g.addColorStop(1, hexA(colors[1] || c, 0));
      ctx.fillStyle = g;
      ctx.fillRect(0, horizon - 60, width, 120);
    },
    { speed }
  );
  return <canvas ref={ref} aria-hidden="true" className={className} style={layerStyle(fixed, zIndex, opacity, style)} />;
};

export default Grid;
