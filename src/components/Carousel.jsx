// components/Carousel.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ slides, autoPlay = true, interval = 5000 }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction > 0 ? -1000 : 1000, opacity: 0 }),
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-3xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
          }}
          className="absolute inset-0"
        >
          {slides[current]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-[var(--surface)]/70 backdrop-blur rounded-full hover:bg-[var(--surface-hover)]"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[var(--surface)]/70 backdrop-blur rounded-full hover:bg-[var(--surface-hover)]"
      >
        <ChevronRight className="size-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current
                ? "bg-[var(--primary)] scale-125"
                : "bg-[var(--muted)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
