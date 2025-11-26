import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.jsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Elemento com id 'root' não foi encontrado no documento.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
