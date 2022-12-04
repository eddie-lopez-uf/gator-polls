import React from "react";
import Voted from "./src/components/main";
import loader from "./src/server/loader";

const votedRoute = {
    path: "voted",
    element: <Voted />,
    loader,
};

export default votedRoute;
