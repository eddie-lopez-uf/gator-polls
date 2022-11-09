import React from "react";
import { Outlet } from "react-router-dom";
import createRoute from "./create";
import pollRoute from "./poll";

const pollsRoute = {
    path: "polls",
    children: [createRoute, pollRoute],
    element: <Outlet />,
};

export default pollsRoute;
