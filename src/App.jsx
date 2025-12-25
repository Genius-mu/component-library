import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Documentation from "./pages/Documentation";
import HomePage from "./pages/Home";
import Components from "./pages/Components";

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} /> {/* Your current content */}
          <Route path="/docs" element={<Documentation />} />
          <Route path="/components" element={<Components />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
