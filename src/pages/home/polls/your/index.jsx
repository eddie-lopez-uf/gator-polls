import React from "react";
import YourPolls from "./src/components/main";
import loader from "./src/server/loader";

const yourRoute = {
    path: "your",
    element: <YourPolls />,
    loader,
};

export default yourRoute;
