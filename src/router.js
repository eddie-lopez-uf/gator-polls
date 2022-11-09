import { createBrowserRouter } from "react-router-dom";
import homeRoute from "./pages/home";
import accessRoute from "./pages/access";

const router = createBrowserRouter([homeRoute, accessRoute]);

export default router;
