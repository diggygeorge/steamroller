import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import RecommendationList from "./pages/RecommendationList";
import "./index.css"; // Corrected import path

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/recommendations", element: <RecommendationList /> },
]);

export default router;
