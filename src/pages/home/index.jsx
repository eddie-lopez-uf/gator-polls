import React from "react";
import HomePage from "./src/components/main";
import pollsRoute from "./polls";
import loader from "./src/server/loader";

const homeRoute = {
    path: "/",
    children: [pollsRoute],
    element: <HomePage />,
    loader,
};

export default homeRoute;
