import React from "react";
import LoginPage from "./src/components/main";
import action from "./src/server/action";
import loader from "./src/server/loader";

const loginRoute = {
    path: "login",
    element: <LoginPage />,
    action,
    loader,
};

export default loginRoute;
