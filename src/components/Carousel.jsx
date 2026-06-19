// Carousel.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";

const variants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
    },
  },
  exit: (dir) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
    },
  }),
};

const arrowCls =
  "absolute top-1/2 -translate-y-1/2 grid place-items-center size-11 bg-[var(--surface)]/80 backdrop-blur-md rounded-full shadow-lg border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50";

const Carousel = ({
  slides = [],
  autoPlay = true,
  interval = 5000,
  showArrows = true,
  showDots = true,
  pauseOnHover = true,
  height = "500px",
  className = "",
  ...props
}) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const paused = useRef(false);

  const paginate = (dir) => {
    setDirection(dir);
    setCurrent((p) => (p + dir + slides.length) % slides.length);
  };

  const goTo = (i) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const timer = setInterval(() => {
      if (!paused.current && !document.hidden) {
        setDirection(1);
        setCurrent((p) => (p + 1) % slides.length);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-3xl shadow-2xl outline-none",
        className,
      )}
      style={{ height }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") paginate(-1);
        if (e.key === "ArrowRight") paginate(1);
      }}
      onMouseEnter={() => pauseOnHover && (paused.current = true)}
      onMouseLeave={() => pauseOnHover && (paused.current = false)}
      {...props}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            if (info.offset.x < -80) paginate(1);
            else if (info.offset.x > 80) paginate(-1);
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          {slides[current]}
        </motion.div>
      </AnimatePresence>

      {showArrows && slides.length > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            className={cn(arrowCls, "left-4")}
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-6 text-[var(--text)]" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            className={cn(arrowCls, "right-4")}
            aria-label="Next slide"
          >
            <ChevronRight className="size-6 text-[var(--text)]" />
          </motion.button>
        </>
      )}

      {showDots && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === current
                  ? "w-6 bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]"
                  : "w-2 bg-[var(--muted)] hover:bg-[var(--primary)]/50",
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
