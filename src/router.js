import { createBrowserRouter } from "react-router-dom";
import homeRoute from "./pages/home";
import loginRoute from "./pages/login";

const router = createBrowserRouter([homeRoute, loginRoute]);

export default router;
