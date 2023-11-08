import { createBrowserRouter as Router } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import App from "../App";

export const router = Router([
  {
    path: "/app",
    element: <Sidebar />,
    children: [
      {
        path: "/app",
        element: <App />,
      },
    ],
  },
]);
