import React from "react";
import { Outlet } from "react-router-dom";
import allRoute from "./all";
import createRoute from "./create";
import pollRoute from "./poll";
import votedRoute from "./voted";
import yourRoute from "./your";

const pollsRoute = {
    path: "polls",
    children: [createRoute, pollRoute, yourRoute, allRoute, votedRoute],
    element: <Outlet />,
};

export default pollsRoute;
