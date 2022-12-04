import React from "react";
import { Outlet } from "react-router-dom";
import allRoute from "./all";
import createRoute from "./create";
import pollRoute from "./poll";
import yourRoute from "./your";

const pollsRoute = {
    path: "polls",
    children: [createRoute, pollRoute, yourRoute, allRoute],
    element: <Outlet />,
};

export default pollsRoute;
