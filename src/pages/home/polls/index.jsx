import React from "react";
import { Outlet } from "react-router-dom";
import createRoute from "./create";
import pollRoute from "./poll";
import yourRoute from "./your";

const pollsRoute = {
    path: "polls",
    children: [createRoute, pollRoute, yourRoute],
    element: <Outlet />,
};

export default pollsRoute;
