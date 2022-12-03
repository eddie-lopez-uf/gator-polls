import React from "react";
import Create from "./src/components/main";
import action from "./src/server/action";
import loader from "./src/server/loader";

const createRoute = {
    path: "create",
    element: <Create />,
    action,
    loader,
};

export default createRoute;
