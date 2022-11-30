import React from "react";
import AccessPage from "./src/components/main";
import loginRoute from "./login";
import accessLoader from "./src/server/loader";
import registrationRoute from "./registration";
import logoutRoute from "./logout";

const accessRoute = {
    path: "access",
    element: <AccessPage />,
    loader: accessLoader,
    children: [loginRoute, registrationRoute, logoutRoute],
};

export default accessRoute;
