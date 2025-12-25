// src/main.jsx (or index.jsx)
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Add this import
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
// If you have LenisProvider, add it here too

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
