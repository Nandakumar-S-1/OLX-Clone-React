import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "flowbite";
import { AuthProvider } from "./Components/Context/Auth.jsx";
import { ItemContextProvider } from "./Components/Context/Item.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ItemContextProvider>
      <AuthProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </AuthProvider>
    </ItemContextProvider>
  </BrowserRouter>
);
