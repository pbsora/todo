import React from "react";
import ReactDOM from "react-dom/client";

import { router } from "./router/Router.tsx";
import { RouterProvider } from "react-router-dom";
import axios from "axios";
import "./index.css";

axios.defaults.baseURL = "http://localhost:3000/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
