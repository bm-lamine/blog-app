import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "@/shared/assets/style.css";
import Index from "@/shared/pages/Index";

const app = document.getElementById("root")!;

createRoot(app).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
