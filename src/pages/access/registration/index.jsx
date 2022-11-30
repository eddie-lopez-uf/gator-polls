import React from "react";
import RegistrationPage from "./src/components/main";
import action from "./src/server/action";
import loader from "./src/server/loader";

const registrationRoute = {
    path: "register",
    element: <RegistrationPage />,
    action,
    loader,
};

export default registrationRoute;
