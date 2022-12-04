import React from "react";
import { useLoaderData } from "react-router-dom";

export default function YourPolls() {
    const loaderData = useLoaderData();
    // eslint-disable-next-line no-console
    console.log(loaderData);

    return <div className="your-polls">Add Feed Here</div>;
}
