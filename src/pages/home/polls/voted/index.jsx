import React from "react";
import All from "./src/components/main";
import loader from "./src/server/loader";

const allRoute = {
    path: "all",
    element: <All />,
    loader,
};

export default allRoute;
