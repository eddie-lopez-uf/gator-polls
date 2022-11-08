import { createBrowserRouter } from "react-router-dom";
import homeRoute from "./pages/home";
import loginRoute from "./pages/login";
import accessRoute from "./pages/access";

const router = createBrowserRouter([homeRoute, loginRoute, accessRoute]);

export default router;
