import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@/styles/index.scss";

import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";
import { AuthProvider } from "./auth/AuthContext.tsx";
import { Toaster } from "react-hot-toast";
import { StoresProvider } from "./stores/store-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <AuthProvider>
      <StoresProvider>
        <RouterProvider router={router} />
      </StoresProvider>
    </AuthProvider>
  </StrictMode>
);
