// Prism.jsx
import { motion } from "framer-motion";
import { layerStyle, DEFAULT_COLORS } from "./useAnimatedCanvas";

const Prism = ({
  colors = DEFAULT_COLORS,
  speed = 1,
  opacity = 1,
  fixed = true,
  zIndex = -1,
  blur = 80,
  className = "",
  style,
}) => {
  const stops = [...colors, colors[0]].join(", ");
  return (
    <div aria-hidden="true" className={className} style={{ ...layerStyle(fixed, zIndex, opacity, style), overflow: "hidden" }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40 / Math.max(speed, 0.01), repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "160vmax",
          height: "160vmax",
          marginLeft: "-80vmax",
          marginTop: "-80vmax",
          background: `conic-gradient(from 0deg, ${stops})`,
          filter: `blur(${blur}px)`,
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default Prism;
