import React from "react";
import AccessPage from "./src/components/main";
import loginRoute from "./login";
import accessLoader from "./src/server/loader";
import registrationRoute from "./registration";

const accessRoute = {
    path: "access",
    element: <AccessPage />,
    loader: accessLoader,
    children: [loginRoute, registrationRoute],
};

export default accessRoute;
