import React from "react";
import { useLoaderData } from "react-router-dom";

export default function YourPolls() {
    const loaderData = useLoaderData();
    console.log(loaderData);

    return <div className="your-polls">Hello</div>;
}
