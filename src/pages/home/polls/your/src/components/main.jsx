import React from "react";
import { useLoaderData } from "react-router-dom";
import Feed from "../../../../src/components/Feed";

export default function YourPolls() {
    const loaderData = useLoaderData();

    return (
        <div className="your-polls">
            <Feed polls={loaderData.polls ?? []} isYours />
        </div>
    );
}
