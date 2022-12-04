import React from "react";
import Poll from "./src/components/main";
import loader from "./src/server/loader";

const pollRoute = {
    path: ":pollId",
    element: <Poll />,
    loader,
};

export default pollRoute;
