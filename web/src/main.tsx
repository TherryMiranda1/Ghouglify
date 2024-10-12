// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Header, Navbar } from "./components/ui";
import { CloudinaryContainer } from "./context/CloudinaryContext.tsx";

const userPreferredTheme = localStorage.getItem("data-theme");
const userPreferredVariant = localStorage.getItem("data-variant");

// Aplicar la preferencia del tema inmediatamente
if (userPreferredTheme) {
  document.documentElement.setAttribute("data-theme", userPreferredTheme);
} else {
  document.documentElement.setAttribute("data-theme", "dark");
}

if (userPreferredVariant) {
  document.documentElement.setAttribute("data-variant", userPreferredVariant);
} else {
  document.documentElement.setAttribute("data-variant", "BUBBLE");
}

createRoot(document.getElementById("root")!).render(
  <CloudinaryContainer>
    <Navbar>
      <Header text="Ghouglify" />
    </Navbar>
    <App />
  </CloudinaryContainer>
);
