import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import AccesProvider from "@context/AccesProvider";
import IstoricProvider from "@context/IstoricProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* useTransitions={false}: URL-ul se actualizează sincron, astfel încât
        câmpul de căutare controlat din searchParams nu pierde caractere */}
    <BrowserRouter useTransitions={false}>
      <AccesProvider>
        <IstoricProvider>
          <App />
        </IstoricProvider>
      </AccesProvider>
    </BrowserRouter>
  </StrictMode>
);
