import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Documentation from "./pages/Documentation";
import HomePage from "./pages/Home";
import Components from "./pages/Components";

import LiquidEther from "./components/sub-component/LiquidEther";
// import Lightfall from "./components/sub-component/Lightfall";
// import Ferrofluid from "./components/sub-component/Ferrofluid";
// import Hot from "./components/sub-component/Hot";

function App() {
  const location = useLocation();

  return (
    <>
      <div className="relative min-h-screen bg-black text-white">
        {/* Background animation layer */}
        <div className="fixed inset-0 z-0">
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B497CF"]}
            mouseForce={20}
            cursorSize={100}
            isViscous
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            color0="#5227FF"
            color1="#FF9FFC"
            color2="#B497CF"
          />
          {/* <Ferrofluid
            colors={["#ffffff", "#0ffffff", "#ffffff"]}
            speed={0.2}
            scale={1.6}
            turbulence={1}
            fluidity={0.1}
            rimWidth={0.2}
            sharpness={2.5}
            shimmer={1.5}
            glow={2}
            flowDirection="down"
            opacity={1}
            mouseInteraction
            mouseStrength={1}
            mouseRadius={0.35}
          /> */}
          {/* <Lightfall
            colors={["#A6C8FF", "#5227FF", "#FF9FFC"]}
            backgroundColor="#0A29FF"
            speed={0.5}
            streakCount={2}
            streakWidth={1}
            streakLength={1}
            glow={1}
            density={0.6}
            twinkle={1}
            zoom={3}
            backgroundGlow={0.5}
            opacity={1}
            mouseInteraction
            mouseStrength={0.5}
            mouseRadius={1}
            color1="#A6C8FF"
            color2="#5227FF"
            color3="#FF9FFC"
          /> */}
        </div>
        {/* Page content on top */}
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />{" "}
              {/* Your current content */}
              <Route path="/docs" element={<Documentation />} />
              <Route path="/components" element={<Components />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

export default App;
