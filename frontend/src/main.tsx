import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CustomFlowbiteTheme, DarkThemeToggle, Flowbite } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {};

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <Flowbite theme={{ theme: customTheme }}>
      <App />
    </Flowbite>
  // </StrictMode>
);
