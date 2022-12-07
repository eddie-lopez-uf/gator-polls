import React from "react";
import { useLoaderData } from "react-router-dom";
import Feed from "../../../../src/components/Feed";

export default function YourPolls() {
    const loaderData = useLoaderData();
    // eslint-disable-next-line no-console
    console.log(loaderData);

    return (
        <div className="your-polls">
            <Feed polls={loaderData.polls ?? []} />
        </div>
    );
}
