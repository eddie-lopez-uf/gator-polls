import React from "react";
import { useLoaderData } from "react-router-dom";

export default function AllPage() {
    const loaderData = useLoaderData();
    // eslint-disable-next-line no-console
    console.log(loaderData);

    return <div className="voted-polls">Add Feed Here</div>;
}
