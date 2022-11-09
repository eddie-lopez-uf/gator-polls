import React from "react";
import { Outlet } from "react-router-dom";
import pollsRoute from "./polls";

const homeRoute = {
    path: "/",
    children: [pollsRoute],
    element: <Outlet />,
};

export default homeRoute;
